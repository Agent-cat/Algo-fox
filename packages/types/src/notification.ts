/**
 * Canonical notification shapes.
 * Unifies the four previously duplicated `Notification` interfaces
 * (home dropdown/widget, detail view, placement-dashboard manager).
 */

export interface NotificationAuthor {
  id: string;
  name: string;
  image?: string | null;
}

/** Read-side notification (list, dropdown, detail views). */
export interface Notification {
  id: string;
  title: string;
  content: string;
  author: NotificationAuthor;
  targetTags: string[];
  createdAt: string;
}

/** Manage-side notification (CRUD views with pinning + audit dates). */
export interface ManagedNotification extends Notification {
  authorId: string;
  pinned: boolean;
  updatedAt: string;
}
