"use client";

import { useEffect, useState } from "react";

export default function FocusBlur() {
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    // Initial check
    setIsFocused(document.hasFocus());

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  if (isFocused) return null;

  return (
    <div className="fixed inset-0 z-99999 backdrop-blur-xl bg-background/50 flex items-center justify-center pointer-events-none select-none">
      {/* Optional: Add a message or icon if desired, but user just asked to blur */}
    </div>
  );
}
