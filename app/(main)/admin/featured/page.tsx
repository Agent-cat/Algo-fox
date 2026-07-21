import Link from "next/link";
import { getFeaturedItemsAction } from "@/actions/featured";
import { ArrowLeft } from "lucide-react";
import FeaturedManagerClient from "./FeaturedManagerClient";

export default async function AdminFeaturedPage() {
  const items = await getFeaturedItemsAction();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 dark:border-white/10 pb-5">
        <Link
          href="/admin"
          className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors text-gray-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
            Manage Featured Banners
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Upload images, configure redirection URLs, and order custom featured banners for the student homepage dashboard.
          </p>
        </div>
      </div>

      <FeaturedManagerClient initialItems={items} />
    </div>
  );
}
