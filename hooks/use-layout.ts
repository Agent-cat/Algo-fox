import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to manage persistent split pane sizes using localStorage
 * @param storageKey Key to save/load sizes from localStorage
 * @param defaultSizes Default sizes if nothing is saved
 */
export function usePersistentSplit(storageKey: string, defaultSizes: number[]) {
    // Start with default sizes to avoid hydration mismatch
    const [sizes, setSizes] = useState<number[]>(defaultSizes);
    const [isHydrated, setIsHydrated] = useState(false);

    // key to force re-render of Split component when we programmatically change sizes
    // react-split sometimes doesn't update visual drag bars when sizes prop changes drastically
    const [layoutKey, setLayoutKey] = useState(0);

    // Load from local storage on mount
    useEffect(() => {
        setIsHydrated(true);
        try {
            const item = localStorage.getItem(storageKey);
            if (item) {
                const parsed = JSON.parse(item);
                if (Array.isArray(parsed) && parsed.length === defaultSizes.length) {
                    setSizes(parsed);
                    return;
                }
            }
        } catch (error) {
            console.error(`Failed to load layout for ${storageKey}:`, error);
        }
    }, [storageKey, defaultSizes.length]);

    // Save to local storage
    const saveSizes = useCallback((newSizes: number[]) => {
        setSizes(newSizes);
        try {
            localStorage.setItem(storageKey, JSON.stringify(newSizes));
        } catch (error) {
            console.error(`Failed to save layout for ${storageKey}:`, error);
        }
    }, [storageKey]);

    // Programmatic reset/update
    const setSizesProgrammatically = useCallback((newSizes: number[]) => {
        saveSizes(newSizes);
        // Bump key to force component remount/refresh if needed
        setLayoutKey(prev => prev + 1);
    }, [saveSizes]);

    return {
        sizes,
        setSizes: saveSizes,
        setSizesProgrammatically,
        isHydrated,
        layoutKey
    };
}
