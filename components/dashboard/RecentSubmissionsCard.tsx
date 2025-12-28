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
            return 'bg-green-100 text-green-700 border-green-200';
        case 'WRONG_ANSWER':
            return 'bg-red-100 text-red-700 border-red-200';
        case 'TIME_LIMIT_EXCEEDED':
            return 'bg-orange-100 text-orange-700 border-orange-200';
        case 'MEMORY_LIMIT_EXCEEDED':
            return 'bg-purple-100 text-purple-700 border-purple-200';
        case 'RUNTIME_ERROR':
            return 'bg-pink-100 text-pink-700 border-pink-200';
        case 'COMPILE_ERROR':
            return 'bg-gray-100 text-gray-700 border-gray-200';
        default:
            return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
};

export function RecentSubmissionsCard({ submissions }: RecentSubmissionsCardProps) {
    const recentSubmissions = submissions.slice(0, 5);

    return (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300  hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-dashed border-gray-200 bg-gray-50/50">
                <h3 className="text-xl font-bold text-gray-900">Recent Submissions</h3>
                <p className="text-sm text-gray-500 mt-1">Your latest problem-solving activity</p>
            </div>
            <div className="p-6">
                {recentSubmissions.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-gray-400"
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
                        <p className="text-sm font-medium text-gray-700 mb-1">No submissions yet</p>
                        <p className="text-xs text-gray-500">
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
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-dashed border-transparent hover:border-gray-300 hover:shadow-sm group">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                                                    {submission.problem?.title || 'Unknown Problem'}
                                                </p>
                                                <ExternalLink className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <span className="px-2 py-0.5 bg-gray-200 rounded-md font-medium">
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
