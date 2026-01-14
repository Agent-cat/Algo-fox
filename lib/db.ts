
import Dexie, { type Table } from 'dexie';

export interface CodeDraft {
    id: string; // Composite key: problemId_languageId
    problemId: string;
    languageId: number;
    code: string;
    updatedAt: number;
}

const EXPIRATION_TIME_MS = 6 * 60 * 60 * 1000; // 6 hours
const DB_NAME = 'AlgoFoxDB';

class AlgoFoxDB extends Dexie {
    codeDrafts!: Table<CodeDraft>;

    constructor() {
        super(DB_NAME);

        // Version 2: new schema with id as primary key
        // Start directly at version 2 to avoid primary key migration issues
        this.version(2).stores({
            codeDrafts: 'id, problemId, languageId, updatedAt'
        });
    }
}

// Only create database instance on client side (browser)
let db: AlgoFoxDB | null = null;

function getDB(): AlgoFoxDB {
    // Only create database in browser environment
    if (typeof window === 'undefined') {
        throw new Error('IndexedDB is only available in browser environment');
    }

    if (!db) {
        db = new AlgoFoxDB();

        // Initialize database with error handling for schema migration
        db.open().catch(async (error: any) => {
            // If migration fails due to primary key change, delete and recreate
            if (error.name === 'UpgradeError' ||
                error.message?.includes('primary key') ||
                error.message?.includes('Not yet support for changing primary key')) {
                console.warn('Database schema migration failed, recreating database...');
                try {
                    await Dexie.delete(DB_NAME);
                    // Reload page to reinitialize with new schema
                    if (typeof window !== 'undefined') {
                        window.location.reload();
                    }
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

// Export getter function that only creates DB in browser
export { getDB };

export async function saveCodeDraft(userId: string, problemId: string, languageId: number, code: string) {
    // Only save in browser environment
    if (typeof window === 'undefined' || !userId) {
        return;
    }

    try {
        const db = getDB();
        if (!db.isOpen()) {
            await db.open();
        }

        const now = Date.now();
        const id = `${userId}_${problemId}_${languageId}`;

        // Clean up expired entries (optimistic, don't wait)
        db.codeDrafts.where('updatedAt').below(now - EXPIRATION_TIME_MS).delete();

        // Also verify if we need to migrate/cleanup old format entries (optional but nice)
        // For now, simple key change is sufficient to segregate data.

        await db.codeDrafts.put({
            id,
            problemId,
            languageId,
            code,
            updatedAt: now
        });
    } catch (error: any) {
        // If still failing, just log and continue (database will be recreated on reload)
        console.error('Failed to save code draft:', error);
    }
}

export async function getCodeDraft(userId: string, problemId: string, languageId: number): Promise<string | null> {
    // Only get in browser environment
    if (typeof window === 'undefined' || !userId) {
        return null;
    }

    try {
        const db = getDB();
        if (!db.isOpen()) {
            await db.open();
        }

        const id = `${userId}_${problemId}_${languageId}`;
        const draft = await db.codeDrafts.get(id);

        if (!draft) return null;

        const now = Date.now();
        if (now - draft.updatedAt > EXPIRATION_TIME_MS) {
            // Expired
            await db.codeDrafts.delete(id);
            return null;
        }

        return draft.code;
    } catch (error: any) {
        // Log error but don't throw - return null to allow app to continue
        console.error('Failed to get code draft:', error);
        return null;
    }
}
