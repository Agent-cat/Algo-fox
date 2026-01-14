interface LanguagesCardProps {
    languageCounts: Record<string, number>;
}

const languageDisplayNames: Record<string, string> = {
    'Cpp': 'Cpp',
    'Java': 'Java',
    'JavaScript': 'JavaScript',
    'Python': 'Python',
    'C': 'C',
    'C++': 'Cpp',
    'cpp': 'Cpp',
    'java': 'Java',
    'javascript': 'JavaScript',
    'python': 'Python',
    'c': 'C'
};

const languageColors: Record<string, string> = {
    'Cpp': 'bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
    'Java': 'bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/30',
    'JavaScript': 'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30',
    'Python': 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30',
    'C': 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
};

export function LanguagesCard({ languageCounts }: LanguagesCardProps) {

    const languages = Object.keys(languageCounts || {}).map(lang => ({
        name: languageDisplayNames[lang] || lang,
        count: languageCounts[lang] || 0
    }));


    const defaultLanguages = [
        { name: 'Cpp', count: 0 },
        { name: 'Java', count: 0 },
        { name: 'JavaScript', count: 0 }
    ];

    const displayLanguages = languages.length > 0 ? languages : defaultLanguages;

    return (
        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-300 dark:border-[#262626] hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-dashed border-gray-200 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a]">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Languages</h3>
            </div>
            <div className="p-6">
                <div className="space-y-3">
                    {displayLanguages.map((lang, index) => {
                        const colorClass = languageColors[lang.name] || 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
                        const bgColor = colorClass.includes('blue') ? 'bg-blue-50/50 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/20' :
                            colorClass.includes('orange') ? 'bg-orange-50/50 dark:bg-orange-500/5 border-orange-100 dark:border-orange-500/20' :
                                colorClass.includes('yellow') ? 'bg-yellow-50/50 dark:bg-yellow-500/5 border-yellow-100 dark:border-yellow-500/20' :
                                    colorClass.includes('green') ? 'bg-green-50/50 dark:bg-green-500/5 border-green-100 dark:border-green-500/20' :
                                        'bg-gray-50/50 dark:bg-[#1a1a1a] border-gray-100 dark:border-[#262626]';

                        return (
                            <div
                                key={index}
                                className={`flex items-center justify-between p-3 rounded-xl border border-dashed ${bgColor} hover:shadow-sm transition-all duration-200`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${colorClass}`}>
                                        {lang.name}
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {lang.count} {lang.count === 1 ? 'problem' : 'problems'}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
