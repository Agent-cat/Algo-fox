import { getNotifications, getAvailableTags } from "@/actions/notification";
import { NotificationsClient } from "@/components/placementdashboard/NotificationsClient";

export default async function NotificationsPage() {
    const [notificationsRes, tagsRes] = await Promise.all([
        getNotifications(),
        getAvailableTags()
    ]);

    if (!notificationsRes.success) {
        return (
            <div className="p-6 text-red-500">
                Failed to load notifications: {notificationsRes.error || "Unknown error"}
            </div>
        );
    }

    const notifications = (notificationsRes.notifications || []).map(n => ({
        ...n,
        createdAt: n.createdAt instanceof Date ? n.createdAt.toISOString() : String(n.createdAt),
        updatedAt: n.updatedAt instanceof Date ? n.updatedAt.toISOString() : String(n.updatedAt),
    }));
    const nextCursor = notificationsRes.nextCursor || null;
    const availableTags = tagsRes.success ? (tagsRes.tags || []) : [];

    return (
        <NotificationsClient
            initialNotifications={notifications}
            initialNextCursor={nextCursor}
            availableTags={availableTags}
        />
    );
}
