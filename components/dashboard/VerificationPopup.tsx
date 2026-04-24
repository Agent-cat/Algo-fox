"use client";

import { useEffect, useState } from "react";
import { Dialog as CustomDialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldAlertIcon } from "lucide-react";

export function VerificationPopup() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    if (searchParams?.get("onboarding") === "complete") {
      setIsOpen(true);
      // Clean up the URL so it doesn't pop up again on refresh
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [searchParams]);

  if (!mounted) return null;

  const handleProceed = () => {
    setIsOpen(false);
    router.push("/dashboard/settings/platform");
  };

  const handleSkip = () => {
    setIsOpen(false);
  };

  return (
    <CustomDialog
      open={isOpen}
      onOpenChangeAction={setIsOpen}
    >
      <div className="flex flex-col items-center text-center p-2">
        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
          <ShieldAlertIcon className="w-6 h-6 text-orange-600 dark:text-orange-500" />
        </div>

        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Complete Platform Verification</DialogTitle>
          <DialogDescription className="text-center pt-2">
            To get the most out of your dashboard analytics and accurately track your progress, please connect your coding platforms (LeetCode, CodeChef, CodeForces).
            <br className="my-2" />
            Do you want to proceed and verify them now?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full gap-2 sm:gap-0 mt-6 pt-2 flex flex-col sm:flex-row">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="w-full sm:w-1/2 border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900/50"
          >
            Ask Me Later
          </Button>
          <Button
            onClick={handleProceed}
            className="w-full sm:w-1/2 bg-orange-500 hover:bg-orange-600 text-white"
          >
            Proceed to Verification
          </Button>
        </DialogFooter>
      </div>
    </CustomDialog>
  );
}
