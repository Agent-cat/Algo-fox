import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "5", 10);

    const notifications = await prisma.notification.findMany({
      take: limit,
      include: {
        author: {
          select: { id: true, name: true, image: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    const serialized = notifications.map(n => ({
      ...n,
      createdAt: n.createdAt.toISOString(),
      updatedAt: n.updatedAt.toISOString(),
    }));

    return NextResponse.json({ success: true, notifications: serialized });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return NextResponse.json({ success: false, notifications: [] }, { status: 500 });
  }
}
