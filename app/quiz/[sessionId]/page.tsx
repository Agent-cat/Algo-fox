"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { StudentQuizRoom } from "@/components/quiz/student/StudentQuizRoom";

interface Props {
  params: Promise<{ sessionId: string }>;
}

export default function StudentQuizPage({ params }: Props) {
  const { sessionId } = use(params);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace(`/join/${sessionId}`);
      return;
    }

    fetch(`/api/quiz/${sessionId}/join`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => {
        if (d.error && !d.reconnected) {
          setError(d.error);
        } else {
          setReady(true);
        }
      })
      .catch(() => setError("Network error. Please refresh."));
  }, [sessionId, session, isPending, router]);

  if (isPending || (!ready && !error)) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] flex items-center justify-center p-6 text-gray-900 dark:text-gray-100">
        <div className="text-center space-y-4 max-w-sm">
          <h1 className="text-2xl font-black">Cannot Join</h1>
          <p className="text-gray-500 dark:text-gray-400">{error}</p>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-[#222222] transition-all"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <StudentQuizRoom
      sessionId={sessionId}
      participantId={session.user.id}
      participantName={session.user.name}
    />
  );
}
