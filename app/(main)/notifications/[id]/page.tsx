import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { NotificationDetailClient } from "@/components/notifications/NotificationDetailClient";

interface NotificationPageProps {
  params: Promise<{ id: string }>;
}

async function getNotification(id: string) {
  try {
    const notification = await prisma.notification.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true, image: true }
        }
      }
    });

    if (!notification) {
      return null;
    }

    return {
      ...notification,
      createdAt: notification.createdAt.toISOString(),
      updatedAt: notification.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch notification:", error);
    return null;
  }
}

export async function generateMetadata({ params }: NotificationPageProps): Promise<Metadata> {
  const { id } = await params;
  const notification = await getNotification(id);

  if (!notification) {
    return { title: "Notification Not Found" };
  }

  return {
    title: notification.title,
    description: notification.content.replace(/[#*`>\-\[\]]/g, "").substring(0, 160),
  };
}

export default async function NotificationPage({ params }: NotificationPageProps) {
  const { id } = await params;
  const notification = await getNotification(id);

  if (!notification) {
    notFound();
  }

  return <NotificationDetailClient notification={notification} />;
}
