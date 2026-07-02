import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    const cursor = searchParams.get("cursor");

    const query: any = {
      take: limit + 1,
      include: {
        author: {
          select: { id: true, name: true, image: true }
        }
      },
      orderBy: { createdAt: "desc" }
    };

    if (cursor) {
      query.cursor = { id: cursor };
      query.skip = 1;
    }

    const notifications = await prisma.notification.findMany(query);

    const hasMore = notifications.length > limit;
    const serialized = notifications.slice(0, limit).map(n => ({
      ...n,
      createdAt: n.createdAt.toISOString(),
      updatedAt: n.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      notifications: serialized,
      nextCursor: hasMore ? serialized[serialized.length - 1]?.id : null
    });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return NextResponse.json({ success: false, notifications: [] }, { status: 500 });
  }
}
