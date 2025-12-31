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
      <div className="relative inline-flex items-center bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onModeChange("practice")}
          className={`relative z-10 px-8 py-2 rounded-md font-medium text-sm transition-colors ${mode === "practice" ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
            }`}
        >
          {mode === "practice" && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white rounded-md shadow-sm border border-gray-200"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{ zIndex: -1 }}
            />
          )}
          Practice
        </button>
        <button
          onClick={() => onModeChange("learn")}
          className={`relative z-10 px-8 py-2 rounded-md font-medium text-sm transition-colors ${mode === "learn" ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
            }`}
        >
          {mode === "learn" && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white rounded-md shadow-sm border border-gray-200"
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


