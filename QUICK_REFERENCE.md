# QUICK REFERENCE GUIDE - Security Vulnerabilities

## File Locations Quick Map

### Vulnerability #1: Proctoring Bypass
| File | Lines | Issue |
|------|-------|-------|
| `components/contest/ContestProtection.tsx` | 111-188 | handleViolation ignores soft violations |
| `components/contest/ContestProtection.tsx` | 141-145 | Copy/paste don't count as violations |
| `app/api/submissions/route.ts` | 58-65 | No violation check before submission |
| `core/services/contest.service.ts` | 49-73 | validateSession doesn't enforce checks |
| `actions/contest.ts` | 596-629 | Violations logged but not enforced |

### Vulnerability #2: IP Spoofing
| File | Lines | Issue |
|------|-------|-------|
| `lib/ip.ts` | 11-15 | x-forwarded-for is spoofable |
| `lib/ip.ts` | 19-20 | x-real-ip is spoofable |
| `lib/ip.ts` | 47-54 | isIPAllowed() defined but NEVER USED |
| `actions/contest.ts` | 577-582 | getClientIP() stores spoofable IP |
| `core/services/contest.service.ts` | 546-549 | IP stored but not validated |

### Vulnerability #3: Multi-Device/Session Bypass
| File | Lines | Issue |
|------|-------|-------|
| `app/api/submissions/route.ts` | 60 | validateSession called WITHOUT sessionId |
| `core/services/contest.service.ts` | 49 | sessionId parameter is OPTIONAL |
| `core/services/contest.service.ts` | 68 | sessionId validation is conditional |
| `components/contest/ContestProtection.tsx` | 278 | sessionId only used for BroadcastChannel |
| `prisma/schema.prisma` | 419 | sessionId defined as String? (nullable) |

---

## Critical Code Snippets to Fix

### Fix #1: Block Submissions on Violations
**Location**: `/app/api/submissions/route.ts` (Add after line 64)

```typescript
// Add this check:
if (validation.participation.isBlocked || validation.participation.permanentlyBlocked) {
    return NextResponse.json({ error: "Blocked due to violations" }, { status: 403 });
}
```

### Fix #2: Require sessionId in Submission
**Location**: `/app/api/submissions/route.ts` (Add at line 44)

```typescript
// Extract sessionId:
const { userId, problemId, languageId, code, mode = "SUBMIT", contestId, sessionId, customTestCases } = body;

// Validate it:
if (contestId && !sessionId) {
    return NextResponse.json({ error: "Session required" }, { status: 400 });
}

// Pass it to validation:
const validation = await ContestService.validateSession(userId, contestId, sessionId);
```

### Fix #3: Make sessionId Required
**Location**: `/core/services/contest.service.ts` (Change line 49)

```typescript
// FROM:
static async validateSession(userId: string, contestId: string, sessionId?: string) {

// TO:
static async validateSession(userId: string, contestId: string, sessionId: string) {
    // ... then change line 68 from:
    if (sessionId && participation.sessionId !== sessionId) {
    // ... to:
    if (participation.sessionId !== sessionId) {
```

### Fix #4: Remove Soft Violations
**Location**: `/components/contest/ContestProtection.tsx` (Remove lines 141-145)

```typescript
// DELETE THIS:
const warningOnlyTypes = ["KEYBOARD_SHORTCUT", "COPY_PASTE"];
if (warningOnlyTypes.includes(type)) {
    return;
}

// ALL violations should be logged and counted
```

### Fix #5: Use IP Validation
**Location**: `/app/api/submissions/route.ts` (Add before line 70)

```typescript
// Add IP check:
if (contestId && validation.participation?.ipAddress) {
    const clientIP = await getClientIP();
    if (clientIP && clientIP !== validation.participation.ipAddress) {
        return NextResponse.json({ error: "IP mismatch" }, { status: 403 });
    }
}
```

---

## API Request Examples to Test Vulnerabilities

### Test 1: Bypass Proctoring Lock
```bash
curl -X POST http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -H "Cookie: session=your-session-cookie" \
  -d '{
    "userId": "your-user-id",
    "problemId": "problem-id",
    "languageId": 1,
    "code": "console.log(test)",
    "contestId": "contest-id"
  }'
```

**Expected Behavior (Current)**: Submission accepted even if blocked ✓
**Expected Behavior (Fixed)**: 403 Blocked due to violations ✗

### Test 2: Spoof IP Address
```bash
curl -X POST http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -H "x-forwarded-for: 192.168.1.1" \
  -H "Cookie: session=your-session-cookie" \
  -d '{...}'
```

**Current Vulnerability**: Server accepts spoofed IP
**Expected (Fixed)**: Server validates IP against session IP

### Test 3: Submit from Multiple Devices
```bash
# Device A: Open contest
curl http://localhost:3000/contest/contest-id?start=true

# Device B: Submit without sessionId
curl -X POST http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -H "Cookie: session=your-session-cookie" \
  -d '{
    "userId": "your-user-id",
    "problemId": "problem-id",
    "languageId": 1,
    "code": "solution",
    "contestId": "contest-id"
    # NO sessionId!
  }'
```

**Current Vulnerability**: No error, submission accepted
**Expected (Fixed)**: 400 Session required

---

## Database Queries to Verify Issues

### Check IP History
```sql
SELECT userId, contestId, ipAddress, totalViolations, isBlocked
FROM contest_participation
WHERE contestId = 'contest-id'
ORDER BY totalViolations DESC;
```

### Check Session Info
```sql
SELECT userId, contestId, sessionId, sessionStartedAt, isBlocked, permanentlyBlocked
FROM contest_participation
WHERE contestId = 'contest-id'
ORDER BY sessionStartedAt DESC;
```

### Check Violations Log
```sql
SELECT p.userId, cv.type, cv.message, cv.createdAt
FROM contest_violation cv
JOIN contest_participation p ON cv.participationId = p.id
WHERE p.contestId = 'contest-id'
ORDER BY cv.createdAt DESC;
```

---

## Priority Order for Fixes

### Priority 1: CRITICAL (Do First)
1. ✓ Make sessionId REQUIRED in validateSession()
2. ✓ Pass sessionId in /api/submissions request
3. ✓ Add violation check before creating submission

### Priority 2: HIGH (Do Second)
4. ✓ Implement server-side IP validation
5. ✓ Remove soft violations (copy/paste, keyboard shortcuts)
6. ✓ Add IP consistency check on submissions

### Priority 3: MEDIUM (Do Third)
7. ✓ Add device fingerprinting
8. ✓ Implement audit logging
9. ✓ Add database indexes for performance

---

## Testing Checklist

- [ ] Blocked user cannot submit code
- [ ] Blocked user sees correct error message
- [ ] Spoofed IP is rejected on submission
- [ ] sessionId is required for contest submission
- [ ] Multi-device submission is blocked
- [ ] Copy-paste violations are counted
- [ ] DevTools violations are counted
- [ ] Keyboard shortcuts violations are counted
- [ ] Tab switch violations block submission at threshold
- [ ] Permanent block prevents all submissions
- [ ] Temporary block expires correctly

---

## Files Modified Checklist

- [ ] `/app/api/submissions/route.ts` - Add sessionId & violation checks
- [ ] `/core/services/contest.service.ts` - Make sessionId required
- [ ] `/components/contest/ContestProtection.tsx` - Send sessionId with submission
- [ ] `/lib/ip.ts` - Implement IP validation
- [ ] `/actions/contest.ts` - Use isIPAllowed()
- [ ] `/prisma/schema.prisma` - Make sessionId required, add indexes

---

## References

Full details available in:
- `SECURITY_VULNERABILITIES.md` - Complete analysis (866 lines)
- `VULNERABILITY_SUMMARY.txt` - Detailed breakdown (545 lines)

Quick summary:
- **3 Critical Vulnerabilities Identified**
- **6 Files Need Immediate Changes**
- **10+ Missing Security Checks**
- **All Can Be Exploited by Authenticated Users**

