"use client";

import { motion } from "framer-motion";

type Mode = "practice" | "learn";

interface ModeToggleProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex items-center bg-gray-100 dark:bg-[#1a1a1a] rounded-lg p-1">
        <button
          onClick={() => onModeChange("practice")}
          className={`relative z-10 px-8 py-2 hover:cursor-pointer rounded-md font-medium text-sm ${mode === "practice" ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
        >
          {mode === "practice" && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white dark:bg-[#262626] rounded-md shadow-sm border border-gray-200 dark:border-[#333333]"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{ zIndex: -1 }}
            />
          )}
          Practice
        </button>
        <button
          onClick={() => onModeChange("learn")}
          className={`relative z-10 px-8 py-2 hover:cursor-pointer rounded-md font-medium text-sm ${mode === "learn" ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
        >
          {mode === "learn" && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white dark:bg-[#262626] hover:bg-gray-100 dark:hover:bg-[#333333] rounded-md shadow-sm border border-gray-200 dark:border-[#333333]"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{ zIndex: -1 }}
            />
          )}
          Learn
        </button>
      </div>
    </div>
  );
}


