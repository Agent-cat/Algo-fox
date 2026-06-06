import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import MainContentWrapper from "@/components/shared/MainContentWrapper";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <Suspense fallback={null}>
        <Navbar initialSession={session} />
      </Suspense>
      <MainContentWrapper>
        {children}
      </MainContentWrapper>
    </>
  );
}
