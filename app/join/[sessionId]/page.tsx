"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Zap, AlertCircle, LogIn, Lock } from "lucide-react";

interface Props {
  params: Promise<{ sessionId: string }>;
}

export default function JoinPage({ params }: Props) {
  const { sessionId } = use(params);
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [mounted, setMounted] = useState(false);
  const [quizTitle, setQuizTitle] = useState<string | null>(null);
  const [quizError, setQuizError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch(`/api/quiz/${sessionId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setQuizError(d.error); return; }
        setQuizTitle(d.title);
      })
      .catch(() => setQuizError("Failed to load quiz"));
  }, [sessionId]);

  const handleJoin = async () => {
    setJoining(true);
    setJoinError(null);
    try {
      const res = await fetch(`/api/quiz/${sessionId}/join`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setJoinError(data.error || "Failed to join");
        return;
      }
      router.push(`/quiz/${sessionId}`);
    } catch {
      setJoinError("Network error. Please try again.");
    } finally {
      setJoining(false);
    }
  };

  if (quizError) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-sm">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h1 className="text-2xl font-black text-white">Quiz Unavailable</h1>
          <p className="text-gray-400">{quizError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center mx-auto">
            <Zap className="w-8 h-8 text-orange-400" />
          </div>
          <h1 className="text-3xl font-black text-white">
            {quizTitle ?? (
              <span className="inline-block w-48 h-8 bg-[#1a1a1a] rounded-lg animate-pulse" />
            )}
          </h1>
          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <Lock className="w-3.5 h-3.5" />
            <span>Classroom students only</span>
          </div>
        </div>

        {(!mounted || isPending) ? (
          <div className="flex justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
          </div>
        ) : !session ? (
          /* Not logged in */
          <div className="space-y-4">
            <div className="px-5 py-4 bg-[#141414] border border-[#2a2a2a] rounded-2xl text-center space-y-3">
              <p className="text-gray-400 text-sm">Sign in with your account to join this quiz.</p>
            </div>
            <a
              href={`/signin?callbackUrl=${encodeURIComponent(`/join/${sessionId}`)}`}
              className="flex items-center justify-center gap-2 w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20"
            >
              <LogIn className="w-5 h-5" />
              Sign In to Join
            </a>
          </div>
        ) : (
          /* Logged in */
          <div className="space-y-4">
            <div className="px-5 py-4 bg-[#141414] border border-[#2a2a2a] rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                <span className="text-lg font-black text-orange-400">
                  {session.user.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-black text-white truncate">{session.user.name}</p>
                <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
              </div>
            </div>

            {joinError && (
              <div className="flex items-start gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{joinError}</p>
              </div>
            )}

            <button
              onClick={handleJoin}
              disabled={joining || !quizTitle}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
            >
              {joining ? "Joining..." : "Join Quiz →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
