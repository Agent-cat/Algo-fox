import { Metadata } from "next";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

// Landing Page Components
import Hero from "@/components/landing/Hero";
import PlatformSection from "@/components/landing/PlatformSection";
import ProfileMockup from "@/components/landing/ProfileMockup";
import CompanySheets from "@/components/landing/CompanySheets";
import Workspace from "@/components/landing/Workspace";
import AnalyticsGrid from "@/components/landing/AnalyticsGrid";
import GithubStats from "@/components/landing/GithubStats";
import Projects from "@/components/landing/Projects";
import ProfileCard from "@/components/landing/ProfileCard";
import ContestCalendar from "@/components/landing/ContestCalendar";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

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
    <div className="w-full bg-white dark:bg-[#1D1E23] flex flex-col relative overflow-x-hidden min-h-[calc(100vh-64px)]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Supported Platforms Section */}
      <PlatformSection />

      {/* 2.5. Profile Dashboard Mockup Section */}
      <ProfileMockup />

      {/* 3. Company sheets preparation Section */}
      <CompanySheets />

      {/* 4. Interactive coding workspace preview Section */}
      <Workspace />

      {/* 5. Developer Portfolio Analytics Grid Section */}
      <AnalyticsGrid />

      {/* 6. GitHub Stats Dashboard Section */}
      <GithubStats />

      {/* 7. Featured Projects Section */}
      <Projects />

      {/* 8. Profile Card Section */}
      <ProfileCard />

      {/* 9. Contest Calendar Timeline Section */}
      <ContestCalendar />

      {/* 10. Frequently Asked Questions Section */}
      <FAQ />

      {/* 11. Final Call-to-Action Banner Section */}
      <CTA />

      {/* 12. Main Footnote Section */}
      <Footer />
    </div>
  );
}
