import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { QuizStore } from "@/lib/quiz-store";
import { TeacherHostDashboard } from "@/components/quiz/teacher/TeacherHostDashboard";
import QRCode from "qrcode";

interface Props {
  params: Promise<{ sessionId: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { sessionId } = await params;
  const quiz = await QuizStore.get(sessionId);
  return { title: quiz ? `Hosting: ${quiz.title}` : "Host Quiz" };
}

export default async function HostQuizPage({ params }: Props) {
  const { sessionId } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/signin");

  const quiz = await QuizStore.get(sessionId);
  if (!quiz) notFound();
  if (quiz.teacherId !== session.user.id) redirect("/dashboard/teacher/quiz");
  if (quiz.status === "ENDED") redirect("/dashboard/teacher/quiz");

  if (quiz.status === "PENDING") {
    await QuizStore.setStatus(sessionId, "LOBBY", -1);
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const joinUrl = `${baseUrl}/join/${sessionId}`;

  const qrDataUrl = await QRCode.toDataURL(joinUrl, {
    width: 200,
    margin: 2,
    color: { dark: "#000000", light: "#ffffff" },
  });

  return (
    <TeacherHostDashboard
      sessionId={sessionId}
      joinUrl={joinUrl}
      qrDataUrl={qrDataUrl}
    />
  );
}
