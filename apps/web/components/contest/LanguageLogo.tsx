"use client";

import React from 'react';

// Using simple SVG or image links for common languages
export const LanguageLogo = ({ language, className = "w-5 h-5" }: { language: string | number | null, className?: string }) => {
    if (!language) return null;

    const langName = typeof language === 'string' ? language.toLowerCase() : '';

    // Mapping language names to icons/colors
    // In a real app, you might use an icon library or custom SVGs
    const getLogo = () => {
        const logoMap: Record<string, string> = {
            'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            'js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
            'java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
            'cpp': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
            'c++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
            'c': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
            'rust': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
            'go': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
            'sql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        };

        const matchedKey = Object.keys(logoMap).find(key => langName.includes(key));

        if (matchedKey) {
            return (
                <img
                    src={logoMap[matchedKey]}
                    alt={langName}
                    className={`${className} object-contain`}
                />
            );
        }

        return (
             <div className={`${className} bg-gray-500 text-white flex items-center justify-center font-bold text-[8px] rounded-sm uppercase`}>
                 {langName.substring(0, 2)}
             </div>
        );
    };

    return (
        <div title={typeof language === 'string' ? language : 'Language'}>
            {getLogo()}
        </div>
    );
};
