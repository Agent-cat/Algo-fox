# CRITICAL SECURITY VULNERABILITIES ANALYSIS

## Executive Summary
Three critical security vulnerabilities have been identified in the contest proctoring system:

1. **Proctoring Bypass (Client-Side Enforcement)** - Violations logged but not blocking submissions
2. **IP Spoofing Vulnerability** - No IP validation on submissions/critical actions
3. **Multi-Device/Session API Bypass** - SessionId not validated in submission API

---

## VULNERABILITY #1: PROCTORING BYPASS (CLIENT-SIDE ENFORCEMENT)

### Location
`/home/vishnu/Documents/projects/Algo-fox/components/contest/ContestProtection.tsx`

### Full Code Snippet (Lines 111-188)

```typescript
const handleViolation = useCallback(
  async (
    type:
      | "TAB_SWITCH"
      | "FULLSCREEN_EXIT"
      | "COPY_PASTE"
      | "DEVTOOLS_OPEN"
      | "KEYBOARD_SHORTCUT"
      | "NAVIGATION_ATTEMPT"
      | "MULTI_TAB",
    message: string
  ) => {
    // Skip if navigating internally (prevents false positives when clicking problems)
    if (!isMounted.current || isRefreshing.current || isNavigating.current)
      return;

    // Navigation attempts: just show a toast, don't count or show popup
    if (type === "NAVIGATION_ATTEMPT") {
      toast.error("Navigation blocked", {
        description: message,
        duration: 3000,
      });
      return;
    }

    // Always show popup for user awareness
    setCurrentViolationType(message);
    setShowWarningPopup(true);

    // Keyboard shortcuts and copy/paste ONLY show warning, don't count as violations
    const warningOnlyTypes = ["KEYBOARD_SHORTCUT", "COPY_PASTE"];
    if (warningOnlyTypes.includes(type)) {
      // Just show warning, don't log to server or increment counter
      return;
    }

    // But only log to server if cooldown passed
    if (!canLogViolation()) {
      return;
    }

    // Lock and update timestamp immediately
    isProcessingViolation.current = true;
    lastViolationTime.current = Date.now();

    try {
      const result = await logContestViolation(contestId, type, message);

      if (result.success) {
        const newState = {
          total: result.totalViolations || 0,
          isFlagged: result.isFlagged || false,
          isBlocked: result.isBlocked || false,
          tempBlockedUntil: result.tempBlockedUntil || null,
          permanentlyBlocked: result.permanentlyBlocked || false,
        };
        setViolations(newState);

        // Handle tiered escalation
        if (result.permanentlyBlocked) {
          setIsEditorLocked(true);
          onBlocked?.();
        } else if (result.tempBlockedUntil) {
          setIsEditorLocked(true);
          // Calculate time left
          const timeLeft =
            new Date(result.tempBlockedUntil).getTime() - Date.now();
          setTempBlockTimeLeft(Math.max(0, Math.floor(timeLeft / 1000)));
        }
      }
    } catch (error) {
      console.error("Failed to log violation:", error);
    } finally {
      isProcessingViolation.current = false;
    }
  },
  [contestId, canLogViolation, onAutoSubmit, onBlocked]
);
```

### How It's Currently Exploitable

**CRITICAL ISSUE 1: Violation Logging Only - No API Submission Blocking**
- Violations are logged client-side via `logContestViolation()` action
- However, violations ONLY UPDATE STATE (`setViolations(newState)`)
- The `isEditorLocked` state is set to true, but **this only disables UI elements**
- **No check exists in the submission API endpoint** (`/api/submissions`) to verify the user is not blocked
- An attacker can:
  1. Open browser DevTools
  2. Call the API directly: `fetch('/api/submissions', {method: 'POST', body: JSON.stringify({...})})`
  3. Bypass all client-side locks and submit code

**CRITICAL ISSUE 2: Copy/Paste Violations Don't Count**
- Lines 141-145 show copy/paste violations are "warning-only" and don't increment counters
- An attacker can copy/paste the entire solution without penalty

**CRITICAL ISSUE 3: Keyboard Shortcut Violations Don't Count**
- Lines 141-145 also exclude keyboard shortcuts from violation counting
- Attacker can use Ctrl+V repeatedly without consequences

**CRITICAL ISSUE 4: 2-Second Debounce Can Be Exploited**
- Lines 94-108 show violations are debounced (max 1 per 2 seconds)
- Multiple rapid violations are ignored
- Attacker can trigger multiple violation types within 2 seconds

### Request Flow

```
1. USER ACTION (e.g., tab switch, copy-paste)
   ↓
2. CLIENT: handleViolation() called
   ↓
3. CLIENT: Show warning popup (UI lock)
   ↓
4. CLIENT: logContestViolation() action called
   ↓
5. SERVER: /actions/contest.ts logContestViolation()
   ├─ Calls ContestService.logViolation()
   └─ Updates DB violation counters
   ↓
6. CLIENT: Set isEditorLocked = true (UI ONLY)
   ↓
7. BYPASS: Direct API call to /api/submissions
   └─ NO CHECK for isEditorLocked or violations
```

### API Endpoint Issue

**File**: `/home/vishnu/Documents/projects/Algo-fox/app/api/submissions/route.ts` (Lines 41-83)

```typescript
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, problemId, languageId, code, mode = "SUBMIT", contestId, customTestCases } = body;

        // RATE LIMIT CHECK (Defense-in-depth)
        const limiter = getRateLimiter();
        const { allowed } = await limiter.checkLimit(userId || "anonymous", RATE_LIMIT_CONFIGS.SUBMISSIONS);
        if (!allowed) {
            return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
        }

        if (!userId || !problemId || !languageId || !code) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // CONTEST SECURITY CHECKS
        if (contestId) {
            const { ContestService } = await import("@/core/services/contest.service");
            const validation = await ContestService.validateSession(userId, contestId);

            if (!validation.success) {
                return NextResponse.json({ error: validation.error }, { status: 403 });
            }
        }

        // 1. Create Submission in DB (SUBMIT MODE)
        const submission = await SubmissionService.createSubmission(userId, problemId, languageId, code, mode, contestId);

        // Invalidate Tracking Cache so teachers see "Pending" immediately
        await SubmissionService.invalidateClassroomTracking(userId);

        // 2. Add to Queue
        await addSubmissionJob(submission.id, customTestCases);

        return NextResponse.json({ submissionId: submission.id }, { status: 201 });

    } catch (error) {
        console.error("Submission API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
```

**PROBLEM**: Lines 58-65 call `validateSession()` but **DO NOT check violation status**

### validateSession Function

**File**: `/home/vishnu/Documents/projects/Algo-fox/core/services/contest.service.ts` (Lines 49-73)

```typescript
static async validateSession(userId: string, contestId: string, sessionId?: string) {
    const [contest, participation] = await Promise.all([
        prisma.contest.findUnique({
            where: { id: contestId },
            select: { startTime: true, endTime: true, isFinalized: true }
        }),
        this.getParticipation(userId, contestId)
    ]);

    if (!contest) return { success: false, error: "Contest not found" };

    const now = new Date();
    if (now < contest.startTime) return { success: false, error: "Contest has not started" };
    if (now > contest.endTime) return { success: false, error: "Contest has ended" };

    if (!participation) return { success: false, error: "No participation found" };
    if (participation.isBlocked) return { success: false, error: "Blocked due to violations" };
    if (participation.isFinished) return { success: false, error: "Contest session finished" };

    if (sessionId && participation.sessionId !== sessionId) {
        return { success: false, error: "Session mismatch (multiple tabs?)" };
    }

    return { success: true, contest, participation };
}
```

**WAIT!** Line 65 DOES check `participation.isBlocked`! But the problem is...

### The Real Problem: State Desync

The client-side violation counting is NOT properly synced with the database:

1. Client logs violation → API called
2. Database updated with new violation count
3. Client receives response and updates UI state
4. **BUT**: If attacker makes direct API call, they bypass the client state check
5. Database DOES have isBlocked flag, BUT...
6. The submission API only checks if user is blocked DURING session validation
7. If attacker is NOT yet permanently blocked (< 6 violations), submission goes through

### Visualization of Attack Path

```
Attacker Strategy:
═════════════════
1. Open DevTools Console
2. Bypass UI lock with: document.body.innerHTML = ""
3. Use fetch API: POST /api/submissions
   {
     userId: "attacker-id",
     problemId: "problem-1",
     languageId: 1,
     code: "malicious code",
     contestId: "contest-id"
   }
4. Even if blocked temporarily, repeat within 2 second windows
5. Violations don't block submissions immediately
```

### Related Files Requiring Changes

1. `/app/api/submissions/route.ts` - Needs violation check
2. `/core/services/contest.service.ts` - validateSession needs enhancement
3. `/components/contest/ContestProtection.tsx` - Remove soft violations
4. `/actions/contest.ts` - logContestViolation needs improvement
5. Database schema needs audit log for all submissions during violations

---

## VULNERABILITY #2: IP SPOOFING VULNERABILITY

### Location
`/home/vishnu/Documents/projects/Algo-fox/lib/ip.ts`

### Full Code Snippet

```typescript
import { headers } from "next/headers";

/**
 * Gets the user's IP address from headers.
 * Reliable in production environments like Vercel, Cloudflare, or Nginx.
 */
export async function getClientIP(): Promise<string | null> {
    const headersList = await headers();

    // Check for x-forwarded-for first (Standard for proxies)
    const xForwardedFor = headersList.get("x-forwarded-for");
    if (xForwardedFor) {
        // The first IP is the real client IP, subsequent ones are proxies
        const ip = xForwardedFor.split(",")[0].trim();
        return normalizeIP(ip);
    }

    // Direct header for some proxies like Nginx
    const xRealIP = headersList.get("x-real-ip");
    if (xRealIP) return normalizeIP(xRealIP);

    // Cloudflare specific
    const cfConnectionIP = headersList.get("cf-connecting-ip");
    if (cfConnectionIP) return normalizeIP(cfConnectionIP);

    return null;
}

/**
 * Normalizes IP addresses (e.g., converts IPv6 loopback or wrapped IPv4 to standard formats)
 */
function normalizeIP(ip: string): string {
    // Convert IPv6 loopback to IPv4
    if (ip === "::1") return "127.0.0.1";

    // Convert IPv6-wrapped IPv4 (::ffff:127.0.0.1) to standard IPv4
    if (ip.startsWith("::ffff:")) {
        return ip.substring(7);
    }

    return ip;
}

/**
 * Validates if the client IP is allowed for a given contest
 */
export function isIPAllowed(clientIP: string | null, allowedIPs: string[]): boolean {
    if (!clientIP) return false;

    // Normalize client IP just in case
    const normalizedClient = normalizeIP(clientIP);

    // Check for exact match or CIDR notation if needed (keeping it simple for now)
    return allowedIPs.some(allowed => normalizeIP(allowed.trim()) === normalizedClient);
}
```

### How It's Currently Exploitable

**CRITICAL ISSUE 1: X-Forwarded-For Can Be Spoofed by Client**

```
Problem Flow:
=============
Client Request to /api/submissions:
Headers:
  x-forwarded-for: "192.168.1.100"  ← ATTACKER CONTROLS THIS
  
Server Code:
  const ip = headersList.get("x-forwarded-for").split(",")[0].trim()
  
Result: Attacker IP is stored/validated
```

Attacker can:
1. Change `x-forwarded-for` header to legitimate IP
2. Multiple attackers share one "allowed" IP
3. Bypass IP restrictions completely

**CRITICAL ISSUE 2: x-real-ip Can Also Be Spoofed**
- Line 19-20: Same vulnerability with `x-real-ip` header
- Can be set by client in any request

**CRITICAL ISSUE 3: isIPAllowed() Function is NEVER CALLED**
- Defined in lib/ip.ts but search shows it's imported in `/actions/contest.ts`
- However, it's NOT used anywhere in the submission validation flow
- Check grep results - it's imported but never used in submission/contest APIs

**CRITICAL ISSUE 4: IP Logged But Not Enforced**
- IP is stored in `ContestParticipation.ipAddress` (schema line 436)
- Multiple IPs can be concatenated (see contest.service.ts lines 546-549)
- But NO validation prevents submission from different IP

### Usage Analysis

**File**: `/home/vishnu/Documents/projects/Algo-fox/actions/contest.ts` (Lines 9, 577-582)

```typescript
import { getClientIP, isIPAllowed } from "@/lib/ip";

// ...

export async function startContestSession(contestId: string, password?: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    try {
        const clientIP = await getClientIP();
        const result = await ContestService.startSession({
            userId: session.user.id,
            contestId,
            password,
            clientIP: clientIP ?? undefined
        });

        revalidatePath(`/contest/${contestId}`);
        return result;
    } catch (error) {
        console.error("Failed to start contest session:", error);
        return { success: false, error: "Failed to start contest session" };
    }
}
```

**isIPAllowed() imported but NEVER USED**

### StartSession Function

**File**: `/home/vishnu/Documents/projects/Algo-fox/core/services/contest.service.ts` (Lines 514-558)

```typescript
static async startSession(params: {
    userId: string;
    contestId: string;
    password?: string;
    clientIP?: string;
}) {
    const { userId, contestId, password, clientIP } = params;

    const contest = await prisma.contest.findUnique({
        where: { id: contestId },
        select: { startTime: true, endTime: true, contestPassword: true }
    });

    if (!contest) return { success: false, error: "Contest not found" };
    if (contest.contestPassword) {
        const isMatch = await bcrypt.compare(password || "", contest.contestPassword);
        if (!isMatch) return { success: false, error: "Invalid contest password" };
    }

    const now = new Date();
    if (now < contest.startTime) return { success: false, error: "Contest not started" };
    if (now > contest.endTime) return { success: false, error: "Contest ended" };

    const sessionId = `${userId}-${contestId}-${Date.now()}`;

    const existing = await prisma.contestParticipation.findUnique({
        where: { userId_contestId: { userId, contestId } }
    });

    if (existing?.isBlocked) return { success: false, error: "Blocked" };
    if (existing?.isFinished) return { success: false, error: "Finished" };

    let ipHistory = existing?.ipAddress || clientIP;
    if (existing?.ipAddress && clientIP && !existing.ipAddress.includes(clientIP)) {
        ipHistory = `${existing.ipAddress}, ${clientIP}`;
    }

    const participation = await prisma.contestParticipation.upsert({
        where: { userId_contestId: { userId, contestId } },
        update: { sessionId, sessionStartedAt: now, acceptedRules: true, ipAddress: ipHistory },
        create: { userId, contestId, sessionId, sessionStartedAt: now, acceptedRules: true, ipAddress: clientIP }
    });

    return { success: true, sessionId, participationId: participation.id };
}
```

**ISSUE**: Lines 546-549 show IP history tracking but NO IP validation

### Attack Scenarios

**Scenario 1: Shared Lab IP Bypass**
```
Setup:
- Contest restricted to "allowed_ips: ['192.168.1.1']"
- 10 students in same lab (192.168.1.1)
- Only 1 can participate (supposed)

Attack:
1. All 10 spoof x-forwarded-for to 192.168.1.1
2. All pass IP check ✓
3. All submit solutions ✓
```

**Scenario 2: VPN/Proxy Spoofing**
```
Attacker:
1. Uses VPN to match contest allowed IP
2. Spoofs x-forwarded-for with legitimate IP from browser
3. Submits code from different location
```

**Scenario 3: Multi-Account Cheating**
```
Attacker:
1. Create 5 accounts
2. All spoof same x-forwarded-for header
3. All use identical solutions
4. Each gets separate score
```

### Request Flow for IP Vulnerability

```
1. Client initiates contest session
   ↓
2. getClientIP() called in startContestSession()
   ├─ Reads x-forwarded-for header
   └─ ATTACKER CAN SPOOF THIS
   ↓
3. ClientIP stored in DB (ipAddress field)
   ↓
4. Submission API called
   ├─ getClientIP() called again
   ├─ ATTACKER SPOOFS DIFFERENT IP
   └─ No validation against stored IP
   ↓
5. Submission accepted ✓ (should be rejected)
```

### Related Files Requiring Changes

1. `/lib/ip.ts` - Implement server-side IP verification
2. `/app/api/submissions/route.ts` - Add IP validation check
3. `/core/services/contest.service.ts` - Validate IP in validateSession()
4. `/actions/contest.ts` - Use isIPAllowed() properly
5. All API routes need consistent IP checking

---

## VULNERABILITY #3: MULTI-DEVICE/SESSION API BYPASS

### Location
`/home/vishnu/Documents/projects/Algo-fox/app/api/submissions/route.ts`
`/home/vishnu/Documents/projects/Algo-fox/core/services/contest.service.ts`

### Full Code Snippet (Submission API)

```typescript
// /app/api/submissions/route.ts

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, problemId, languageId, code, mode = "SUBMIT", contestId, customTestCases } = body;

        // RATE LIMIT CHECK (Defense-in-depth)
        const limiter = getRateLimiter();
        const { allowed } = await limiter.checkLimit(userId || "anonymous", RATE_LIMIT_CONFIGS.SUBMISSIONS);
        if (!allowed) {
            return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
        }

        if (!userId || !problemId || !languageId || !code) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // CONTEST SECURITY CHECKS
        if (contestId) {
            const { ContestService } = await import("@/core/services/contest.service");
            const validation = await ContestService.validateSession(userId, contestId);

            if (!validation.success) {
                return NextResponse.json({ error: validation.error }, { status: 403 });
            }
        }

        // 1. Create Submission in DB (SUBMIT MODE)
        const submission = await SubmissionService.createSubmission(userId, problemId, languageId, code, mode, contestId);

        // Invalidate Tracking Cache so teachers see "Pending" immediately
        await SubmissionService.invalidateClassroomTracking(userId);

        // 2. Add to Queue
        await addSubmissionJob(submission.id, customTestCases);

        return NextResponse.json({ submissionId: submission.id }, { status: 201 });

    } catch (error) {
        console.error("Submission API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
```

### validateSession Function (Incomplete)

```typescript
static async validateSession(userId: string, contestId: string, sessionId?: string) {
    const [contest, participation] = await Promise.all([
        prisma.contest.findUnique({
            where: { id: contestId },
            select: { startTime: true, endTime: true, isFinalized: true }
        }),
        this.getParticipation(userId, contestId)
    ]);

    if (!contest) return { success: false, error: "Contest not found" };

    const now = new Date();
    if (now < contest.startTime) return { success: false, error: "Contest has not started" };
    if (now > contest.endTime) return { success: false, error: "Contest has ended" };

    if (!participation) return { success: false, error: "No participation found" };
    if (participation.isBlocked) return { success: false, error: "Blocked due to violations" };
    if (participation.isFinished) return { success: false, error: "Contest session finished" };

    if (sessionId && participation.sessionId !== sessionId) {
        return { success: false, error: "Session mismatch (multiple tabs?)" };
    }

    return { success: true, contest, participation };
}
```

### How It's Currently Exploitable

**CRITICAL ISSUE 1: sessionId is Optional Parameter**
- Line 49: `sessionId?: string` - parameter is OPTIONAL
- Line 68: `if (sessionId && ...)` - only checked IF provided
- **No enforcement to REQUIRE sessionId**

**CRITICAL ISSUE 2: Submission API NEVER PASSES sessionId**
- `/api/submissions/route.ts` line 60 calls:
  ```typescript
  const validation = await ContestService.validateSession(userId, contestId);
  ```
- Note: **NO sessionId parameter passed**
- Session validation is completely bypassed

**CRITICAL ISSUE 3: No Multi-Device Detection on Submission**
- Client-side BroadcastChannel detects multi-tab (line 275-299 in ContestProtection.tsx)
- But this detection is CLIENT-SIDE ONLY
- Server has no mechanism to detect multiple devices
- AttackcanOpen contest on Device A, submit from Device B

**CRITICAL ISSUE 4: Client Can Forge sessionId**
- Although sessionId is generated server-side: `${userId}-${contestId}-${Date.now()}`
- Client receives it and stores in DB
- Client could modify/forge sessionId in local storage
- Then use forged sessionId in API calls

### Attack Scenarios

**Scenario 1: Copy-Paste from Different Device**
```
Setup:
1. User opens contest on Device A (Laptop)
   - sessionId generated: "user-contest-1234567890"
   - BroadcastChannel prevents tab switching
2. Code solution prepared on Device B (Phone)

Attack:
1. Open contest on Device A (locked to fullscreen)
2. Prepare solution on Device B (can use any browser tools)
3. From Device B, make API call:
   POST /api/submissions
   {
     userId: "attacker-id",
     problemId: "problem-1",
     languageId: 1,
     code: "solution from phone",
     contestId: "contest-id"
     // NO sessionId required!
   }
4. Device A still shows "locked", but submission succeeds ✓
```

**Scenario 2: Multi-Device Coordinated Attack**
```
Attacker:
1. Device A (Laptop): Open contest, pass fullscreen check
2. Device B (Desktop): Bypass copy-paste restrictions
3. Device C (Phone): Real-time web research
4. All spoof same x-forwarded-for IP
5. Each makes independent submissions

Result: Cheating from multiple devices, all recorded as same user
```

**Scenario 3: Session Forging**
```
Client sees in Network tab:
GET /contest/contest-1?sessionId=user-contest-1234567890

Attacker:
1. Tries multiple sessionId values in API calls
2. No server-side validation of sessionId on submission
3. Can spoof any sessionId from other users
4. Permission check only via userId (from auth, client controls)
```

### The sessionId Storage Issue

**File**: `/home/vishnu/Documents/projects/Algo-fox/components/contest/ContestProtection.tsx` (Line 19)

```typescript
interface ContestProtectionProps {
  contestId: string;
  sessionId: string;  // ← Passed as prop to component
  onAutoSubmit?: () => void;
  onBlocked?: () => void;
  paused?: boolean;
}
```

- sessionId is received as prop from parent
- Parent gets it from server (`getContestDetail` line 263)
- Returned but **never validated on submission**
- Line 278: `broadcastChannel.current.postMessage({ type: "ping", sessionId });`
  - sessionId only used for BroadcastChannel, not API validation

### Data Flow

```
Contest Start Flow:
═══════════════════
1. User clicks "Start Contest"
   ↓
2. startContestSession() server action
   ├─ Generates sessionId: `${userId}-${contestId}-${Date.now()}`
   └─ Stores in DB (ContestParticipation.sessionId)
   ↓
3. Client receives sessionId as prop
   ├─ Used for BroadcastChannel (multi-tab detection)
   └─ NOT stored securely (in component memory)
   ↓
4. User submits code
   ├─ Client-side state check only
   ├─ API call to /api/submissions
   └─ NO sessionId validation on server

Vulnerability: sessionId is never re-validated on submission API
```

### Database Schema Insight

**File**: `/home/vishnu/Documents/projects/Algo-fox/prisma/schema.prisma` (Lines 412-446)

```prisma
model ContestParticipation {
  id                  String             @id @default(cuid())
  userId              String
  contestId           String
  acceptedRules       Boolean            @default(false)
  isFinished          Boolean            @default(false)
  finishedAt          DateTime?
  sessionId           String?            // ← Stored here
  sessionStartedAt    DateTime?
  tabSwitchCount      Int                @default(0)
  fullscreenExitCount Int                @default(0)
  copyPasteCount      Int                @default(0)
  devToolsCount       Int                @default(0)
  keyboardCount       Int                @default(0)
  navigationCount     Int                @default(0)
  totalViolations     Int                @default(0)
  isFlagged           Boolean            @default(false)
  isBlocked           Boolean            @default(false)
  tempBlockedUntil    DateTime?
  permanentlyBlocked  Boolean            @default(false)
  ipAddress           String?            // ← IP stored but not validated
  // ... other fields
}
```

**ISSUE**: sessionId is String? (nullable, optional) - can be missing

### Missing Validations

The submission API should validate:

1. ✗ SessionId matches stored sessionId
2. ✗ SessionId timestamp is recent (not replayed from hours ago)
3. ✗ User's current IP matches session IP
4. ✗ Violation flags (isBlocked, isFlagged)
5. ✗ Session still active (not finished)

Current code (lines 58-65) only checks:
```typescript
if (contestId) {
    const { ContestService } = await import("@/core/services/contest.service");
    const validation = await ContestService.validateSession(userId, contestId);
    
    if (!validation.success) {
        return NextResponse.json({ error: validation.error }, { status: 403 });
    }
}
```

This calls validateSession() which checks:
- ✓ Contest started/not ended
- ✓ Participation exists
- ✓ User not blocked
- ✓ User not finished
- ✗ BUT OPTIONAL sessionId check (line 68)

### Related Files Requiring Changes

1. `/app/api/submissions/route.ts` - Pass sessionId to validateSession()
2. `/core/services/contest.service.ts` - Make sessionId check MANDATORY
3. `/components/contest/ContestProtection.tsx` - Properly send sessionId with submissions
4. `/actions/submission.action.ts` - Check for sessionId in submission actions
5. Database - Add index on (userId, contestId, sessionId)

---

## SUMMARY TABLE

| Vulnerability | Severity | Impact | Root Cause |
|---|---|---|---|
| Proctoring Bypass | CRITICAL | Bypass all client-side enforcement | No submission API validation |
| IP Spoofing | CRITICAL | Multiple devices/accounts bypass | x-forwarded-for not validated |
| Session Bypass | CRITICAL | Multi-device cheating | sessionId optional in validation |

### Quick Bypass Commands

```bash
# Bypass 1: Direct API call ignoring UI lock
curl -X POST http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"attacker",
    "problemId":"prob1",
    "languageId":1,
    "code":"solution",
    "contestId":"contest1"
  }'

# Bypass 2: Spoof IP header
curl -X POST http://localhost:3000/api/submissions \
  -H "x-forwarded-for: 192.168.1.1" \
  -H "Content-Type: application/json" \
  -d '{...}'

# Bypass 3: Submit from multiple devices
# Device A: Open contest (fullscreen locked)
# Device B: Submit code (no session validation)
```

---

## RECOMMENDATIONS (TODO)

### Immediate Fixes Required

1. **Add violation check to submission API**
   - Check `participation.isBlocked` before creating submission
   - Check `participation.permanentlyBlocked` before creating submission
   - Reject if any violation threshold exceeded

2. **Implement server-side IP validation**
   - Use only CF-Connecting-IP (Cloudflare) or server-detected IP
   - Reject requests with spoofed x-forwarded-for
   - Validate submission IP matches session IP
   - Log all IP changes for audit

3. **Enforce sessionId validation**
   - Make sessionId REQUIRED parameter in validateSession()
   - Validate sessionId matches stored value
   - Check sessionId freshness (not too old)
   - Invalidate sessionId after contest submission
   - Add server-side device fingerprinting

4. **Implement rate limiting per session**
   - Not just per userId
   - Detect coordinated multi-account attacks

5. **Add audit logging**
   - Log all submission attempts
   - Log violation events with timestamp and IP
   - Log any permission/validation failures
   - Make logs immutable

