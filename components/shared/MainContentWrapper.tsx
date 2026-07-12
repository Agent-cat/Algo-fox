"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useSidebar } from "@/context/SidebarContext";

type BetterAuthSession = {
  session: { impersonatedBy?: string };
  user: { id: string; role?: string };
} | null;

export default function MainContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = authClient.useSession();
  const session = data as BetterAuthSession;
  const { sidebarWidth, isDragging } = useSidebar();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const isImpersonating = mounted && !!session?.session?.impersonatedBy;
  const contentHeight = isImpersonating ? "calc(100vh - 104px)" : "calc(100vh - 64px)";

  return (
    <div
      style={{
        marginLeft: session?.user ? sidebarWidth : 0,
        ...({ "--content-height": contentHeight } as React.CSSProperties),
      }}
      className={[
        !isDragging && "transition-[margin-left] duration-300 ease-in-out",
        "min-h-screen",
        isImpersonating ? "pt-26" : "pt-16",
      ].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
