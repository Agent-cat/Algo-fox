
import Dexie, { type Table } from 'dexie';

interface CodeDraft {
    id: string; // Composite key: userId_problemId_languageId
    problemId: string;
    languageId: number;
    code: string;
    updatedAt: number;
}

export interface CodeFile {
    id: string;        // Composite key: userId_problemId_languageId_fileId
    fileId: string;    // Unique file id
    userId: string;
    problemId: string;
    languageId: number;
    name: string;
    code: string;
    order: number;
    updatedAt: number;
}

export interface CodeFilesMeta {
    id: string;         // userId_problemId_languageId
    userId: string;
    problemId: string;
    languageId: number;
    activeFileId: string | null;
    updatedAt: number;
}

const EXPIRATION_TIME_MS = 365 * 24 * 60 * 60 * 1000; // 1 year (essentially persistent as requested)
const DB_NAME = 'AlgoFoxDB';

class AlgoFoxDB extends Dexie {
    codeDrafts!: Table<CodeDraft>;
    codeFiles!: Table<CodeFile>;
    codeFilesMeta!: Table<CodeFilesMeta>;

    constructor() {
        super(DB_NAME);

        // Version 2: existing codeDrafts schema
        this.version(2).stores({
            codeDrafts: 'id, problemId, languageId, updatedAt'
        });

        // Version 3: add codeFiles and codeFilesMeta tables
        // OPTIMIZATION: compound index [userId+problemId+languageId] on codeFiles
        // enables fast WHERE queries without full table scans.
        this.version(3).stores({
            codeDrafts: 'id, problemId, languageId, updatedAt',
            codeFiles: 'id, [userId+problemId+languageId], updatedAt',
            codeFilesMeta: 'id'
        });
    }
}

// Singleton — created once per browser tab
let db: AlgoFoxDB | null = null;

function getDB(): AlgoFoxDB {
    if (typeof window === 'undefined') {
        throw new Error('IndexedDB is only available in browser environment');
    }

    if (!db) {
        db = new AlgoFoxDB();

        // Dexie auto-opens, but we handle upgrade failures gracefully
        db.open().catch(async (error: any) => {
            if (
                error.name === 'UpgradeError' ||
                error.message?.includes('primary key') ||
                error.message?.includes('Not yet support for changing primary key')
            ) {
                console.warn('Database schema migration failed, recreating database...');
                try {
                    await Dexie.delete(DB_NAME);
                    window.location.reload();
                } catch (deleteError) {
                    console.error('Failed to recreate database:', deleteError);
                }
            } else {
                console.error('Failed to open database:', error);
            }
        });
    }

    return db;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function makeFileId(): string {
    // crypto.randomUUID is available in all modern browsers (secure + no collisions)
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
}

function metaKey(userId: string, problemId: string, languageId: number) {
    return `${userId}_${problemId}_${languageId}`;
}

function fileKey(userId: string, problemId: string, languageId: number, fileId: string) {
    return `${userId}_${problemId}_${languageId}_${fileId}`;
}

// ─── CODE DRAFTS (existing) ───────────────────────────────────────────────────

export async function saveCodeDraft(
    userId: string,
    problemId: string,
    languageId: number,
    code: string
) {
    if (typeof window === 'undefined') return;

    try {
        const db = getDB();
        const now = Date.now();
        // Use a fallback for guests to ensure persistence
        const effectiveUserId = userId || "guest";
        const id = `${effectiveUserId}_${problemId}_${languageId}`;

        await db.codeDrafts.put({ id, problemId, languageId, code, updatedAt: now });
    } catch (error: any) {
        console.error('Failed to save code draft:', error);
    }
}

export async function getCodeDraft(
    userId: string,
    problemId: string,
    languageId: number
): Promise<string | null> {
    if (typeof window === 'undefined') return null;

    try {
        const db = getDB();
        const effectiveUserId = userId || "guest";
        const id = `${effectiveUserId}_${problemId}_${languageId}`;
        const draft = await db.codeDrafts.get(id);

        if (!draft) return null;

        // Note: Expiration check removed to keep code stored as requested
        return draft.code;
    } catch (error: any) {
        console.error('Failed to get code draft:', error);
        return null;
    }
}

// ─── CODE FILES (new) ─────────────────────────────────────────────────────────

/**
 * Get all files for a problem+language, sorted by order.
 * Uses the compound index [userId+problemId+languageId] for O(log n) lookup.
 */
export async function getCodeFiles(
    userId: string,
    problemId: string,
    languageId: number
): Promise<CodeFile[]> {
    if (typeof window === 'undefined') return [];

    try {
        const db = getDB();
        const effectiveUserId = userId || "guest";
        const files = await db.codeFiles
            .where('[userId+problemId+languageId]')
            .equals([effectiveUserId, problemId, languageId])
            .toArray();

        return files.sort((a, b) => a.order - b.order);
    } catch (error) {
        console.error('Failed to get code files:', error);
        return [];
    }
}

/** Get active file id for a problem+language */
export async function getActiveFileId(
    userId: string,
    problemId: string,
    languageId: number
): Promise<string | null> {
    if (typeof window === 'undefined') return null;

    try {
        const db = getDB();
        const effectiveUserId = userId || "guest";
        const meta = await db.codeFilesMeta.get(metaKey(effectiveUserId, problemId, languageId));
        return meta?.activeFileId ?? null;
    } catch (error) {
        console.error('Failed to get active file id:', error);
        return null;
    }
}

/** Set active file id — fire-and-forget safe */
export function setActiveFileId(
    userId: string,
    problemId: string,
    languageId: number,
    activeFileId: string | null
): void {
    if (typeof window === 'undefined') return;

    const db = getDB();
    const effectiveUserId = userId || "guest";
    const id = metaKey(effectiveUserId, problemId, languageId);
    db.codeFilesMeta
        .put({ id, userId: effectiveUserId, problemId, languageId, activeFileId, updatedAt: Date.now() })
        .catch((error) => console.error('Failed to set active file id:', error));
}

/** Create a new code file */
export async function createCodeFile(
    userId: string,
    problemId: string,
    languageId: number,
    name: string,
    code: string,
    order: number
): Promise<CodeFile | null> {
    if (typeof window === 'undefined') return null;

    try {
        const db = getDB();
        const effectiveUserId = userId || "guest";
        const fileId = makeFileId();
        const id = fileKey(effectiveUserId, problemId, languageId, fileId);

        const newFile: CodeFile = {
            id,
            fileId,
            userId: effectiveUserId,
            problemId,
            languageId,
            name,
            code,
            order,
            updatedAt: Date.now(),
        };

        await db.codeFiles.put(newFile);
        return newFile;
    } catch (error) {
        console.error('Failed to create code file:', error);
        return null;
    }
}

/** Update file code — called on every debounced keystroke */
export function updateCodeFileContent(
    userId: string,
    problemId: string,
    languageId: number,
    fileId: string,
    code: string
): void {
    if (typeof window === 'undefined') return;

    const db = getDB();
    const effectiveUserId = userId || "guest";
    const id = fileKey(effectiveUserId, problemId, languageId, fileId);
    db.codeFiles
        .update(id, { code, updatedAt: Date.now() })
        .catch((error) => console.error('Failed to update code file content:', error));
}

/** Rename a file */
export function renameCodeFile(
    userId: string,
    problemId: string,
    languageId: number,
    fileId: string,
    name: string
): void {
    if (typeof window === 'undefined') return;

    const db = getDB();
    const effectiveUserId = userId || "guest";
    const id = fileKey(effectiveUserId, problemId, languageId, fileId);
    db.codeFiles
        .update(id, { name, updatedAt: Date.now() })
        .catch((error) => console.error('Failed to rename code file:', error));
}

/** Delete a file */
export function deleteCodeFile(
    userId: string,
    problemId: string,
    languageId: number,
    fileId: string
): void {
    if (typeof window === 'undefined') return;

    const db = getDB();
    const effectiveUserId = userId || "guest";
    const id = fileKey(effectiveUserId, problemId, languageId, fileId);
    db.codeFiles
        .delete(id)
        .catch((error) => console.error('Failed to delete code file:', error));
}
