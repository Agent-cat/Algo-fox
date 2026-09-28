/**
 * @algofox/auth — Better-Auth server config and request-scoped
 * session/role helpers (server-only: uses next/headers).
 *
 * Browser code must import from "@algofox/auth/client" instead,
 * which contains only the authClient and never pulls server modules
 * into the client bundle.
 */
export { auth } from "./auth";
export {
  getSession,
  isNextBailoutError,
  throwIfNextBailoutError,
  getCurrentUser,
  hasRole,
  isAdmin,
  isAuthenticated,
  requireAuth,
  requireRole,
  requireAdmin,
  AuthError,
  UnauthorizedError,
  ForbiddenError,
} from "./auth-utils";
export type { UserRole, AuthUser } from "./auth-utils";
