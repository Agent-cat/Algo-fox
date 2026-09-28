"use client";

interface StudentSparklineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
}

export function StudentSparkline({
    data,
    width = 80,
    height = 28,
    color = "#ea580c",
}: StudentSparklineProps) {
    if (!data || data.length < 2) {
        return (
            <div
                style={{ width, height }}
                className="flex items-center justify-center text-[10px] text-gray-300 dark:text-gray-600 font-bold border border-dashed border-gray-100 dark:border-gray-800 rounded-lg"
            >
                NO DATA
            </div>
        );
    }

    const max = Math.max(...data, 1);
    const points = data.map((v, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - (v / max) * (height - 6) - 3;
        return `${x},${y}`;
    });

    const pathPoints = points.join(" ");
    const areaPoints = `0,${height} ${pathPoints} ${width},${height}`;

    const allZero = data.every((v) => v === 0);
    const gradientId = `sparkline-gradient-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
            </defs>
            {!allZero && (
                <polyline
                    points={areaPoints}
                    fill={`url(#${gradientId})`}
                    stroke="none"
                />
            )}
            <polyline
                points={pathPoints}
                fill="none"
                stroke={allZero ? "#d1d5db" : color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
            />
        </svg>
    );
}
