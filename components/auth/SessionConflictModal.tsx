"use client";

import { useEffect, useState } from "react";
import { checkSessionConflict, resolveSessionConflict } from "@/actions/auth";
import { Dialog as CustomDialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShieldAlertIcon, LogOutIcon } from "lucide-react";

export function SessionConflictModal() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const check = async () => {
    try {
      const result = await checkSessionConflict();
      if (result.conflict) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    } catch (e) {
        console.error("Failed to check session conflict", e);
    }
  };

  useEffect(() => {
    setMounted(true);
    check();

    const interval = setInterval(() => {
      check();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const handleLogoutOthers = async () => {
    setLoading(true);
    try {
      const result = await resolveSessionConflict("LOGOUT_OTHERS");
      if (result?.success) {
        toast.success("Other sessions have been logged out.");
        setIsOpen(false);
      }
    } catch (e) {
      toast.error("Failed to logout other sessions.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutCurrent = async () => {
    setLoading(true);
    try {
      await resolveSessionConflict("LOGOUT_CURRENT");
      toast.success("Logged out successfully.");
      setIsOpen(false);
      router.push("/"); // Redirect to home as requested
      router.refresh(); // Ensure state is cleared
    } catch (e) {
      toast.error("Failed to logout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomDialog
      open={isOpen}
      onOpenChangeAction={() => {}}
    >
      <div className="flex flex-col items-center text-center p-2">
        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
          <ShieldAlertIcon className="w-6 h-6 text-orange-600 dark:text-orange-500" />
        </div>

        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Active Session Detected</DialogTitle>
          <DialogDescription className="text-center pt-2">
            You are currently logged in on another device. For security reasons, you can only have one active session at a time.
            <br className="my-2" />
            Do you want to logout from the other session or logout from this device?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full gap-2 sm:gap-0 mt-6 pt-2">
          <Button
            variant="outline"
            onClick={handleLogoutCurrent}
            disabled={loading}
            className="w-full sm:w-1/2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <LogOutIcon className="w-4 h-4 mr-2" />
            Logout Here
          </Button>
          <Button
            onClick={handleLogoutOthers}
            disabled={loading}
            className="w-full sm:w-1/2 bg-orange-500 hover:bg-orange-600 text-white"
          >
            Logout Other Session
          </Button>
        </DialogFooter>
      </div>
    </CustomDialog>
  );
}
