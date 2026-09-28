"use client";

import dynamic from "next/dynamic";

const ProctorCheck = dynamic(() => import("@/components/ProctorCheck"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-gray-200 dark:border-white/10 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          Loading proctoring system...
        </p>
      </div>
    </div>
  ),
});

export default function CamPage() {
  return <ProctorCheck />;
}
