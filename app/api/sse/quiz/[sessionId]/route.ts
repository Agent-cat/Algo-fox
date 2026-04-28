import { NextRequest, NextResponse, connection } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { QuizStore } from "@/lib/quiz-store";
import redis from "@/lib/redis";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  await connection();
  const { sessionId } = await params;

  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in to connect" }, { status: 401 });
  }

  const quiz = await QuizStore.get(sessionId);
  if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });

  const userId = session.user.id;
  const isTeacher = quiz.teacherId === userId;

  if (!isTeacher) {
    const participant = await QuizStore.getParticipant(sessionId, userId);
    if (!participant) {
      return NextResponse.json({ error: "Join the quiz first" }, { status: 403 });
    }
  }

  const subscriber = redis.duplicate({ lazyConnect: false });

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        try {
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        } catch {}
      };

      const [participants, answerCount, timerEndsAt] = await Promise.all([
        QuizStore.getAllParticipants(sessionId),
        quiz.status === "QUESTION_ACTIVE"
          ? QuizStore.getAnswerCount(sessionId, quiz.currentQuestion)
          : Promise.resolve(0),
        QuizStore.getTimer(sessionId),
      ]);

      const leaderboard = QuizStore.buildLeaderboard(participants);

      const sanitizedQuestions = quiz.questions.map(({ correctOption, ...q }) => q);
      const currentQuestionFull = isTeacher && quiz.status === "QUESTION_ACTIVE"
        ? quiz.questions[quiz.currentQuestion]
        : undefined;

      send({
        type: "QUIZ_STATE",
        data: {
          quiz: {
            ...quiz,
            questions: sanitizedQuestions,
            currentQuestionFull,
          },
          participants,
          leaderboard,
          answerCount,
          timerEndsAt: timerEndsAt ?? undefined,
        },
      });

      if (quiz.status === "ENDED") {
        controller.close();
        return;
      }

      await subscriber.subscribe(QuizStore.eventChannel(sessionId));

      const heartbeatInterval = setInterval(() => {
        try {
          controller.enqueue(`data: ${JSON.stringify({ type: "HEARTBEAT" })}\n\n`);
        } catch {
          clearInterval(heartbeatInterval);
        }
      }, 25_000);

      let timeoutHandle: NodeJS.Timeout;
      const resetTimeout = () => {
        clearTimeout(timeoutHandle);
        timeoutHandle = setTimeout(async () => {
          clearInterval(heartbeatInterval);
          controller.close();
          await subscriber.quit().catch(() => {});
        }, 5 * 60 * 1000);
      };

      subscriber.on("message", (_channel, message) => {
        try {
          const event = JSON.parse(message);
          send(event);
          resetTimeout();

          if (event.type === "QUIZ_ENDED") {
            clearTimeout(timeoutHandle);
            clearInterval(heartbeatInterval);
            controller.close();
            subscriber.quit().catch(() => {});
          }
        } catch {
          clearInterval(heartbeatInterval);
          clearTimeout(timeoutHandle);
          controller.close();
          subscriber.quit().catch(() => {});
        }
      });

      subscriber.on("error", () => {
        clearInterval(heartbeatInterval);
        clearTimeout(timeoutHandle);
        controller.close();
        subscriber.quit().catch(() => {});
      });

      resetTimeout();
    },
    cancel() {
      subscriber.quit().catch(() => {});
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
