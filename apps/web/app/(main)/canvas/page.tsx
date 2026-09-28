"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const TldrawCanvas = dynamic(() => import("@/components/canvas/TldrawCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[var(--content-height)] w-full bg-[#fafafa] dark:bg-[#1D1E23]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        <span className="text-sm font-semibold text-gray-500">Loading Canvas...</span>
      </div>
    </div>
  ),
});

export default function CanvasPage() {
  return <TldrawCanvas />;
}
