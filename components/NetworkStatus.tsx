"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff } from "lucide-react";

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Set initial status
    const initialOnline = navigator.onLine;
    setIsOnline(initialOnline);
    setShowBanner(!initialOnline);

    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true); // Show success message
      setTimeout(() => setShowBanner(false), 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Global fetch interceptor to catch 403 banned
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
        const response = await originalFetch(...args);
        // Better Auth typically returns 403 or specific JSON for bans
        if (response.status === 403) {
             const clone = response.clone();
             try {
                const text = await clone.text();
                // Check if body is banned message
                if (text.includes("banned")) {
                     window.location.href = "/banned";
                }
             } catch(e) {}
        }
        return response;
    };

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.fetch = originalFetch; // Restore
    };
  }, []);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-0 left-0 right-0 z-[100] ${
            isOnline
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
          } shadow-lg`}
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-3">
            {isOnline ? (
              <>
                <Wifi className="w-5 h-5" />
                <span className="font-semibold text-sm">
                  Connection restored
                </span>
              </>
            ) : (
              <>
                <WifiOff className="w-5 h-5" />
                <span className="font-semibold text-sm">
                  No internet connection. Please check your network.
                </span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
