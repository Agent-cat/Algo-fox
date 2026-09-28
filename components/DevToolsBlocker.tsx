"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from "@/lib/auth-client";

// Add the allowed emails here
const ALLOWED_EMAILS: string[] = [
  "mandalavishnxuvardhan07@gmail.com"
];

// PERF: anti-cheat enforcement only matters during contests and proctoring.
// Running these detection loops site-wide burned CPU on every page for every
// visitor (3 intervals + 2 debugger loops). They are now scoped to protected
// routes and collapsed into a single timer that pauses in hidden tabs.
const PROTECTED_ROUTE_PREFIXES = ["/contest/", "/cam"];

function isProtectedRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return PROTECTED_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export default function DevToolsBlocker() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (!isProtectedRoute(pathname)) return;

    // If the user is in the allowed list, do not block DevTools
    if (session?.user?.email && ALLOWED_EMAILS.includes(session.user.email)) {
      return;
    }
    // 1. Disable Right-Click Context Menu (Capture phase to block early)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toast.error("Right-click is disabled.");
      return false;
    };

    // 2. Disable Keyboard Shortcuts for DevTools & Source & Save & Paste
    const handleKeyDown = (e: KeyboardEvent) => {
      // Helper to show toast only once per specific blocked action if needed, or always
      const blockAction = (actionName: string) => {
          e.preventDefault();
          e.stopPropagation();
          toast.error(`${actionName} is disabled.`);
          return false;
      };

      // Block PrintScreen
      if (e.key === 'PrintScreen') {
          // Attempt to clear clipboard to prevent the screenshot from being useful if it was copied there
          try {
            navigator.clipboard.writeText('');
          } catch (err) {
            // ignore
          }
          return blockAction("PrintScreen");
      }

      // F12 - Open Dev Tools
      if (e.keyCode === 123) {
        return blockAction("DevTools");
      }
      // Ctrl+Shift+I - Open Dev Tools
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        return blockAction("DevTools");
      }
      // Ctrl+Shift+J - Open Console
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        return blockAction("Console");
      }
      // Ctrl+Shift+C - Inspect Element
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        return blockAction("Element Inspector");
      }
      // Ctrl+U - View Source
      if (e.ctrlKey && e.keyCode === 85) {
        return blockAction("View Source");
      }
      // Ctrl+S - Save Page
      if (e.ctrlKey && e.keyCode === 83) {
        return blockAction("Save Page");
      }
      // Ctrl+P - Print
      if (e.ctrlKey && e.keyCode === 80) {
        return blockAction("Print");
      }
    };



    // 5. DevTools Detection via Console
    let devtools = false;
    let isReloading = false;
    const element = new Image();

    const triggerReload = () => {
      if (isReloading) return;
      isReloading = true;
      toast.error("DevTools detected! Reloading page...", {
        duration: 3000,
        position: "top-center"
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    };

    const detectDevTools = () => {
      if (devtools) {
        console.clear();
        console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
        console.log('%cThis is a browser feature intended for developers.', 'color: red; font-size: 20px;');
        triggerReload();
      }
    };

    Object.defineProperty(element, 'id', {
      get: function() {
        devtools = true;
        detectDevTools();
        return "id";
      }
    });

    // 6. Check periodically based on window resize
    const checkDevToolsResize = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;

      if (widthThreshold || heightThreshold) {
        devtools = true;
        detectDevTools();
        triggerReload();
      }
    };

    // PERF: single consolidated timer (was 3 setIntervals + a self-scheduling
    // setTimeout debugger loop). Pauses when the tab is hidden.
    const consolidatedInterval = setInterval(() => {
      if (document.hidden) return;

      // Console-based detection
      devtools = false;
      console.log(element);
      console.clear();

      // Resize-based detection
      checkDevToolsResize();

      // Debugger timing detection
      const start = performance.now();
      Function('debugger')();
      if (performance.now() - start > 100) {
        triggerReload();
      }
    }, 5000);

    // Attach listeners with CAPTURE: TRUE to intercept events before other handlers (like Monaco)
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('keydown', handleKeyDown, true);


    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('keydown', handleKeyDown, true);

      clearInterval(consolidatedInterval);
    };
  }, [session, pathname]);

  return null;
}
