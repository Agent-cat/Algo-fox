/**
 * Domain-agnostic shared shapes.
 */

/** Standard paginated list envelope. */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
