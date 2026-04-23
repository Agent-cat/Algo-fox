"use client";

import { useState, useEffect } from "react";
import { Lock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SubscriptionOverlayProps {
  title: string;
  description: string;
}

export default function SubscriptionOverlay({ title, description }: SubscriptionOverlayProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [router]);

  if (!mounted) return null;

  return (
    <Dialog open={true} onOpenChangeAction={(open) => !open && router.back()}>
      <DialogContent
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscription-modal-title"
        className="sm:max-w-[420px] p-8 rounded-3xl border-gray-200 dark:border-white/10 shadow-2xl [&>button]:hidden"
      >
        <DialogHeader className="items-center gap-6">
          <div className="relative">
            <Avatar className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center border border-orange-500/10">
              <AvatarFallback className="bg-transparent">
                <Lock className="w-8 h-8 text-orange-500" />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-3 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] border border-orange-200 dark:border-orange-500/10 mx-auto">
              Premium Plus
            </div>
            <DialogTitle id="subscription-modal-title" className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {title}
            </DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed px-2 font-medium">
              {description}
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-3 sm:flex-col sm:justify-center sm:space-x-0 mt-6">
          <Link
            href="/subscription"
            className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.98] border-none text-base"
            role="button"
          >
            Unlock Premium Now
            <ChevronRight className="w-4 h-4" />
          </Link>

          <DialogClose asChild>
            <Button
              variant="ghost"
              className="w-full h-14 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-bold text-sm transition-colors hover:bg-transparent"
              onClick={() => router.back()}
              aria-label="Close subscription modal"
            >
              Not right now
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

