interface ProblemOverviewCardProps {
    solvedByDifficulty: {
        EASY: number;
        MEDIUM: number;
        HARD: number;
    };
    totalProblems: {
        EASY: number;
        MEDIUM: number;
        HARD: number;
        TOTAL: number;
    };
    problemsSolved: number;
}

export function ProblemOverviewCard({
    solvedByDifficulty,
    totalProblems,
}: ProblemOverviewCardProps) {


    const calculatedSolved = solvedByDifficulty.EASY + solvedByDifficulty.MEDIUM + solvedByDifficulty.HARD;
    const total = Math.max(totalProblems.TOTAL || 1, 1);


    const percentage = Math.round((calculatedSolved / total) * 100);


    const easyPct = (solvedByDifficulty.EASY / total) * 100;
    const medPct = (solvedByDifficulty.MEDIUM / total) * 100;
    const hardPct = (solvedByDifficulty.HARD / total) * 100;


    const radius = 100;
    const circumference = 2 * Math.PI * radius;


    const easyArc = (easyPct / 100) * circumference;
    const medArc = (medPct / 100) * circumference;
    const hardArc = (hardPct / 100) * circumference;

    return (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-6 hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Problem Solving Overview</h3>
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-8 h-full">


                <div className="w-full sm:w-auto min-w-[140px] space-y-3 self-center">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <span className="text-xs font-semibold text-green-600">Easy</span>
                        </div>
                        <div className="text-right flex items-baseline gap-1 pl-4">
                            <span className="text-sm font-bold text-gray-900">{solvedByDifficulty.EASY}</span>
                            <span className="text-[10px] text-gray-400">/ {totalProblems.EASY}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="text-xs font-semibold text-orange-600">Med.</span>
                        </div>
                        <div className="text-right flex items-baseline gap-1 pl-4">
                            <span className="text-sm font-bold text-gray-900">{solvedByDifficulty.MEDIUM}</span>
                            <span className="text-[10px] text-gray-400">/ {totalProblems.MEDIUM}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            <span className="text-xs font-semibold text-red-600">Hard</span>
                        </div>
                        <div className="text-right flex items-baseline gap-1 pl-4">
                            <span className="text-sm font-bold text-gray-900">{solvedByDifficulty.HARD}</span>
                            <span className="text-[#3c3c3c] text-xs">/ {totalProblems.HARD}</span>
                        </div>
                    </div>
                </div>


                <div className="relative flex-1 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                        <svg className="w-full h-full transform -rotate-90 transition-transform duration-500 hover:scale-105">

                            <circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                fill="none"
                                stroke="#f3f4f6" // gray-100
                                strokeWidth="20"
                            />


                            <circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                fill="none"
                                stroke="#22c55e" // green-500
                                strokeWidth="20"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference - easyArc}
                                strokeLinecap="round"
                            />


                            <circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                fill="none"
                                stroke="#f97316"
                                strokeWidth="20"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference - medArc}
                                strokeLinecap="round"
                                style={{
                                    transform: `rotate(${(easyPct / 100) * 360}deg)`,
                                    transformOrigin: "50% 50%"
                                }}
                            />


                            <circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                fill="none"
                                stroke="#ef4444" // red-500
                                strokeWidth="20"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference - hardArc}
                                strokeLinecap="round"
                                style={{
                                    transform: `rotate(${((easyPct + medPct) / 100) * 360}deg)`,
                                    transformOrigin: "50% 50%"
                                }}
                            />
                        </svg>


                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-5xl font-extrabold text-gray-900 tracking-tight">
                                {percentage}%
                            </span>
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">
                                Completed
                            </span>
                            <span className="text-sm font-medium text-gray-500 mt-2">
                                {calculatedSolved} / {total}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
