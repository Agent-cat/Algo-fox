# Year-Based Course Allocation System

## Overview
Implemented a scalable year-based course allocation system that allows admins and institution managers to control which courses (DSA, SQL, etc.) are available to students based on their academic year.

## Database Changes

### User Model
- Added `year` field (Int, optional) to store student's academic year (1, 2, 3, 4, 5)

### CourseAllocation Model
- New model to map courses/domains to specific academic years
- Fields:
  - `id`: String (cuid)
  - `year`: Int (academic year)
  - `domain`: ProblemDomain enum (DSA, SQL, etc.)
- Unique constraint on `[year, domain]` to prevent duplicates
- Indexed on `year` and `domain` for optimal query performance

## Features Implemented

### 1. Onboarding Enhancement
**File**: `app/onboarding/page.tsx`
- Added year selection dropdown in step 1
- Required field with options for years 1-5
- Stored in user profile during registration

### 2. Course Allocation Management
**Files**:
- `actions/courseAllocation.action.ts` - Server actions
- `app/(main)/admin/course-allocation/page.tsx` - Admin UI

**Functionality**:
- Admins and Institution Managers can allocate courses to years
- Toggle interface for easy course selection
- Bulk update support for each year
- Proper caching with revalidation

**Admin Access**:
- Added "Allocate Courses" to admin sidebar
- Route: `/admin/course-allocation`

### 3. Smart Course Filtering
**File**: `app/(main)/problems/page.tsx`

**Logic**:
- **Students**: Only see courses allocated to their year
- **Privileged Users** (Admin, Teacher, Institution Manager, Contest Manager): See all courses
- Empty state when no courses are allocated
- Loading state while fetching allocations

### 4. Server Actions
**File**: `actions/courseAllocation.action.ts`

**Functions**:
- `getCourseAllocations()` - Get all allocations (cached, 15min)
- `getCoursesByYear(year)` - Get courses for specific year (cached)
- `getUserAllocatedCourses()` - Get current user's courses with role-based logic
- `allocateCourse(year, domain)` - Add single allocation
- `removeCourseAllocation(year, domain)` - Remove allocation
- `updateYearAllocations(year, domains[])` - Bulk update for a year

**Caching Strategy**:
- 15-minute cache for allocations
- Tagged caching for targeted invalidation
- Revalidates on updates to keep data fresh

## Security & Permissions

### Role-Based Access
- **Students**: View only allocated courses
- **Admins**: Full access + manage allocations
- **Institution Managers**: Full access + manage allocations
- **Teachers**: View all courses
- **Contest Managers**: View all courses

### Protected Routes
- Course allocation management requires ADMIN or INSTITUTION_MANAGER role
- All actions verify user permissions before execution

## Performance Optimizations

1. **Database Indexes**:
   - `year` index for fast year-based queries
   - `domain` index for fast domain-based queries
   - Unique composite index prevents duplicate allocations

2. **Caching**:
   - Next.js cache tags for targeted invalidation
   - 15-minute cache TTL for allocation data
   - Separate cache keys for user-specific data

3. **Optimized Queries**:
   - Uses `select` to fetch only required fields
   - Distinct queries to avoid n+1 problems
   - Proper use of relations and indexes

## User Experience

### For Students:
1. Select academic year during onboarding
2. Only see courses allocated to their year on `/problems`
3. Clear message if no courses are allocated

### For Admins/Institution Managers:
1. Navigate to "Allocate Courses" in admin sidebar
2. Toggle courses for each year
3. Save changes per year
4. Changes reflect immediately for all users

## Migration Path

Used `npx prisma db push` to preserve existing data while adding new fields:
- `year` field added to User (nullable, existing users unaffected)
- `CourseAllocation` table created
- No data loss during migration

## Future Enhancements

Potential improvements:
1. **Semester-based allocation**: Further granularity with semester selection
2. **Institution-specific allocations**: Different allocations per institution
3. **Auto-progression**: Automatically update year based on date
4. **Batch import**: CSV import for bulk allocations
5. **Analytics**: Track course completion rates by year
6. **Prerequisites**: Chain courses with prerequisite requirements

## Testing Checklist

- [x] Onboarding collects year information
- [x] Students see only allocated courses
- [x] Privileged users see all courses
- [x] Admin can allocate courses to years
- [x] Changes reflect immediately
- [x] No courses shows appropriate message
- [x] Database constraints prevent duplicates
- [x] Caching works correctly
- [x] Sidebar shows new menu item
- [x] Permissions are properly enforced
