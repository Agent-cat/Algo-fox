"use client";

import React from "react";
import { Dialog as CustomDialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send, AlertTriangle } from "lucide-react";

interface SubmitConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
}

export function SubmitConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title = "Final Submission",
  description = "Are you sure you want to submit your solution? Once submitted, your code will be evaluated against all test cases for final scoring."
}: SubmitConfirmationModalProps) {
  return (
    <CustomDialog
      open={isOpen}
      onOpenChangeAction={onClose}
    >
      <div className="flex flex-col items-center text-center p-2">
        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-500" />
        </div>

        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">{title}</DialogTitle>
          <DialogDescription className="text-center pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="w-full gap-2 sm:gap-0 mt-6 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-1/2 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="w-full sm:w-1/2 bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            Confirm & Submit
          </Button>
        </DialogFooter>
      </div>
    </CustomDialog>
  );
}
