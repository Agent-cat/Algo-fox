
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
        async function fetchPoints() {
            try {
                const score = await getUserScore();
                setPoints(score);
            } catch (error) {
                console.error("Failed to fetch user points:", error);
                setPoints(0);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPoints();
    }, []);

    // Refresh points when window gains focus or when points are updated
    useEffect(() => {
        const handleFocus = async () => {
            try {
                const score = await getUserScore();
                setPoints(score);
            } catch (error) {
                console.error("Failed to refresh user points:", error);
            }
        };

        const handlePointsUpdated = async () => {
            try {
                const score = await getUserScore();
                setPoints(score);
            } catch (error) {
                console.error("Failed to refresh user points:", error);
            }
        };

        window.addEventListener("focus", handleFocus);
        window.addEventListener("pointsUpdated", handlePointsUpdated);

        return () => {
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
