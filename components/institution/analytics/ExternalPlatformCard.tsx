"use client";

import { CheckCircle2, AlertCircle, ExternalLink, Link2Off } from "lucide-react";
import type { StudentInsights } from "@/actions/institution/analytics";

interface PlatformData {
    name: string;
    handle: string | null;
    verified: boolean;
    solved: number;
    rating: number;
    contests: number;
    logo: React.ReactNode;
    color: string;
    profileUrl: (handle: string) => string;
}

function LeetCodeLogo() {
    return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
    );
}

function CodeChefLogo() {
    return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M11.257.004C5.23-.109.096 4.784.001 10.812c-.095 6.025 4.783 11.05 10.808 11.144l.19.001c6.027 0 10.916-4.888 10.916-10.918C21.916 4.902 17.05.004 11.257.004zm0 1.543c4.995 0 9.06 4.066 9.06 9.061 0 4.998-4.065 9.063-9.06 9.063-4.998 0-9.066-4.065-9.066-9.063.001-4.995 4.069-9.061 9.066-9.061zm-3.56 5.56c-.41.001-.782.265-.917.655-.137.393-.01.827.312 1.082L8.38 9.36l-1.313 1.076a.96.96 0 0 0-.04 1.464l1.377 1.143-1.374.003a.962.962 0 0 0-.937.982.962.962 0 0 0 .962.942l4.175-.009a.962.962 0 0 0 .597-1.716l-1.62-1.345 1.603-1.315a.962.962 0 0 0 .023-1.451l-1.586-1.265 1.553-.003a.962.962 0 0 0 .95-.973.962.962 0 0 0-.972-.95l-4.125.01zm7.166 0a.962.962 0 0 0-.961.963v.965a.962.962 0 0 0 .961.962.962.962 0 0 0 .962-.962v-.965a.962.962 0 0 0-.962-.963zm0 3.847a.962.962 0 0 0-.961.962v.963a.962.962 0 0 0 .961.962.962.962 0 0 0 .962-.962v-.963a.962.962 0 0 0-.962-.962z" />
        </svg>
    );
}

function CodeForcesLogo() {
    return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3A1.5 1.5 0 0 1 0 19.5V9A1.5 1.5 0 0 1 1.5 7.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15A1.5 1.5 0 0 1 13.5 21h-3A1.5 1.5 0 0 1 9 19.5v-15A1.5 1.5 0 0 1 10.5 3h3zm9 7.5A1.5 1.5 0 0 1 24 12v7.5A1.5 1.5 0 0 1 22.5 21h-3A1.5 1.5 0 0 1 18 19.5V12a1.5 1.5 0 0 1 1.5-1.5h3z" />
        </svg>
    );
}

interface ExternalPlatformCardProps {
    student: Pick<
        StudentInsights,
        | "leetCodeHandle" | "leetCodeVerified" | "leetCodeSolved" | "leetCodeRating" | "leetCodeContests"
        | "codeChefHandle" | "codeChefVerified" | "codeChefSolved" | "codeChefRating" | "codeChefContests"
        | "codeforcesHandle" | "codeforcesVerified" | "codeforcesSolved" | "codeforcesRating" | "codeforcesContests"
    >;
}

export function ExternalPlatformCard({ student }: ExternalPlatformCardProps) {
    const platforms: PlatformData[] = [
        {
            name: "LeetCode",
            handle: student.leetCodeHandle,
            verified: student.leetCodeVerified,
            solved: student.leetCodeSolved,
            rating: student.leetCodeRating,
            contests: student.leetCodeContests,
            logo: <LeetCodeLogo />,
            color: "text-yellow-500",
            profileUrl: (h) => `https://leetcode.com/${h}`,
        },
        {
            name: "CodeChef",
            handle: student.codeChefHandle,
            verified: student.codeChefVerified,
            solved: student.codeChefSolved,
            rating: student.codeChefRating,
            contests: student.codeChefContests,
            logo: <CodeChefLogo />,
            color: "text-amber-600 dark:text-amber-500",
            profileUrl: (h) => `https://www.codechef.com/users/${h}`,
        },
        {
            name: "Codeforces",
            handle: student.codeforcesHandle,
            verified: student.codeforcesVerified,
            solved: student.codeforcesSolved,
            rating: student.codeforcesRating,
            contests: student.codeforcesContests,
            logo: <CodeForcesLogo />,
            color: "text-blue-500",
            profileUrl: (h) => `https://codeforces.com/profile/${h}`,
        },
    ];

    const connectedCount = platforms.filter((p) => p.handle).length;

    return (
        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-300 dark:border-[#262626] p-6 flex flex-col gap-5 hover:shadow-lg transition-shadow duration-300 h-full">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 flex items-center justify-center">
                        <ExternalLink className="w-4.5 h-4.5 text-purple-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                            External Platforms
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            {connectedCount} of 3 connected
                        </p>
                    </div>
                </div>
            </div>

            {/* Platform List */}
            <div className="flex flex-col gap-3 flex-1">
                {platforms.map((platform) => (
                    <PlatformRow key={platform.name} platform={platform} />
                ))}
            </div>
        </div>
    );
}

function PlatformRow({ platform }: { platform: PlatformData }) {
    const isConnected = !!platform.handle;

    if (!isConnected) {
        return (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/60 dark:bg-[#1a1a1a] opacity-50">
                <div className={`flex-shrink-0 ${platform.color}`}>{platform.logo}</div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                        {platform.name}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-600">Not connected</p>
                </div>
                <Link2Off className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
            </div>
        );
    }

    return (
        <div className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50/60 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors">
            <div className={`flex-shrink-0 ${platform.color}`}>{platform.logo}</div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                        {platform.handle}
                    </p>
                    {platform.verified ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                    ) : (
                        <AlertCircle className="w-3 h-3 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                    )}
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-400 dark:text-gray-500">
                    <span className="font-bold">{platform.solved} solved</span>
                    {platform.rating > 0 && (
                        <span>Rating: <span className="font-bold text-gray-600 dark:text-gray-300">{platform.rating}</span></span>
                    )}
                    {platform.contests > 0 && (
                        <span>{platform.contests} contests</span>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <a
                    href={platform.profileUrl(platform.handle!)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    title="View Profile"
                >
                    <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                    onClick={() => {
                        const params = new URLSearchParams(window.location.search);
                        params.set("view", "platform");
                        params.set("p", platform.name);
                        window.history.pushState(null, "", `?${params.toString()}`);
                        window.dispatchEvent(new Event("popstate"));
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] font-black text-purple-500 hover:text-purple-600 uppercase tracking-widest whitespace-nowrap"
                >
                    Details
                </button>
            </div>
        </div>
    );
}
