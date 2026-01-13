import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import Breadcrumbs from "@/components/Breadcrumbs";
import LayoutSpacer from "@/components/LayoutSpacer";
import NetworkStatus from "@/components/NetworkStatus";

import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased select-none `}
      >
        <NetworkStatus />
        {/* <DevToolsBlocker /> */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'white',
              color: 'black',
              border: '1px solid #f97316',
            },
            classNames: {
              toast: 'group toast group-[.toaster]:bg-white group-[.toaster]:text-black group-[.toaster]:border-orange-500 group-[.toaster]:shadow-lg',
              description: 'group-[.toast]:text-gray-500',
              actionButton: 'group-[.toast]:bg-orange-500 group-[.toast]:text-white',
              cancelButton: 'group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500',
            }
          }}
        />
        {children}
      </body>
    </html>
  );
}
