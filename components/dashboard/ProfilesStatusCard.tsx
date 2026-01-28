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
    <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a] flex justify-between items-center">
        <h2 className="font-bold text-gray-900 dark:text-gray-100">
          Profiles
        </h2>
      </div>
      <div className="p-2">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
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
