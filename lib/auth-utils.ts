import { auth } from './auth';
import { headers } from 'next/headers';

export type UserRole = 'STUDENT' | 'ADMIN' | 'MODERATOR';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  institutionId?: string;
}

/**
 * Get the current authenticated user from the session
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return null;
    }

    return {
      id: session.user.id,
      email: session.user.email || '',
      role: (session.user.role || 'STUDENT') as UserRole,
      institutionId: (session.user as any).institutionId,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Check if user has a specific role
 */
export async function hasRole(requiredRole: UserRole | UserRole[]): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return roles.includes(user.role);
}

/**
 * Check if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  return hasRole('ADMIN');
}

/**
 * Check if user is authorized (authenticated)
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

/**
 * Protected route handler - ensures user is authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new UnauthorizedError('Authentication required');
  }
  return user;
}

/**
 * Protected route handler - ensures user has specific role
 */
export async function requireRole(requiredRole: UserRole | UserRole[]) {
  const user = await requireAuth();
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
  if (!roles.includes(user.role)) {
    throw new ForbiddenError(
      `This action requires one of the following roles: ${roles.join(', ')}`
    );
  }
  return user;
}

/**
 * Protected route handler - ensures user is admin
 */
export async function requireAdmin() {
  return requireRole('ADMIN');
}

// Custom error classes
export class AuthError extends Error {
  constructor(message: string, public statusCode: number = 401) {
    super(message);
    this.name = 'AuthError';
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AuthError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}
