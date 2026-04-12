"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export function ThemeToggleButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 text-gray-500 opacity-50 cursor-default rounded-lg">
         <Moon className="w-4 h-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92, rotate: isDark ? 90 : -90 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
