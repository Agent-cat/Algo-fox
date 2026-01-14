import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface RecentSubmissionsCardProps {
    submissions: {
        id: string;
        createdAt: Date;
        status: string;
        language?: {
            name: string;
        } | null;
        problem?: {
            title: string;
            slug: string;
        } | null;
    }[];
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'ACCEPTED':
            return 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20';
        case 'WRONG_ANSWER':
            return 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20';
        case 'TIME_LIMIT_EXCEEDED':
            return 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/20';
        case 'MEMORY_LIMIT_EXCEEDED':
            return 'bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20';
        case 'RUNTIME_ERROR':
            return 'bg-pink-100 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-500/20';
        case 'COMPILE_ERROR':
            return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
        default:
            return 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20';
    }
};

export function RecentSubmissionsCard({ submissions }: RecentSubmissionsCardProps) {
    const recentSubmissions = submissions.slice(0, 5);

    return (
        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-300 dark:border-[#262626] hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-dashed border-gray-200 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a]">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Recent Submissions</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your latest problem-solving activity</p>
            </div>
            <div className="p-6">
                {recentSubmissions.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-[#262626] flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-gray-400 dark:text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">No submissions yet</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Start solving problems to see your submissions here
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {recentSubmissions.map((submission) => {
                            const statusClass = getStatusColor(submission.status);
                            return (
                                <Link
                                    key={submission.id}
                                    href={`/submissions/${submission.id}`}
                                    className="block"
                                >
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl hover:bg-gray-100 dark:hover:bg-[#262626] transition-all duration-200 border border-dashed border-transparent hover:border-gray-300 dark:hover:border-[#444] hover:shadow-sm group">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
                                                    {submission.problem?.title || 'Unknown Problem'}
                                                </p>
                                                <ExternalLink className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="px-2 py-0.5 bg-gray-200 dark:bg-[#262626] rounded-md font-medium">
                                                    {submission.language?.name || 'Unknown'}
                                                </span>
                                                <span>•</span>
                                                <span>
                                                    {new Date(submission.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <span
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border border-dashed ${statusClass}`}
                                            >
                                                {submission.status.replace(/_/g, ' ')}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
