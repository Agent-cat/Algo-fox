"use client";

import { useState, useRef, useEffect } from "react";
import { Clock, Play, Square, Timer as TimerIcon, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomTooltip from "../ui/CustomTooltip";
import { toast } from "sonner";

export const TimeTracker = ({ isSubmissionPassed }: { isSubmissionPassed?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"stopwatch" | "timer">("stopwatch");
  const popoverRef = useRef<HTMLDivElement>(null);

  // Stopwatch state
  const [swTime, setSwTime] = useState(0); // in seconds
  const [swIsRunning, setSwIsRunning] = useState(false);

  // Timer state
  const [tmTime, setTmTime] = useState(25 * 60); // default 25 min in seconds
  const [tmInitialTime, setTmInitialTime] = useState(25 * 60);
  const [tmIsRunning, setTmIsRunning] = useState(false);
  const [tmInputMinutes, setTmInputMinutes] = useState("25");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isSubmissionPassed) {
      setSwIsRunning(false);
      setTmIsRunning(false);
    }
  }, [isSubmissionPassed]);

  // Stopwatch logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (swIsRunning) {
      interval = setInterval(() => {
        setSwTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [swIsRunning]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (tmIsRunning && tmTime > 0) {
      interval = setInterval(() => {
        setTmTime((prev) => prev - 1);
      }, 1000);
    } else if (tmIsRunning && tmTime === 0) {
      setTmIsRunning(false);
      toast.error("Time up!", {
        duration: 5000,
        style: {
          background: '#ef4444',
          color: 'white',
          border: 'none',
          fontWeight: 'bold'
        }
      });
    }
    return () => clearInterval(interval);
  }, [tmIsRunning, tmTime]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleTimerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setTmInputMinutes(val);
      const mins = parseInt(val || "0", 10);
      setTmInitialTime(mins * 60);
      if (!tmIsRunning) {
        setTmTime(mins * 60);
      }
    }
  };

  const isAnyRunning = swIsRunning || tmIsRunning;
  const activeTimeDisplay = mode === "stopwatch" ? (swTime > 0 ? formatTime(swTime) : null) : (tmTime !== tmInitialTime || tmIsRunning ? formatTime(tmTime) : null);

  return (
    <div className="relative" ref={popoverRef}>
      <CustomTooltip content="Time Tracker" side="bottom">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center p-2 rounded-xl transition-all duration-300 border border-transparent shadow-none group cursor-pointer ${isOpen || isAnyRunning
            ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500"
            : "hover:bg-gray-100/50 dark:hover:bg-white/5 text-gray-500 hover:text-orange-600 dark:hover:text-orange-500"
            }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <TimerIcon className="w-4.5 h-4.5 transition-transform duration-300" />
          {isAnyRunning && activeTimeDisplay && (
            <span className="ml-1.5 text-xs font-bold font-mono tabular-nums">
              {activeTimeDisplay}
            </span>
          )}
        </motion.button>
      </CustomTooltip>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-72 bg-[#fafafa] dark:bg-[#24262C] border border-gray-200 dark:border-[#333] rounded-2xl shadow-xl shadow-black/5 dark:shadow-black/20 p-4 z-50 origin-top-right overflow-hidden"
          >
            {/* Mode Selector */}
            <div className="flex bg-gray-100 dark:bg-[#1D1E23] p-1 rounded-xl mb-4">
              <button
                onClick={() => setMode("stopwatch")}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-semibold rounded-lg transition-all ${mode === "stopwatch"
                  ? "bg-white dark:bg-[#333] text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
              >
                <Clock className="w-4 h-4" />
                Stopwatch
              </button>
              <button
                onClick={() => setMode("timer")}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-semibold rounded-lg transition-all ${mode === "timer"
                  ? "bg-white dark:bg-[#333] text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
              >
                <TimerIcon className="w-4 h-4" />

                Timer
              </button>
            </div>

            {/* Stopwatch View */}
            {mode === "stopwatch" && (
              <div className="flex flex-col items-center">
                <div className="text-4xl font-mono font-bold tracking-wider mb-6 text-gray-800 dark:text-gray-100 tabular-nums">
                  {formatTime(swTime)}
                </div>
                <div className="flex items-center gap-3 w-full">
                  <button
                    onClick={() => setSwIsRunning(!swIsRunning)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-colors ${swIsRunning
                      ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30"
                      : "bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20"
                      }`}
                  >
                    {swIsRunning ? (
                      <>
                        <Square className="w-4 h-4 fill-current" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" /> {swTime === 0 ? "Start" : "Resume"}
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setSwIsRunning(false);
                      setSwTime(0);
                    }}
                    disabled={swTime === 0}
                    className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#333] text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Timer View */}
            {mode === "timer" && (
              <div className="flex flex-col items-center">
                {!tmIsRunning && tmTime === tmInitialTime ? (
                  <div className="flex items-center gap-2 mb-6">
                    <input
                      type="text"
                      value={tmInputMinutes}
                      onChange={handleTimerInputChange}
                      className="w-20 text-center text-4xl font-mono font-bold bg-transparent border-b-2 border-gray-200 dark:border-[#333] focus:border-orange-500 outline-none text-gray-800 dark:text-gray-100 transition-colors"
                    />
                    <span className="text-lg font-medium text-gray-500">min</span>
                  </div>
                ) : (
                  <div className="text-4xl font-mono font-bold tracking-wider mb-6 text-gray-800 dark:text-gray-100 tabular-nums">
                    {formatTime(tmTime)}
                  </div>
                )}

                <div className="flex items-center gap-3 w-full">
                  <button
                    onClick={() => {
                      if (tmTime > 0) {
                        setTmIsRunning(!tmIsRunning);
                      }
                    }}
                    disabled={tmTime === 0}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-colors disabled:opacity-50 ${tmIsRunning
                      ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30"
                      : "bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20"
                      }`}
                  >
                    {tmIsRunning ? (
                      <>
                        <Square className="w-4 h-4 fill-current" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" /> {tmTime === tmInitialTime ? "Start" : "Resume"}
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setTmIsRunning(false);
                      setTmTime(tmInitialTime);
                    }}
                    disabled={tmTime === tmInitialTime && !tmIsRunning}
                    className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#333] text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
