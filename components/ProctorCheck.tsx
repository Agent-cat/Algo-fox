"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// PERF: TF.js + blazeface + coco-ssd are megabytes — never bundle statically.
// They are dynamically imported after camera access is granted (see init below),
// so /cam paints UI first and downloads models lazily.
import type * as blazeface from "@tensorflow-models/blazeface";
import type * as cocoSsd from "@tensorflow-models/coco-ssd";

type ModelStatus = "loading" | "ready" | "error";
type GazeStatus = "centered" | "away" | "no_face";

interface DetectionWarning {
  id: number;
  message: string;
  timestamp: number;
}

const ANALYSIS_INTERVAL_MS = 300;
const GAZE_AWAY_THRESHOLD_MS = 5000;
const GAZE_COOLDOWN_MS = 10000;
const GAZE_OFFSET_RATIO = 0.12;

export default function ProctorCheck() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blazefaceModelRef = useRef<blazeface.BlazeFaceModel | null>(null);
  const cocoModelRef = useRef<cocoSsd.ObjectDetection | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastAnalysisRef = useRef<number>(0);

  const lookingAwayStartRef = useRef<number | null>(null);
  const wasLookingAwayRef = useRef(false);
  const lastGazeWarningRef = useRef(0);

  const [modelStatus, setModelStatus] = useState<ModelStatus>("loading");
  const [loadingMessage, setLoadingMessage] = useState("Initializing TensorFlow...");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<DetectionWarning[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [gazeStatus, setGazeStatus] = useState<GazeStatus>("centered");
  const [gazeAwaySeconds, setGazeAwaySeconds] = useState(0);
  const warningIdRef = useRef(0);

  const addWarning = useCallback((message: string) => {
    warningIdRef.current += 1;
    const warning: DetectionWarning = {
      id: warningIdRef.current,
      message,
      timestamp: Date.now(),
    };
    setWarnings((prev) => [...prev, warning]);
  }, []);

  const analyzeFrame = useCallback(async () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return;
    if (!blazefaceModelRef.current || !cocoModelRef.current) return;

    const now = performance.now();
    if (now - lastAnalysisRef.current < ANALYSIS_INTERVAL_MS) {
      animationFrameRef.current = requestAnimationFrame(analyzeFrame);
      return;
    }
    lastAnalysisRef.current = now;

    try {
      const faces = await blazefaceModelRef.current.estimateFaces(video, false);
      const objects = await cocoModelRef.current.detect(video);

      if (faces.length > 1) {
        addWarning(`Multiple faces detected (${faces.length}). Only one person is allowed.`);
      } else if (faces.length === 0) {
        addWarning("No face detected. Please stay in front of the camera.");
        setGazeStatus("no_face");
      }

      // ── Gaze / eye tracking ──────────────────────────────
      if (faces.length === 1) {
        const face = faces[0];
        const landmarks = face.landmarks;
        const [x1, y1] = face.topLeft as [number, number];
        const [x2, y2] = face.bottomRight as [number, number];
        const faceCenterX = (x1 + x2) / 2;
        const faceWidth = x2 - x1;

        // Use eye landmarks for gaze estimation
        // landmarks[0] = right eye, landmarks[1] = left eye
        if (landmarks && Array.isArray(landmarks) && landmarks.length >= 2) {
          const rightEye = landmarks[0] as number[];
          const leftEye = landmarks[1] as number[];
          const eyeCenterX = (rightEye[0] + leftEye[0]) / 2;
          const eyeOffsetFromFaceCenter = (eyeCenterX - faceCenterX) / faceWidth;

          const isLookingAway = Math.abs(eyeOffsetFromFaceCenter) > GAZE_OFFSET_RATIO;

          if (isLookingAway) {
            if (!wasLookingAwayRef.current) {
              wasLookingAwayRef.current = true;
              lookingAwayStartRef.current = now;
              setGazeStatus("away");
            } else if (lookingAwayStartRef.current) {
              const elapsed = now - lookingAwayStartRef.current;
              setGazeAwaySeconds(Math.floor(elapsed / 1000));

              if (elapsed >= GAZE_AWAY_THRESHOLD_MS) {
                if (now - lastGazeWarningRef.current >= GAZE_COOLDOWN_MS) {
                  addWarning("You have been looking away from the screen for more than 5 seconds. Please face the camera.");
                  lastGazeWarningRef.current = now;
                }
                lookingAwayStartRef.current = now;
              }
            }
          } else {
            wasLookingAwayRef.current = false;
            lookingAwayStartRef.current = null;
            setGazeStatus("centered");
            setGazeAwaySeconds(0);
          }
        } else {
          // Fallback: use face position in frame
          const frameCenterX = video.videoWidth / 2;
          const offsetRatio = Math.abs(faceCenterX - frameCenterX) / video.videoWidth;
          const isLookingAway = offsetRatio > GAZE_OFFSET_RATIO;

          if (isLookingAway) {
            if (!wasLookingAwayRef.current) {
              wasLookingAwayRef.current = true;
              lookingAwayStartRef.current = now;
              setGazeStatus("away");
            } else if (lookingAwayStartRef.current) {
              const elapsed = now - lookingAwayStartRef.current;
              setGazeAwaySeconds(Math.floor(elapsed / 1000));

              if (elapsed >= GAZE_AWAY_THRESHOLD_MS) {
                if (now - lastGazeWarningRef.current >= GAZE_COOLDOWN_MS) {
                  addWarning("You have been looking away from the screen for more than 5 seconds. Please face the camera.");
                  lastGazeWarningRef.current = now;
                }
                lookingAwayStartRef.current = now;
              }
            }
          } else {
            wasLookingAwayRef.current = false;
            lookingAwayStartRef.current = null;
            setGazeStatus("centered");
            setGazeAwaySeconds(0);
          }
        }
      }

      // ── Object validation ────────────────────────────────
      const laptops = objects.filter((obj) => obj.class === "laptop");
      if (laptops.length > 1) {
        addWarning(`Multiple laptops detected (${laptops.length}). Only one laptop is allowed.`);
      }

      const cellphones = objects.filter((obj) => obj.class === "cell phone");
      if (cellphones.length > 0) {
        addWarning(`Cell phone detected (${cellphones.length}). Electronic gadgets are not allowed.`);
      }

      const gadgets = objects.filter((obj) =>
        obj.class === "remote" ||
        obj.class === "keyboard" ||
        obj.class === "mouse" ||
        obj.class === "tv" ||
        obj.class === "tablet"
      );
      if (gadgets.length > 0) {
        const classNames = [...new Set(gadgets.map((o) => o.class))].join(", ");
        addWarning(`Electronic gadget(s) detected: ${classNames}. Not allowed during the exam.`);
      }

      const otherRestricted = objects.filter(
        (obj) =>
          obj.class !== "laptop" &&
          obj.class !== "person" &&
          obj.class !== "cell phone" &&
          obj.class !== "remote" &&
          obj.class !== "keyboard" &&
          obj.class !== "mouse" &&
          obj.class !== "tv" &&
          obj.class !== "tablet" &&
          obj.class !== "book"
      );
      if (otherRestricted.length > 0) {
        const classNames = [...new Set(otherRestricted.map((o) => o.class))].join(", ");
        addWarning(`Restricted object(s) detected: ${classNames}`);
      }

      // ── Canvas overlay ───────────────────────────────────
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const faceColor = faces.length === 1 ? "#22c55e" : "#ef4444";
          ctx.strokeStyle = faceColor;
          ctx.lineWidth = 3;

          for (const face of faces) {
            const [fx1, fy1] = face.topLeft as [number, number];
            const [fx2, fy2] = face.bottomRight as [number, number];
            ctx.strokeRect(fx1, fy1, fx2 - fx1, fy2 - fy1);

            // Draw eye landmarks
            const landmarks = face.landmarks;
            if (landmarks && Array.isArray(landmarks)) {
              ctx.fillStyle = gazeStatus === "away" ? "#ef4444" : "#22c55e";
              for (const lm of landmarks) {
                const point = lm as number[];
                ctx.beginPath();
                ctx.arc(point[0], point[1], 4, 0, 2 * Math.PI);
                ctx.fill();
              }
            }
          }

          for (const obj of objects) {
            if (obj.class === "person") continue;
            ctx.strokeStyle = "#f59e0b";
            ctx.lineWidth = 2;
            ctx.strokeRect(obj.bbox[0], obj.bbox[1], obj.bbox[2], obj.bbox[3]);
            ctx.fillStyle = "#f59e0b";
            ctx.font = "14px sans-serif";
            ctx.fillText(obj.class, obj.bbox[0], obj.bbox[1] - 6);
          }
        }
      }
    } catch (err) {
      console.error("Analysis error:", err);
    }

    animationFrameRef.current = requestAnimationFrame(analyzeFrame);
  }, [addWarning, gazeStatus]);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let cancelled = false;

    const init = async () => {
      try {
        setLoadingMessage("Requesting camera access...");
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
        });

        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setLoadingMessage("Loading face detection model...");
        const [tf, blazeface, cocoSsd] = await Promise.all([
          import("@tensorflow/tfjs"),
          import("@tensorflow-models/blazeface"),
          import("@tensorflow-models/coco-ssd"),
        ]);
        await tf.ready();
        if (cancelled) return;

        blazefaceModelRef.current = await blazeface.load({
          modelUrl: "/models/blazeface/model.json",
        });
        if (cancelled) return;

        setLoadingMessage("Loading object detection model...");
        cocoModelRef.current = await cocoSsd.load({ base: "lite_mobilenet_v2" });
        if (cancelled) return;

        setModelStatus("ready");
        setIsAnalyzing(true);
      } catch (err) {
        if (!cancelled) {
          console.error("Init error:", err);
          if (err instanceof DOMException && err.name === "NotAllowedError") {
            setCameraError("Camera access denied. Please allow camera permissions and reload.");
          } else if (err instanceof DOMException && err.name === "NotFoundError") {
            setCameraError("No camera found. Please connect a webcam and reload.");
          } else {
            setCameraError("Failed to initialize proctoring system. Please try again.");
          }
          setModelStatus("error");
        }
      }
    };

    init();

    return () => {
      cancelled = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isAnalyzing && modelStatus === "ready") {
      animationFrameRef.current = requestAnimationFrame(analyzeFrame);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnalyzing, modelStatus, analyzeFrame]);

  const gazeLabel = gazeStatus === "centered" ? "Looking at screen" : gazeStatus === "away" ? "Looking away" : "No face";
  const gazeColor = gazeStatus === "centered" ? "text-green-600 dark:text-green-400" : gazeStatus === "away" ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400";

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Proctoring Check
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Ensure only one face and one laptop are visible. Stay centered and look at the screen.
          </p>
        </div>

        {modelStatus === "loading" && (
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="w-16 h-16 border-4 border-gray-200 dark:border-white/10 border-t-orange-500 rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{loadingMessage}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This may take a few moments on first load</p>
            </div>
          </div>
        )}

        {cameraError && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">{cameraError}</p>
          </div>
        )}

        {warnings.length > 0 && (
          <div className="space-y-2">
            {warnings.slice(-5).map((w) => (
              <div key={w.id} className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl px-4 py-3 flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">{w.message}</p>
                  <p className="text-xs text-red-400 dark:text-red-500 mt-0.5">{new Date(w.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="relative rounded-2xl overflow-hidden border-2 border-dotted border-gray-300 dark:border-white/20 bg-black">
          <video ref={videoRef} autoPlay playsInline muted className="w-full aspect-video object-cover" style={{ transform: "scaleX(-1)" }} />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ transform: "scaleX(-1)" }} />

          {modelStatus === "loading" && !cameraError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <div className="w-12 h-12 border-4 border-white/20 border-t-orange-500 rounded-full animate-spin" />
            </div>
          )}

          {modelStatus === "ready" && (
            <>
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-white">Live</span>
              </div>

              {/* Gaze status indicator */}
              <div className={`absolute top-3 right-3 flex items-center gap-2 backdrop-blur-sm rounded-full px-3 py-1.5 ${
                gazeStatus === "centered"
                  ? "bg-green-500/20 border border-green-500/30"
                  : gazeStatus === "away"
                    ? "bg-amber-500/20 border border-amber-500/30"
                    : "bg-red-500/20 border border-red-500/30"
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  gazeStatus === "centered" ? "bg-green-500" : gazeStatus === "away" ? "bg-amber-500 animate-pulse" : "bg-red-500 animate-pulse"
                }`} />
                <span className="text-xs font-medium text-white">{gazeLabel}</span>
                {gazeStatus === "away" && gazeAwaySeconds > 0 && (
                  <span className="text-xs font-bold text-amber-400">{gazeAwaySeconds}s</span>
                )}
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3 text-center">
          <div className={`rounded-xl p-3 border ${modelStatus === "ready" ? "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30" : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10"}`}>
            <p className="text-xs text-gray-500 dark:text-gray-400">Face</p>
            <p className={`text-sm font-semibold ${modelStatus === "ready" ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
              {modelStatus === "ready" ? "Active" : "Loading..."}
            </p>
          </div>
          <div className={`rounded-xl p-3 border ${modelStatus === "ready" ? "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30" : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10"}`}>
            <p className="text-xs text-gray-500 dark:text-gray-400">Objects</p>
            <p className={`text-sm font-semibold ${modelStatus === "ready" ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
              {modelStatus === "ready" ? "Active" : "Loading..."}
            </p>
          </div>
          <div className={`rounded-xl p-3 border ${
            gazeStatus === "centered" && modelStatus === "ready"
              ? "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30"
              : gazeStatus === "away"
                ? "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30"
                : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10"
          }`}>
            <p className="text-xs text-gray-500 dark:text-gray-400">Gaze</p>
            <p className={`text-sm font-semibold ${gazeColor}`}>
              {modelStatus === "ready" ? gazeLabel : "Waiting..."}
            </p>
          </div>
          <div className={`rounded-xl p-3 border ${
            warnings.length === 0 && modelStatus === "ready"
              ? "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30"
              : warnings.length > 0
                ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30"
                : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10"
          }`}>
            <p className="text-xs text-gray-500 dark:text-gray-400">Warnings</p>
            <p className={`text-sm font-semibold ${
              warnings.length === 0 && modelStatus === "ready"
                ? "text-green-600 dark:text-green-400"
                : warnings.length > 0
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-400"
            }`}>
              {modelStatus === "ready" ? warnings.length : "Waiting..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
