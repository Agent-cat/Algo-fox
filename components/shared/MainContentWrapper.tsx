"use client";

import { authClient } from "@/lib/auth-client";

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
    const { data: session } = authClient.useSession();
    // @ts-ignore
    const isImpersonating = !!session?.session?.impersonatedBy;

    return (
        <div className={`transition-all duration-300 ${isImpersonating ? 'pt-[6.5rem]' : 'pt-16'}`}>
            {children}
        </div>
    );
}
