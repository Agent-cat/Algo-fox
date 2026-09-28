import { redirect } from "next/navigation";

export default function AuthErrorPage({
    searchParams,
}: {
    searchParams: { error?: string };
}) {
    // If the error is "banned", redirect to our custom /banned page
    if (searchParams.error === "banned") {
        redirect("/banned");
    }

    // Otherwise, redirect to the default error page or signin
    redirect("/signin?error=" + (searchParams.error || "AuthErrorCode"));
}
