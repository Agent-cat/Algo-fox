import { Loader2 } from "lucide-react";

export default function SettingsLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
                Loading settings...
            </p>
        </div>
    );
}
