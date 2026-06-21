"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useSidebar } from "@/context/SidebarContext";

type BetterAuthSession = {
  session: { impersonatedBy?: string };
  user: any;
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

  useEffect(() => { setMounted(true); }, []);

  const isImpersonating = mounted && !!session?.session?.impersonatedBy;

  return (
    <div
      style={{ marginLeft: sidebarWidth }}
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
