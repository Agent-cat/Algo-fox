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
    'Cpp': 'bg-blue-100 text-blue-700 border-blue-200',
    'Java': 'bg-orange-100 text-orange-700 border-orange-200',
    'JavaScript': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Python': 'bg-green-100 text-green-700 border-green-200',
    'C': 'bg-gray-100 text-gray-700 border-gray-200',
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
        <div className="bg-white rounded-2xl border border-dashed border-gray-300  hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-dashed border-gray-200 bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-900">Languages</h3>
            </div>
            <div className="p-6">
                <div className="space-y-3">
                    {displayLanguages.map((lang, index) => {
                        const colorClass = languageColors[lang.name] || 'bg-gray-100 text-gray-700 border-gray-200';
                        const bgColor = colorClass.includes('blue') ? 'bg-blue-50/50 border-blue-100' :
                            colorClass.includes('orange') ? 'bg-orange-50/50 border-orange-100' :
                                colorClass.includes('yellow') ? 'bg-yellow-50/50 border-yellow-100' :
                                    colorClass.includes('green') ? 'bg-green-50/50 border-green-100' :
                                        'bg-gray-50/50 border-gray-100';

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
                                <span className="text-sm font-medium text-gray-700">
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
