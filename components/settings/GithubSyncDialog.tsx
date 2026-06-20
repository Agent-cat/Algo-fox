"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, ChevronDown } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    className={className}
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);
import { authClient } from "@/lib/auth-client";
import { updateGithubSettings, connectGithubRepo, syncGithubAccount, syncPreviousSubmissions } from "@/actions/github";
import { toast } from "sonner";

export function GithubSyncDialog({ children }: { children: React.ReactNode }) {
  const { data: session, isPending, refetch } = authClient.useSession();
  const user = session?.user;
  const u = user as any;

  const [isOpen, setIsOpen] = useState(false);
  const [repoName, setRepoName] = useState(u?.githubRepo || "algofox-submissions");
  const [syncMode, setSyncMode] = useState<string>(u?.githubSyncMode || "ACCEPTED_ONLY");
  const [autoSync, setAutoSync] = useState(u?.githubAutoSync ?? true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Sync state when user data loads or updates
  useEffect(() => {
    if (u) {
      setRepoName(u.githubRepo || "algofox-submissions");
      setSyncMode(u.githubSyncMode || "ACCEPTED_ONLY");
      setAutoSync(u.githubAutoSync ?? true);
    }
  }, [u]);

  // Refetch session when dialog opens to get the latest connection status
  useEffect(() => {
    if (isOpen) {
      syncGithubAccount().then(() => {
        if (refetch) refetch();
      });
    }
  }, [isOpen, refetch]);

  // If the user has a githubHandle, we consider them connected.
  const isConnected = !!u?.githubHandle;

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      // Initiate github auth with repo scopes
      const res = await authClient.linkSocial({
        provider: "github",
        callbackURL: window.location.href, // return here
      });
      if (res?.error) {
        toast.error(res.error.message || "Failed to connect GitHub");
        setIsLoading(false);
      }
    } catch (e) {
      toast.error("Failed to connect GitHub account");
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    const res = await updateGithubSettings({
      repoName,
      syncMode,
      autoSync
    });

    if (res.success) {
      toast.success("Settings saved");
    } else {
      toast.error(res.error || "Failed to save settings");
    }
    setIsLoading(false);
  };

  const handleCreateRepo = async () => {
    setIsLoading(true);
    const res = await connectGithubRepo(repoName);
    if (res.success) {
      toast.success(`Repository ${repoName} configured successfully!`);
    } else {
      toast.error(res.error || "Failed to configure repository");
    }
    setIsLoading(false);
  };

  const handleBatchSync = async () => {
    setIsSyncing(true);
    const res = await syncPreviousSubmissions();
    if (res.success) {
      if (res.count && res.count > 0) {
        toast.success(`Queued ${res.count} submissions for syncing!`);
      } else {
        toast.info("No submissions found to sync.");
      }
    } else {
      toast.error(res.error || "Failed to sync submissions");
    }
    setIsSyncing(false);
  };

  if (isPending) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#1D1E23] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-gray-200 dark:border-white/10">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <GithubIcon className="w-5 h-5" />
            GitHub Integration
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 flex flex-col gap-6">
          {/* Account Section */}
          <div className="flex flex-col gap-4">
            {!isConnected ? (
              <div className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/5 text-center">
                <GithubIcon className="w-10 h-10 mb-3 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Connect your GitHub account to automatically sync your solutions.</p>
                <Button onClick={handleConnect} disabled={isLoading} className="w-full sm:w-auto">
                  Connect GitHub
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <img src={user?.image || ""} alt="" className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">@{u?.githubHandle}</span>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Connected
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isConnected && (
            <div className="flex flex-col gap-6">
              {/* Repository Section */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Repository Name</label>
                <div className="flex gap-2">
                  <Input 
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    className="bg-white dark:bg-black/20 border-gray-200 dark:border-white/10"
                    placeholder="e.g., algofox-submissions"
                  />
                  <Button variant="secondary" onClick={handleCreateRepo} disabled={isLoading}>
                    Update
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Submissions will be saved to this repository.</p>
              </div>

              {/* Settings Section */}
              <div className="flex flex-col gap-4 p-4 bg-gray-50 dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/5">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id="auto-sync" 
                    checked={autoSync} 
                    onCheckedChange={(c) => setAutoSync(!!c)} 
                    className="mt-1"
                  />
                  <div className="flex flex-col gap-1">
                    <label htmlFor="auto-sync" className="text-sm font-medium cursor-pointer">
                      Auto-commit on submission
                    </label>
                    <p className="text-xs text-gray-500">
                      Automatically push code to GitHub when you submit.
                    </p>
                  </div>
                </div>
                
                {autoSync && (
                  <div className="pl-7 flex flex-col gap-2">
                    <label className="text-xs font-medium text-gray-500 uppercase">Sync Mode</label>
                    <select 
                      value={syncMode} 
                      onChange={(e) => setSyncMode(e.target.value)} 
                      className="bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="ACCEPTED_ONLY">Accepted Only</option>
                      <option value="ALL">All Submissions</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Sync Previous Section */}
              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={handleBatchSync} disabled={isLoading || isSyncing} className="w-full bg-transparent border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                  {isSyncing ? "Syncing..." : "Sync Previous Submissions"}
                </Button>
                <p className="text-xs text-gray-500 text-center">Manually push all your past submissions.</p>
              </div>
            </div>
          )}
        </div>

        {isConnected && (
          <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/10 flex justify-end">
            <Button onClick={handleSaveSettings} disabled={isLoading}>
              Save Changes
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
