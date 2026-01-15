"use client";

import { useEffect, useState } from "react";
import { getProblemComments, CommentWithUser } from "@/actions/discussion";
import { CommentItem } from "./CommentItem";
import { CommentInput } from "./CommentInput";
import { Loader2, MessageSquareOff } from "lucide-react";

import { authClient } from "@/lib/auth-client"; // Importing for client usage

interface CommentTreeProps {
    problemId: string;
}

export function CommentTree({ problemId }: CommentTreeProps) {
    const { data: session } = authClient.useSession();
    const [comments, setComments] = useState<CommentWithUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const data = await getProblemComments(problemId, session?.user?.id);
            setComments(data);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [problemId, session?.user?.id]);

    // Listen for invalidation/refetch if needed via custom events?
    // Actually posting a comment triggers revalidateTag on server,
    // but client needs to re-fetch to see it unless we do optimistic updates.
    // For now, passing an onSuccess callback to inputs to trigger refetch.

    // HOWEVER, in Next.js Server Actions with revalidateTag,
    // if this component was a Server Component it would update automatically.
    // Since it's a Client Component fetching data via Server Action in useEffect,
    // we need to manually refetch.

    // Better approach: Make the `getProblemComments` a data requirement of a wrapper server component?
    // But the prompt asked for "caching nextjs 16 usecache" which we did in the action.
    // Let's stick to client fetching for interactivity or wrap it.

    // Actually, `CommentTree` should probably be a Server Component that fetches initial data,
    // but the user interaction (voting, posting) happens on client.
    // BUT since I am modifying `ProblemDescription` which is a Client Component
    // (it deals with tabs state), I can't easily nest a Server Component inside it
    // unless passed as children.
    // Given the architecture, I'll fetch on client for now or use SWR-like pattern.
    // Since we want to keep it simple, I'll just refetch on success.

    const handleRefetch = () => {
        fetchComments();
    };

    return (
        <div className="flex flex-col h-full">
            {/* Comments List */}
            <div className="flex-1 overflow-y-auto pb-24">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        {comments.length} Comments
                    </h3>
                    <div className="text-xs text-gray-400">
                        Sorted by Best
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                    </div>
                ) : comments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                        <MessageSquareOff className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-2" />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No comments yet. Be the first to start the conversation!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                problemId={problemId}
                                onRefresh={fetchComments}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Sticky Bottom Input */}
            <div className="sticky bottom-0 left-0 right-0 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-t border-gray-200 dark:border-[#262626] p-4 -mx-6 -mb-6">
                {session?.user ? (
                    <CommentInput problemId={problemId} onSuccess={handleRefetch} compact />
                ) : (
                   <div className="text-center py-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-dashed border-gray-200 dark:border-[#333]">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Please sign in to join the discussion.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

