import { ExternalLink, ShieldAlert, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfilesStatusCardProps {
  user: {
    leetCodeHandle?: string | null;
    leetCodeVerified?: boolean | null;
    codeChefHandle?: string | null;
    codeChefVerified?: boolean | null;
    codeforcesHandle?: string | null;
    codeforcesVerified?: boolean | null;
    hackerrankHandle?: string | null; // Placeholder for now
  };
}

export const ProfilesStatusCard = ({ user }: ProfilesStatusCardProps) => {
  const platforms = [
    {
      name: "LeetCode",
      handle: user.leetCodeHandle,
      isVerified: user.leetCodeVerified,
      icon: "/handles_logos/leetcode.png",
      urlPrefix: "https://leetcode.com/u/",
    },
    {
      name: "CodeChef",
      handle: user.codeChefHandle,
      isVerified: user.codeChefVerified,
      icon: "/handles_logos/codechef.png",
      urlPrefix: "https://www.codechef.com/users/",
    },
    {
      name: "CodeForces",
      handle: user.codeforcesHandle,
      isVerified: user.codeforcesVerified,
      icon: "/handles_logos/codeforces.png",
      urlPrefix: "https://codeforces.com/profile/",
    },
  ];

  return (
    <div className="bg-white dark:bg-[#24262C] rounded-3xl border border-dashed border-gray-300 dark:border-white/5 p-6 hover:shadow-lg transition-all flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Profiles
        </h3>
      </div>
      <div className="flex-1 space-y-1">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-[#1D1E23] border border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-6 h-6 rounded-md overflow-hidden">
                <Image
                  src={platform.icon}
                  alt={platform.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                {platform.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {platform.isVerified ? (
                <ShieldCheck className="w-5 h-5 text-green-500" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-gray-400" />
              )}

              {platform.handle ? (
                 <a
                  href={`${platform.urlPrefix}${platform.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <Link
                    href="/dashboard/settings/platform"
                     className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                    <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
