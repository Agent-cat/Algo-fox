import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getContestForEdit } from "@/actions/contest";
import CreateContestWizard from "@/components/contest/CreateContestWizard";
import BackButton from "@/components/BackButton";

interface EditContestPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditContestPage({ params }: EditContestPageProps) {
    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    const res = await getContestForEdit(id);

    if (!res.success) {
        if (res.error === "Contest not found") {
            notFound();
        }
        return (
            <div className="container mx-auto py-20 px-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Error</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">{res.error}</p>
                <div className="flex justify-center">
                    <BackButton />
                </div>
            </div>
        );
    }

    // Munge contest data to match wizard's expected format if needed
    // The wizard handles most of the mapping in its useEffect
    const contest = res.contest;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <BackButton />
                </div>

                <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl overflow-hidden shadow-sm">
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#111]">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Contest</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update contest details, problems, and settings</p>
                    </div>

                    <CreateContestWizard
                        initialData={contest}
                        isEditing={true}
                    />
                </div>
            </div>
        </div>
    );
}
