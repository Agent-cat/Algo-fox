
// TODO : MAKE IT SERVER COMPONENT AND OPTIMIZE

"use client";

import { useEffect, useState } from "react";
import { getUserScore } from "@/actions/user.action";
import { Coins } from "lucide-react";

interface UserPointsProps {
    className?: string;
}

export default function UserPoints({ className = "" }: UserPointsProps) {
    const [points, setPoints] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        async function fetchPoints() {
            try {
                const score = await getUserScore();
                if (isMounted) setPoints(score);
            } catch (error) {
                 if (isMounted) {
                    console.error("Failed to fetch user points:", error);
                    setPoints(0);
                 }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }

        fetchPoints();
        return () => { isMounted = false; };
    }, []);

    // Refresh points when window gains focus or when points are updated
    useEffect(() => {
        let isMounted = true;
        const handleFocus = async () => {
            try {
                const score = await getUserScore();
                if (isMounted) setPoints(score);
            } catch (error) {
                 if (isMounted) console.error("Failed to refresh user points:", error);
            }
        };

        const handlePointsUpdated = async () => {
            try {
                const score = await getUserScore();
                if (isMounted) setPoints(score);
            } catch (error) {
                 if (isMounted) console.error("Failed to refresh user points:", error);
            }
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
