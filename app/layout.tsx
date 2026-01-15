import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import LayoutSpacer from "@/components/LayoutSpacer";
import NetworkStatus from "@/components/NetworkStatus";
import { ThemeProvider } from "@/components/ThemeProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Algo-fox",
  description: "A comprehensive platform to practice and master DSA and SQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        /*${geistSans.variable} ${geistMono.variable}*/
        className={` antialiased select-none bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider>
          {/* <NetworkStatus />*/}
          {/* <DevToolsBlocker /> */}
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
