import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import DevToolsBlocker from "@/components/DevToolsBlocker";
import NetworkStatus from "@/components/NetworkStatus";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SessionConflictModal } from "@/components/auth/SessionConflictModal";
import FocusBlur from "@/components/FocusBlur";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { StreakProvider } from "@/context/StreakContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://algofox.in"),
  title: {
    default: "Algo-fox",
    template: "%s | Algo-fox",
  },
  description: "A comprehensive platform to practice and master Data Structures, Algorithms, and SQL. Join contests, track your streak, and improve your coding skills.",
  keywords: ["DSA", "SQL", "Coding Practice", "Programming Contests", "Algo-fox", "Data Structures", "Algorithms"],
  authors: [{ name: "Algo-fox Team" }],
  creator: "Algo-fox",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://algofox.in",
    siteName: "Algo-fox",
    title: "Algo-fox - Master DSA and SQL",
    description: "Master Data Structures, Algorithms, and SQL with Algo-fox. Practice, compete, and grow.",
    images: [
      {
        url: "/Hero-image.png",
        width: 1200,
        height: 630,
        alt: "Algo-fox Hero Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Algo-fox - Master DSA and SQL",
    description: "Master Data Structures, Algorithms, and SQL with Algo-fox. Practice, compete, and grow.",
    images: ["/Hero-image.png"],
    creator: "@algofox",
  },
  icons: {
    icon: "/icons/icon-512x512.png",
    apple: "/icons/icon-512x512.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Algo-fox",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${geistSans.variable} ${geistMono.variable} antialiased select-none bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider>
          <Suspense fallback={
            <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
               <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <StreakProvider>
              <NetworkStatus />
              <DevToolsBlocker />
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: "var(--toast-bg)",
                    color: "var(--toast-color)",
                    border: "1px solid var(--toast-border)",
                  },
                  classNames: {
                    toast:
                      "group toast group-[.toaster]:bg-white dark:group-[.toaster]:bg-[#1a1a1a] group-[.toaster]:text-gray-900 dark:group-[.toaster]:text-gray-100 group-[.toaster]:border-orange-500 group-[.toaster]:shadow-lg",
                    description:
                      "group-[.toast]:text-gray-500 dark:group-[.toast]:text-gray-400",
                    actionButton:
                      "group-[.toast]:bg-orange-500 group-[.toast]:text-white",
                    cancelButton:
                      "group-[.toast]:bg-gray-100 dark:group-[.toast]:bg-[#262626] group-[.toast]:text-gray-500 dark:group-[.toast]:text-gray-400",
                  },
                }}
              />
              <SessionConflictModal />
              <FocusBlur />
              {children}
            </StreakProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
