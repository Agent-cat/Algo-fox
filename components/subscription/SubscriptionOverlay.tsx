"use client";

import { useState, useEffect } from "react";
import { Lock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    <Dialog
      open={true}
      onOpenChangeAction={(open) => !open && router.back()}
    >
      <div className="flex flex-col items-center text-center p-2">
        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-6 h-6 text-orange-600 dark:text-orange-500" />
        </div>

        <DialogHeader className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] border border-orange-200 dark:border-orange-500/10 mx-auto">
            Premium
          </div>
          <DialogTitle id="subscription-modal-title" className="text-xl font-bold text-center">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center pt-2 text-gray-500 dark:text-gray-400">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full gap-2 sm:gap-0 mt-6 pt-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-full sm:w-1/2 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 font-bold"
            >
              Not right now
            </Button>
          </DialogClose>
          <Link
            href="/subscription"
            className="w-full sm:w-1/2 h-10 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.98] border-none text-sm"
          >
            Get Premium
            <ChevronRight className="w-4 h-4" />
          </Link>
        </DialogFooter>
      </div>
    </Dialog>
  );
}

