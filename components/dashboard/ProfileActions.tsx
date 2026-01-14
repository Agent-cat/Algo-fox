"use client";

import { Settings2 } from "lucide-react";
import { useState } from "react";
import { EditProfileModal } from "./EditProfileModal";

interface ProfileActionsProps {
    user: {
        name: string;
        email: string;
        image?: string | null;
        bio?: string | null;
        leetCodeHandle?: string | null;
        codeChefHandle?: string | null;
        hackerrankHandle?: string | null;
        githubHandle?: string | null;
    };
    readonly?: boolean;
}

export function ProfileActions({ user, readonly }: ProfileActionsProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (readonly) return null;

    return (
        <>
            <div className="flex gap-2 w-full mt-2">
                <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex-1 py-2 px-4 bg-orange-500 text-white text-sm font-medium rounded-xl hover:bg-orange-600 transition-colors"
                >
                    Edit Profile
                </button>
                <button className="p-2 border border-gray-200 dark:border-[#333] rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors text-gray-600 dark:text-gray-400">
                    <Settings2 className="w-5 h-5" />
                </button>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={user}
            />
        </>
    );
}
