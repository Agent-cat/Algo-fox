import { Metadata } from "next";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Algo-fox | Elite Platform for DSA & SQL Mastery",
  description: "The ultimate platform for competitive programming, SQL mastery, and interview preparation. Join high-stakes contests and boost your career.",
};

export default async function LandingPage() {
  const session = await getSession();
  if (session?.user) {
    redirect("/home");
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-white" />
  );
}
