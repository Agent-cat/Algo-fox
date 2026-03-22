"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
    CodeFile,
    getCodeFiles,
    getActiveFileId,
    setActiveFileId,
    createCodeFile,
    updateCodeFileContent,
    renameCodeFile,
    deleteCodeFile,
    getCodeDraft,
} from "@/lib/db";

export interface UseCodeFilesOptions {
    userId: string;
    problemId: string;
    languageId: number;
    /** Default boilerplate for a fresh file */
    defaultCode: string;
    /** Called when active file's code changes so parent can sync to submission */
    onActiveCodeChange?: (code: string) => void;
}

export function useCodeFiles({
    userId,
    problemId,
    languageId,
    defaultCode,
    onActiveCodeChange,
}: UseCodeFilesOptions) {
    const [files, setFiles] = useState<CodeFile[]>([]);
    const [activeFileId, setActiveFileIdState] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // ── Refs that hold the latest values without causing effect re-runs ─────
    const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
    const defaultCodeRef = useRef(defaultCode);
    useEffect(() => { defaultCodeRef.current = defaultCode; }, [defaultCode]);

    // Stable ref to the active file id so debounced saves always target the right file
    const activeFileIdRef = useRef<string | null>(null);
    activeFileIdRef.current = activeFileId;

    // Stable ref to onActiveCodeChange to avoid stale closures in effects
    const onActiveCodeChangeRef = useRef(onActiveCodeChange);
    useEffect(() => { onActiveCodeChangeRef.current = onActiveCodeChange; }, [onActiveCodeChange]);

    // ── Memoize derived activeFile — O(n) find, memoized so it only recomputes on files/id change
    const activeFile = useMemo(
        () => files.find((f) => f.fileId === activeFileId) ?? null,
        [files, activeFileId]
    );

    // ─── LOAD ─────────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!problemId) return; // problemId is mandatory, userId can be empty for guest persistence
        let cancelled = false;

        async function load() {
            const [loadedFiles, loadedActiveId] = await Promise.all([
                getCodeFiles(userId, problemId, languageId),
                getActiveFileId(userId, problemId, languageId),
            ]);

            if (cancelled) return;

            let finalFiles = loadedFiles;

            // First visit: no files yet → seed from existing draft or boilerplate
            if (loadedFiles.length === 0) {
                const existingDraft = await getCodeDraft(userId, problemId, languageId);
                const seedCode = existingDraft ?? defaultCodeRef.current;
                const newFile = await createCodeFile(
                    userId,
                    problemId,
                    languageId,
                    'solution-1',
                    seedCode,
                    0
                );
                if (newFile && !cancelled) finalFiles = [newFile];
            }

            if (cancelled) return;

            setFiles(finalFiles);

            const aid = loadedActiveId && finalFiles.some((f) => f.fileId === loadedActiveId)
                ? loadedActiveId
                : finalFiles[0]?.fileId ?? null;

            setActiveFileIdState(aid);
            activeFileIdRef.current = aid;

            // Persist active file (fire-and-forget)
            if (aid) setActiveFileId(userId, problemId, languageId, aid);

            setIsLoaded(true);

            // Notify parent of initial active code
            const af = finalFiles.find((f) => f.fileId === aid);
            if (af) onActiveCodeChangeRef.current?.(af.code);
        }

        setIsLoaded(false);
        load();
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, problemId, languageId]);

    // Cleanup pending debounced save on unmount to prevent write-after-unmount
    useEffect(() => {
        return () => {
            if (saveTimerRef.current) {
                clearTimeout(saveTimerRef.current);
                saveTimerRef.current = null;
            }
        };
    }, []);

    // ─── SELECT ───────────────────────────────────────────────────────────────
    const selectFile = useCallback(
        (fileId: string) => {
            setActiveFileIdState(fileId);
            activeFileIdRef.current = fileId;
            setActiveFileId(userId, problemId, languageId, fileId); // fire-and-forget

            setFiles((prev) => {
                const f = prev.find((f) => f.fileId === fileId);
                if (f) onActiveCodeChangeRef.current?.(f.code);
                return prev; // no change to array, just a side-effect read
            });
        },
        [userId, problemId, languageId]
        // NOTE: files NOT in deps — we read latest via setFiles callback (avoids stale closure)
    );

    // ─── UPDATE CODE ─────────────────────────────────────────────────────────
    // CRITICAL: activeFileId is read from the ref, not the closure, so a debounced
    // save that fires 800ms later always writes to the correct file even if the user
    // switched tabs in the interim.
    const updateCode = useCallback(
        (code: string) => {
            const fid = activeFileIdRef.current;
            if (!fid) return;

            setFiles((prev) =>
                prev.map((f) => (f.fileId === fid ? { ...f, code } : f))
            );

            // Cancel any pending save and schedule a new one
            if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
            saveTimerRef.current = setTimeout(() => {
                // Read the ref again at fire-time — still the right file since
                // we captured fid at call-time and only save to that file.
                updateCodeFileContent(userId, problemId, languageId, fid, code);
                saveTimerRef.current = null;
            }, 800);
        },
        [userId, problemId, languageId]
        // activeFileId deliberately NOT in deps — read from ref inside
    );

    // ─── CREATE ───────────────────────────────────────────────────────────────
    const addFile = useCallback(
        async (name?: string) => {
            // Read files count inline — we use a functional setState below
            const newFile = await createCodeFile(
                userId,
                problemId,
                languageId,
                name ?? 'solution',   // will be made unique below
                defaultCodeRef.current,
                0 // order will be corrected below
            );
            if (!newFile) return;

            setFiles((prev) => {
                // Assign correct order and auto-increment name if needed
                const order = prev.length;
                const existingNames = new Set(prev.map((f) => f.name));
                let finalName = name ?? `solution-${order + 1}`;
                // If name already exists, append a number
                let counter = 2;
                while (existingNames.has(finalName)) {
                    finalName = `${name ?? 'solution'}-${counter++}`;
                }
                const corrected = { ...newFile, order, name: finalName };
                // Persist the corrected name/order (fire-and-forget)
                renameCodeFile(userId, problemId, languageId, newFile.fileId, finalName);
                return [...prev, corrected];
            });

            setActiveFileIdState(newFile.fileId);
            activeFileIdRef.current = newFile.fileId;
            setActiveFileId(userId, problemId, languageId, newFile.fileId); // fire-and-forget

            onActiveCodeChangeRef.current?.(newFile.code);
        },
        [userId, problemId, languageId]
    );

    // ─── RENAME ───────────────────────────────────────────────────────────────
    const renameFile = useCallback(
        (fileId: string, name: string) => {
            renameCodeFile(userId, problemId, languageId, fileId, name); // fire-and-forget
            setFiles((prev) =>
                prev.map((f) => (f.fileId === fileId ? { ...f, name } : f))
            );
        },
        [userId, problemId, languageId]
    );

    // ─── DELETE ───────────────────────────────────────────────────────────────
    const removeFile = useCallback(
        (fileId: string) => {
            deleteCodeFile(userId, problemId, languageId, fileId); // fire-and-forget

            setFiles((prev) => {
                const next = prev.filter((f) => f.fileId !== fileId);
                // Switch active if needed
                if (activeFileIdRef.current === fileId) {
                    const newActive = next[0]?.fileId ?? null;
                    setActiveFileIdState(newActive);
                    activeFileIdRef.current = newActive;
                    setActiveFileId(userId, problemId, languageId, newActive);
                    const af = next.find((f) => f.fileId === newActive);
                    if (af) onActiveCodeChangeRef.current?.(af.code);
                    else if (!newActive) onActiveCodeChangeRef.current?.('');
                }
                return next;
            });
        },
        [userId, problemId, languageId]
        // activeFileId deliberately NOT in deps — read from ref inside
    );

    return {
        files,
        activeFile,
        activeFileId,
        isLoaded,
        selectFile,
        addFile,
        renameFile,
        removeFile,
        updateCode,
    };
}
