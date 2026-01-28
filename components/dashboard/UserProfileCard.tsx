import { ProfileActions } from "./ProfileActions";

interface UserProfileCardProps {
    name: string;
    email: string;
    image?: string | null;
    bio?: string | null;
    role?: string;
    institutionName?: string;
    leetCodeHandle?: string | null;
    codeChefHandle?: string | null;
    codeforcesHandle?: string | null;
    githubHandle?: string | null;

    readonly?: boolean;
}

export function UserProfileCard(props: UserProfileCardProps) {
    const { name, email, image, bio, role, institutionName, readonly } = props;

    return (
        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-300 dark:border-[#262626] p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4">
                    <div className="w-full h-full rounded-full bg-orange-50 dark:bg-[#1a1a1a] border-4 border-orange-100 dark:border-orange-500/10 flex items-center justify-center overflow-hidden text-2xl font-bold text-orange-600 dark:text-orange-500">
                        {image ? (
                            <img src={image} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                            name?.charAt(0).toUpperCase()
                        )}
                    </div>
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-[#141414]" title="Online" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{name}</h2>
                <div className="flex flex-col items-center gap-1 mb-3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>

                    {(role || institutionName) && (
                        <div className="flex items-center gap-2 text-xs font-semibold mt-1">
                            {role && (
                                <span className={`px-2 py-0.5 rounded-full ${
                                    role === 'ADMIN' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                                    role === 'INSTITUTION_MANAGER' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' :
                                    role === 'TEACHER' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30' :
                                    'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                                }`}>
                                    {role.replace('_', ' ')}
                                </span>
                            )}
                            {institutionName && (
                                <span className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                                    {institutionName}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {bio && <p className="text-xs text-gray-400 mb-4 line-clamp-2 px-4">{bio}</p>}

                <ProfileActions user={props} readonly={readonly} />
            </div>
        </div>
    );
}
