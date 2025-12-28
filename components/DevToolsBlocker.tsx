'use client';

import { useEffect } from 'react';

export default function DevToolsBlocker() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for dev tools
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 - Open Dev Tools
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+I - Open Dev Tools
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+J - Open Console
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }
      // Ctrl+Shift+C - Inspect Element
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
      // Ctrl+U - View Source
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      // Ctrl+S - Save Page
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }
      // Ctrl+P - Print (often used to view source)
      if (e.ctrlKey && e.keyCode === 80) {
        e.preventDefault();
        return false;
      }
    };

    // Detect dev tools via console detection
    let devtools = false;
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: function() {
        devtools = true;
        detectDevTools();
      }
    });

    // Console detection
    const detectDevTools = () => {
      if (devtools) {
        // Clear console
        console.clear();
        
        // Log a warning
        console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
        console.log('%cThis is a browser feature intended for developers.', 'color: red; font-size: 20px;');
        
        // Redirect or show warning (uncomment if you want to redirect)
        // window.location.href = '/';
        
        // Set devtools back to false after a delay
        setTimeout(() => {
          devtools = false;
        }, 1000);
      }
    };

    // Check periodically if dev tools are open
    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      
      if (widthThreshold || heightThreshold) {
        detectDevTools();
      }
    };

    // Run console detection trick periodically
    const consoleDetectionInterval = setInterval(() => {
      devtools = false;
      console.log(element);
      console.clear();
    }, 1000);

    // Check for dev tools periodically
    const checkDevToolsInterval = setInterval(checkDevTools, 500);

    // Continuous debugger that pauses when dev tools are open
    // Using setInterval with anonymous function to continuously trigger debugger
    const runDebugger = setInterval(() => {
      (function() {
        debugger;
      })();
    }, 100);

    // Additional debugger loop for more aggressive protection
    let debuggerTimeoutId: NodeJS.Timeout;
    const debuggerLoop = () => {
      debugger; // This will pause if dev tools are open
      debuggerTimeoutId = setTimeout(debuggerLoop, 50);
    };
    debuggerLoop();

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      clearInterval(runDebugger);
      clearTimeout(debuggerTimeoutId);
      clearInterval(checkDevToolsInterval);
      clearInterval(consoleDetectionInterval);
    };
  }, []);

  return null;
}

