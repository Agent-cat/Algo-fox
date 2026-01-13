import { ProfileActions } from "./ProfileActions";

interface UserProfileCardProps {
    name: string;
    email: string;
    image?: string | null;
    bio?: string | null;
    leetCodeHandle?: string | null;
    codeChefHandle?: string | null;
    hackerrankHandle?: string | null;
    githubHandle?: string | null;
    leetCodeHandle?: string | null;
    codeChefHandle?: string | null;
    hackerrankHandle?: string | null;
    githubHandle?: string | null;
    readonly?: boolean;
}

export function UserProfileCard(props: UserProfileCardProps) {
    const { name, email, image, bio, readonly } = props;

    return (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4">
                    <div className="w-full h-full rounded-full bg-orange-50 border-4 border-orange-100 flex items-center justify-center overflow-hidden text-2xl font-bold text-orange-600">
                        {image ? (
                            <img src={image} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            name?.charAt(0).toUpperCase()
                        )}
                    </div>
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white" title="Online" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-1">{name}</h2>
                <p className="text-sm text-gray-500 mb-2">{email}</p>
                {bio && <p className="text-xs text-gray-400 mb-4 line-clamp-2 px-4">{bio}</p>}

                <ProfileActions user={props} readonly={readonly} />
            </div>
        </div>
    );
}
