
"use client";

import { useEffect, useState } from "react";
import { getUserScore } from "@/actions/user.action";
import { Coins } from "lucide-react";

// PERF: this widget remounts on every navigation and used to fire a server
// action per mount + per window focus. A short-lived module-level cache keeps
// repeated mounts free of network round trips while `pointsUpdated` still
// forces an immediate refresh.
const POINTS_CACHE_TTL_MS = 30_000;
let cachedPoints: number | null = null;
let cachedAt = 0;

async function fetchPointsCached(force = false): Promise<number | null> {
    const fresh = cachedPoints !== null && Date.now() - cachedAt < POINTS_CACHE_TTL_MS;
    if (!force && fresh) return cachedPoints;
    try {
        const score = await getUserScore();
        cachedPoints = score;
        cachedAt = Date.now();
        return score;
    } catch (error) {
        console.error("Failed to fetch user points:", error);
        return 0;
    }
}

interface UserPointsProps {
    className?: string;
}

export default function UserPoints({ className = "" }: UserPointsProps) {
    const [points, setPoints] = useState<number | null>(cachedPoints);
    const [isLoading, setIsLoading] = useState(cachedPoints === null);

    useEffect(() => {
        let isMounted = true;
        fetchPointsCached().then((score) => {
            if (!isMounted) return;
            setPoints(score);
            setIsLoading(false);
        });
        return () => { isMounted = false; };
    }, []);

    // Refresh points when window gains focus or when points are updated
    useEffect(() => {
        let isMounted = true;

        const handlePointsUpdated = async () => {
            // Points changed — always bypass the cache
            const score = await fetchPointsCached(true);
            if (isMounted) setPoints(score);
        };

        const handleFocus = async () => {
            if (document.hidden) return;
            const score = await fetchPointsCached();
            if (isMounted && score !== null) setPoints(score);
        };

        window.addEventListener("focus", handleFocus);
        window.addEventListener("pointsUpdated", handlePointsUpdated);

        return () => {
            isMounted = false;
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("pointsUpdated", handlePointsUpdated);
        };
    }, []);

    if (isLoading) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <Coins className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">...</span>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Coins className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{points?.toLocaleString() || 0}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">pts</span>
        </div>
    );
}
