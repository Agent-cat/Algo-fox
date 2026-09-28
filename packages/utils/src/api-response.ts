/**
 * Standard API response structure for server actions and API routes.
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    pagination?: {
      total: number;
      pages: number;
      current: number;
      limit: number;
    };
    [key: string]: any;
  };
}

/**
 * Creates a success response.
 */
export function successResponse<T>(data: T, metadata?: ApiResponse<T>["metadata"]): ApiResponse<T> {
  return {
    success: true,
    data,
    metadata,
  };
}

/**
 * Creates an error response.
 */
export function errorResponse(error: string): ApiResponse {
  return {
    success: false,
    error,
  };
}
