"use client";

import { authClient } from "@/lib/auth-client";

// Define a safe type for the session that includes the impersonalization status
type BetterAuthSession = {
    session: {
        impersonatedBy?: string;
    };
    user: any;
} | null;

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
    const { data } = authClient.useSession();
    const session = data as BetterAuthSession;

    const isImpersonating = !!session?.session?.impersonatedBy;

    return (
        <div className={`transition-all duration-400 ease-in-out ${isImpersonating ? 'pt-26' : 'pt-16'}`}>
            {children}
        </div>
    );
}
