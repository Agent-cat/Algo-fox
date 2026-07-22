"use client";
import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import Split from 'react-split';

import { Problem, ProblemTestCase, ProblemDomain, ProblemType } from '@prisma/client';
import { authClient } from '@/lib/auth-client';
import { DEFAULT_LANGUAGE_ID, getLanguageById, LANGUAGES } from '@/lib/languages';
import { usePersistentSplit } from '@/hooks/use-layout';
import { useCodeFiles } from '@/hooks/use-code-files';

// Custom Hooks
import { useWorkspaceShortcuts } from '@/hooks/workspace/use-workspace-shortcuts';
import { useWorkspaceSubmission } from '@/hooks/workspace/use-workspace-submission';

// Components
import WorkspaceHeader from './WorkspaceHeader';
import ProblemTour from '../tour/ProblemTour';
import ProblemSkeleton from './ProblemSkeleton';
import EditorSkeleton from './EditorSkeleton';
import TestCasesSkeleton from './TestCasesSkeleton';
import { WorkspaceModals } from './WorkspaceModals';
import { WorkspaceSidebars } from './WorkspaceSidebars';
import CodeFileTabs from './CodeFileTabs';
import { getParticipationStatus } from '@/actions/contest';

const ProblemSidebar = dynamic(() => import('./ProblemSidebar'), {
    loading: () => null,
    ssr: false
});

const ProblemDescription = dynamic(() => import('./ProblemDescription'), {
    ssr: false,
    loading: () => <ProblemSkeleton />
});

const CodeEditor = dynamic(() => import('./CodeEditor'), {
    ssr: false,
    loading: () => <EditorSkeleton />
});

const TestCases = dynamic(() => import('./TestCases'), {
    ssr: false,
    loading: () => <TestCasesSkeleton />
});

interface FunctionTemplate {
    languageId: number;
    functionTemplate: string;
    driverCode: string;
}

interface WorkspaceProps {
    problem: Problem & {
        testCases: ProblemTestCase[];
        functionTemplates?: FunctionTemplate[];
        useFunctionTemplate?: boolean;
        solution?: string | null;
        tags?: { name: string; slug: string }[];
    };
    isSolved: boolean;
    contestId?: string;
    contest?: any;
    solvedProblemIds?: string[];
    nextProblemSlug?: string | null;
    prevProblemSlug?: string | null;
    courseId?: string | null;
    courseName?: string | null;
    courseSlug?: string | null;
    totalCourseProblems?: number;
    currentCourseProblemIndex?: number;
}

const LANGUAGE_STORAGE_KEY = 'algofox_selected_language';
const SQL_LANGUAGE_ID = 82;

function getStoredLanguageId(domain?: string): number {
    if (typeof window === 'undefined') {
        return domain === "SQL" ? SQL_LANGUAGE_ID : DEFAULT_LANGUAGE_ID;
    }
    try {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored) {
            const id = parseInt(stored, 10);
            if (!isNaN(id)) {
                if (domain === "SQL") return SQL_LANGUAGE_ID;
                return id;
            }
        }
    } catch (e) {
         console.error('Failed to read language from localStorage', e);
    }
    return domain === "SQL" ? SQL_LANGUAGE_ID : DEFAULT_LANGUAGE_ID;
}

export default function Workspace({ problem, isSolved, contestId, contest, solvedProblemIds = [], nextProblemSlug, prevProblemSlug, courseId, courseName, courseSlug, totalCourseProblems = 0, currentCourseProblemIndex = -1 }: WorkspaceProps) {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setIsSolvedState(isSolved);
    }, [isSolved]);

    const [languageId, setLanguageId] = useState<number>(() => {
        const stored = getStoredLanguageId(problem.domain as string);
        if (problem.allowedLanguages && problem.allowedLanguages.length > 0) {
            const allowedIds = LANGUAGES.filter(l => problem.allowedLanguages!.includes(l.name)).map(l => l.id);
            if (!allowedIds.includes(stored)) {
                return allowedIds[0];
            }
        }
        return stored;
    });
    const [code, setCode] = useState<string>(() => {
        if (typeof window === 'undefined') return '// Write your code here';
        const isSql = (problem.domain as string) === 'SQL';
        if (isSql) return '';

        let initialLangId = getStoredLanguageId(problem.domain as string);
        if (problem.allowedLanguages && problem.allowedLanguages.length > 0) {
            const allowedIds = LANGUAGES.filter(l => problem.allowedLanguages!.includes(l.name)).map(l => l.id);
            if (!allowedIds.includes(initialLangId)) {
                initialLangId = allowedIds[0];
            }
        }

        if (problem.useFunctionTemplate && problem.functionTemplates) {
            const tmpl = problem.functionTemplates.find(t => t.languageId === initialLangId);
            if (tmpl?.functionTemplate) return tmpl.functionTemplate;
        }
        return getLanguageById(initialLangId)?.boilerplate ?? '// Write your code here';
    });

    const [isSolvedState, setIsSolvedState] = useState(isSolved);
    const [showEntryModal, setShowEntryModal] = useState(false);
    const [contestSessionId, setContestSessionId] = useState<string | null>(null);
    const [contestModeActive, setContestModeActive] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [editorSettings, setEditorSettings] = useState({
        fontSize: 14,
        tabSize: 4,
        theme: "vs-light" as "vs-light" | "vs-dark",
        keybinding: "standard" as "standard" | "vim",
        enableCorrectSound: false,
        enableWrongSound: false
    });
    const [activeTab, setActiveTabState] = useState<"description" | "solutions" | "community" | "submissions">(() => {
        const tabMatch = pathname.match(/\/problems\/[^\/]+\/(description|solutions|community|submissions)/);
        return tabMatch ? (tabMatch[1] as "description" | "solutions" | "community" | "submissions") : "description";
    });
    const [isMobile, setIsMobile] = useState(false);
    const [activeSectionTab, setActiveSectionTab] = useState<"description" | "code" | "testcases">("description");

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const tabMatch = pathname.match(/\/problems\/[^\/]+\/(description|solutions|community|submissions)/);
        const urlTab = tabMatch ? (tabMatch[1] as "description" | "solutions" | "community" | "submissions") : "description";
        if (urlTab !== activeTab) {
            setActiveTabState(urlTab);
        }
    }, [pathname]);

    const setActiveTab = useCallback((newTab: "description" | "solutions" | "community" | "submissions") => {
        setActiveTabState(newTab);
        const basePath = `/problems/${problem.slug}`;
        const newUrl = newTab === "description" ? `${basePath}/description` : `${basePath}/${newTab}`;
        const searchParams = new URLSearchParams(window.location.search);
        const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
        const fullUrl = `${newUrl}${query}`;

        try {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            const rawReplace = iframe.contentWindow?.history.replaceState;
            if (rawReplace) {
                rawReplace.call(window.history, null, '', fullUrl);
            } else {
                window.history.replaceState(null, '', fullUrl);
            }
            document.body.removeChild(iframe);
        } catch (e) {
            window.history.replaceState(null, '', fullUrl);
        }
    }, [problem.slug]);
    const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
    const [streakCount, setStreakCount] = useState(0);
    const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
    const [pointsGained, setPointsGained] = useState(0);
    const [highlightLine, setHighlightLine] = useState<number | null>(null);
    const [customTestCases, setCustomTestCases] = useState<{ input: string; output: string }[]>([]);
    const [isTestCasesCollapsed, setIsTestCasesCollapsed] = useState(false);
    const [solvedIds, setSolvedIds] = useState<string[]>(solvedProblemIds);
    const [pendingRestore, setPendingRestore] = useState<{ code: string; langId: number } | null>(null);
    const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState(false);

    useEffect(() => {
        const domain = problem.domain as string;
        const storedLanguageId = getStoredLanguageId(domain);
        let finalLanguageId = domain === "SQL" ? SQL_LANGUAGE_ID : storedLanguageId;

        if (problem.allowedLanguages && problem.allowedLanguages.length > 0 && domain !== "SQL") {
            const allowedIds = LANGUAGES.filter(l => problem.allowedLanguages!.includes(l.name)).map(l => l.id);
            if (!allowedIds.includes(finalLanguageId)) {
                finalLanguageId = allowedIds[0];
            }
        }

        if (finalLanguageId !== languageId) {
            setLanguageId(finalLanguageId);
            setCode("");
        }
    }, [problem.domain, problem.allowedLanguages, languageId]);

    const getBoilerplateForLanguage = useCallback((langId: number): string => {
        if (problem.domain === 'SQL') return '';
        if (problem.useFunctionTemplate && problem.functionTemplates) {
            const tmpl = problem.functionTemplates.find(t => t.languageId === langId);
            if (tmpl?.functionTemplate) return tmpl.functionTemplate;
        }
        return getLanguageById(langId)?.boilerplate ?? '// Write your code here';
    }, [problem.domain, problem.useFunctionTemplate, problem.functionTemplates]);

    const handleActiveCodeChange = useCallback((newCode: string) => {
        setCode(newCode);
    }, []);

    const codeFiles = useCodeFiles({
        userId: session?.user?.id ?? '',
        problemId: contestId ? `${problem.id}_${contestId}` : problem.id,
        languageId,
        defaultCode: getBoilerplateForLanguage(languageId),
        onActiveCodeChange: handleActiveCodeChange,
    });

    useEffect(() => {
        setHighlightLine(null);
    }, [codeFiles.activeFileId]);

    const handleEditorChange = useCallback((value: string | undefined) => {
        const v = value || '';
        setCode(v);
        codeFiles.updateCode(v);
    }, [codeFiles.updateCode]);

    const handleOpenSettings = useCallback(() => setIsSettingsOpen(true), []);
    const handleAddFile = useCallback(() => {
        codeFiles.addFile();
        toast.success('New file created');
    }, [codeFiles.addFile]);

    const handleRemoveFile = useCallback((fileId: string) => {
        codeFiles.removeFile(fileId);
        toast.success('File removed');
    }, [codeFiles.removeFile]);

    const handleContestBlocked = useCallback((reason: string) => {
        toast.error(`Contest blocked: ${reason}`);
        router.push(`/contest/${contest?.slug || contestId}`);
    }, [contest?.slug, contestId, router]);

    const fileTabsNode = useMemo(() => {
        if (!codeFiles.isLoaded || contestId) return null;
        return (
            <CodeFileTabs
                files={codeFiles.files}
                activeFileId={codeFiles.activeFileId}
                onSelect={codeFiles.selectFile}
                onAdd={handleAddFile}
                onRename={codeFiles.renameFile}
                onRemove={handleRemoveFile}
            />
        );
    }, [codeFiles.isLoaded, codeFiles.files, codeFiles.activeFileId, codeFiles.selectFile, codeFiles.renameFile, handleAddFile, handleRemoveFile, contestId]);

    useEffect(() => {
        if (!contestId) return;
        const checkParticipation = async () => {
            try {
                const result = await getParticipationStatus(contestId);
                if (result.success && result.participation) {
                    if (result.participation.sessionId && result.participation.acceptedRules) {
                        setContestSessionId(result.participation.sessionId);
                        setContestModeActive(true);
                    } else if (result.participation.isBlocked) {
                        handleContestBlocked(result.participation.blockReason || "Security violation or manual block.");
                    } else if (result.participation.isFinished) {
                        toast.info("Contest already submitted or session expired.");
                        router.push(`/contest/${contest?.slug || contestId}`);
                    } else if (!result.participation.acceptedRules || !result.participation.sessionId) {
                        setShowEntryModal(true);
                    }
                } else {
                    setShowEntryModal(true);
                }
            } catch (err) {
                 console.error("Failed to check participation:", err);
                toast.error("Failed to verify contest participation. Please refresh.");
            }
        };
        checkParticipation();
    }, [contestId, handleContestBlocked]);

    const handleContestStart = useCallback((sessionId: string) => {
        setContestSessionId(sessionId);
        setContestModeActive(true);
        setShowEntryModal(false);
        toast.success("Contest mode activated! Good luck!");
    }, []);

    const handleLanguageChange = useCallback((newLanguageId: number) => {
        if ((problem.domain as string) === "SQL") return;
        setLanguageId(newLanguageId);
        setCode("");
        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguageId.toString());
        } catch (e) {
             console.error('Failed to save language to localStorage', e);
        }
    }, [problem.domain]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('algofox_editor_settings');
            if (stored) setEditorSettings(JSON.parse(stored));
        } catch (e) {
             console.error('Failed to load editor settings', e);
        }
    }, []);

    const handleSettingsChange = useCallback((newSettings: any) => {
        setEditorSettings((prev) => ({
            ...prev,
            ...newSettings,
        }));
        try {
            const current = JSON.parse(localStorage.getItem('algofox_editor_settings') || '{}');
            localStorage.setItem('algofox_editor_settings', JSON.stringify({ ...current, ...newSettings }));
        } catch (e) {
             console.error('Failed to save editor settings', e);
        }
    }, []);

    const handleAddCustomCase = useCallback(() => {
        setCustomTestCases(prev => [...prev, { input: "", output: "" }]);
        toast.success("Added new custom test case");
    }, []);

    const handleUpdateCustomCase = useCallback((index: number, updates: { input?: string; output?: string }) => {
        setCustomTestCases(prev => {
            const next = [...prev];
            next[index] = { ...next[index], ...updates };
            return next;
        });
    }, []);

    const handleRemoveCustomCase = useCallback((index: number) => {
        setCustomTestCases(prev => prev.filter((_, i) => i !== index));
    }, []);

    const { sizes: mainSizes, setSizes: setMainSizes, isHydrated: mainHydrated } = usePersistentSplit('algofox_workspace_main_split', [40, 60]);
    const { sizes: verticalSizes, setSizes: setVerticalSizes, setSizesProgrammatically: setVerticalSizesProgrammatically, isHydrated: verticalHydrated } = usePersistentSplit('algofox_workspace_vertical_split', [60, 40]);

    const toggleTestCases = useCallback(() => {
        setIsTestCasesCollapsed(prev => {
            const nextVal = !prev;
            if (nextVal) setVerticalSizesProgrammatically([95.5, 4.5]);
            else setVerticalSizesProgrammatically([60, 40]);
            return nextVal;
        });
    }, [setVerticalSizesProgrammatically]);

    useEffect(() => {
        if (verticalHydrated) {
            if (verticalSizes[1] < 10) setIsTestCasesCollapsed(true);
            else setIsTestCasesCollapsed(false);
        }
    }, [verticalSizes, verticalHydrated]);

    useEffect(() => { setSolvedIds(solvedProblemIds); }, [solvedProblemIds]);

    const codeRef = useRef(code);
    const customTestCasesRef = useRef(customTestCases);
    const sessionRef = useRef(session);
    const contestSessionIdRef = useRef(contestSessionId);
    const solvedIdsRef = useRef(solvedIds);
    const editorSettingsRef = useRef(editorSettings);

    useEffect(() => { codeRef.current = code; }, [code]);
    useEffect(() => { customTestCasesRef.current = customTestCases; }, [customTestCases]);
    useEffect(() => { sessionRef.current = session; }, [session]);
    useEffect(() => { contestSessionIdRef.current = contestSessionId; }, [contestSessionId]);
    useEffect(() => { solvedIdsRef.current = solvedIds; }, [solvedIds]);
    useEffect(() => { editorSettingsRef.current = editorSettings; }, [editorSettings]);

    const onSubmissionSolved = useCallback((streakUpdated?: boolean, currentStreak?: number, firstSolved?: boolean, pointsGained?: number) => {
        setIsSolvedState(true);
        setActiveTab("submissions");
        if (!solvedIdsRef.current.includes(problem.id)) {
            setSolvedIds(prev => [...prev, problem.id]);
        }
        if (streakUpdated && currentStreak !== undefined) {
            setStreakCount(currentStreak);
            setIsStreakModalOpen(true);
        }
        if (firstSolved) {
            setPointsGained(pointsGained ?? 0);
            setIsPointsModalOpen(true);
        }
    }, [problem.id]);

    const {
        handleSubmission,
        isRunning,
        isSubmitting,
        submissionMode,
        submissionResults,
        submissionStatus,
        submissionId
    } = useWorkspaceSubmission({
        problem,
        languageId,
        contestId,
        sessionRef,
        contestSessionIdRef,
        customTestCasesRef,
        editorSettingsRef,
        solvedIdsRef,
        codeRef,
        setIsTestCasesCollapsed,
        setVerticalSizesProgrammatically,
        setHighlightLine,
        onSolved: onSubmissionSolved,
        onSubmissionStarted: () => {
            setActiveTab("submissions");
        }
    });

    const handleCloseSidebar = useCallback(() => setIsSidebarOpen(false), []);
    const handleToggleSidebar = useCallback(() => setIsSidebarOpen(true), []);

    const handleSubmitAction = useCallback(() => {
        if (contestId) {
            setIsSubmitConfirmOpen(true);
        } else {
            handleSubmission("SUBMIT");
        }
    }, [contestId, handleSubmission]);

    const handleConfirmSubmit = useCallback(() => {
        setIsSubmitConfirmOpen(false);
        handleSubmission("SUBMIT");
    }, [handleSubmission]);

    const handleCloseSubmitConfirm = useCallback(() => setIsSubmitConfirmOpen(false), []);

    const handleRunAction = useCallback(() => handleSubmission("RUN"), [handleSubmission]);
    const handleCloseSettings = useCallback(() => setIsSettingsOpen(false), []);
    const handleCloseStreak = useCallback(() => setIsStreakModalOpen(false), []);
    const handleClosePoints = useCallback(() => setIsPointsModalOpen(false), []);

    const handleRestoreCode = useCallback((restoredCode: string, restoredLangId: number) => {
        if (Number(restoredLangId) === Number(languageId)) {
            setCode(restoredCode);
            codeFiles.updateCode(restoredCode);
            toast.success("Code restored to editor");
        } else {
            setPendingRestore({ code: restoredCode, langId: restoredLangId });
            setLanguageId(restoredLangId);
            localStorage.setItem(LANGUAGE_STORAGE_KEY, restoredLangId.toString());
            toast.info("Switching language and restoring code...");
        }
    }, [languageId, codeFiles]);

    const isUserRole = (session?.user as any)?.role === "USER";

    useWorkspaceShortcuts({
        onRun: handleRunAction,
        onSubmit: handleSubmitAction,
        onAddFile: handleAddFile,
        onSwitchTab: (index) => {
            if (codeFiles.files[index]) {
                codeFiles.selectFile(codeFiles.files[index].fileId);
                toast.info(`Switched to ${codeFiles.files[index].name}`);
            }
        },
        onRemoveActiveFile: () => {
            if (codeFiles.files.length > 1 && codeFiles.activeFileId) handleRemoveFile(codeFiles.activeFileId);
            else if (codeFiles.files.length === 1) toast.error("Cannot delete the last remaining file");
        },
        onNextProblem: () => {
             const baseUrl = `/problems/${nextProblemSlug}`;
             const params = new URLSearchParams();
             if (contestId) params.append("contestId", contestId);
             if (courseId) params.append("courseId", courseId);
             const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
             router.push(url);
        },
        onPrevProblem: () => {
             const baseUrl = `/problems/${prevProblemSlug}`;
             const params = new URLSearchParams();
             if (contestId) params.append("contestId", contestId);
             if (courseId) params.append("courseId", courseId);
             const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
             router.push(url);
        },
        isRunning: isRunning,
        isSubmitting: isSubmitting,
        disabled: isUserRole,
        nextProblemSlug,
        prevProblemSlug,
    });

    useEffect(() => {
        if (pendingRestore && codeFiles.isLoaded && languageId === pendingRestore.langId) {
            setCode(pendingRestore.code);
            codeFiles.updateCode(pendingRestore.code);
            setPendingRestore(null);
            toast.success("Code restored to editor");
        }
    }, [pendingRestore, codeFiles.isLoaded, languageId]);

    if (!mainHydrated || !verticalHydrated) return null;

    return (
        <div className="h-screen w-full bg-[#fafafa] dark:bg-[#1D1E23] flex flex-col overflow-hidden animate-fadeIn">
            {!contestId && <ProblemTour />}
            <WorkspaceModals
                isSettingsOpen={isSettingsOpen}
                handleCloseSettings={handleCloseSettings}
                editorSettings={editorSettings}
                handleSettingsChange={handleSettingsChange}
                isStreakModalOpen={isStreakModalOpen}
                handleCloseStreak={handleCloseStreak}
                streakCount={streakCount}
                isPointsModalOpen={isPointsModalOpen}
                handleClosePoints={handleClosePoints}
                pointsGained={pointsGained}
                contestId={contestId}
                contestModeActive={contestModeActive}
                contestSessionId={contestSessionId}
                handleContestBlocked={handleContestBlocked}
                isSubmitConfirmOpen={isSubmitConfirmOpen}
                handleCloseSubmitConfirm={handleCloseSubmitConfirm}
                handleConfirmSubmit={handleConfirmSubmit}
                isSubmitting={isSubmitting}
            />
            <WorkspaceSidebars
                contestId={contestId}
                isSidebarOpen={isSidebarOpen}
                handleCloseSidebar={handleCloseSidebar}
                problem={problem}
                solvedIds={solvedIds}
                contest={contest}
                courseId={courseId}
                courseName={courseName}
            />
            <WorkspaceHeader
                onSubmit={handleSubmitAction}
                onRun={handleRunAction}
                isSubmitting={isSubmitting}
                isRunning={isRunning}
                contestId={contestId}
                courseId={courseId}
                courseSlug={courseSlug}
                totalCourseProblems={totalCourseProblems}
                currentCourseProblemIndex={currentCourseProblemIndex}
                endTime={contest?.endTime}
                nextProblemSlug={nextProblemSlug}
                prevProblemSlug={prevProblemSlug}
                type={problem.type}
                onToggleSidebar={handleToggleSidebar}
                problemId={problem.id}
                isSubmissionPassed={submissionStatus === 'ACCEPTED'}
            />
            {isMobile && (
                <div className="flex border-b border-gray-200 dark:border-white/5 bg-[#fafafa] dark:bg-[#1C1D21] shrink-0 select-none">
                    <button
                        onClick={() => setActiveSectionTab("description")}
                        className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                            activeSectionTab === "description"
                                ? "border-orange-500 text-orange-500"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setActiveSectionTab("code")}
                        className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                            activeSectionTab === "code"
                                ? "border-orange-500 text-orange-500"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                    >
                        Code
                    </button>
                    <button
                        onClick={() => setActiveSectionTab("testcases")}
                        className={`flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                            activeSectionTab === "testcases"
                                ? "border-orange-500 text-orange-500"
                                : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                    >
                        Test Cases
                    </button>
                </div>
            )}
            <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-[#f0f0f0] dark:bg-[#1D1E23]">
                {isMobile ? (
                    <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
                        {/* Description Panel */}
                        <div className={`h-full w-full overflow-hidden ${activeSectionTab === "description" ? "block" : "hidden"}`}>
                            <ProblemDescription
                                problem={problem}
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                isSolved={isSolvedState}
                                contestId={contestId}
                                domain={problem.domain}
                                nextProblemSlug={nextProblemSlug}
                                courseId={courseId}
                                onRestoreCode={handleRestoreCode}
                                isSubmitting={isSubmitting}
                                latestSubmissionId={submissionId}
                            />
                        </div>
                        {/* Code Panel */}
                        <div className={`h-full w-full flex flex-col min-h-0 overflow-hidden ${activeSectionTab === "code" ? "block" : "hidden"}`}>
                            <CodeEditor
                                key={`${problem.id}-${languageId}`}
                                value={code}
                                onChange={handleEditorChange}
                                languageId={languageId}
                                onLanguageChange={handleLanguageChange}
                                problemId={problem.id}
                                domain={problem.domain}
                                functionTemplates={problem.useFunctionTemplate && problem.functionTemplates ? problem.functionTemplates : undefined}
                                settings={editorSettings}
                                onOpenSettings={handleOpenSettings}
                                readOnly={isSubmitting}
                                userId={session?.user?.id || ""}
                                fileTabs={fileTabsNode}
                                highlightLine={highlightLine}
                                allowedLanguages={problem.allowedLanguages}
                            />
                        </div>
                        {/* Test Cases Panel */}
                        <div className={`h-full w-full overflow-hidden flex flex-col min-h-0 bg-[#fafafa] dark:bg-[#1D1E23] ${activeSectionTab === "testcases" ? "block" : "hidden"}`}>
                            <TestCases
                                cases={problem.testCases}
                                customCases={customTestCases}
                                onAddCustomCase={handleAddCustomCase}
                                onUpdateCustomCase={handleUpdateCustomCase}
                                onRemoveCustomCase={handleRemoveCustomCase}
                                results={submissionResults}
                                status={submissionStatus}
                                mode={submissionMode}
                                problemId={problem.id}
                                isCollapsed={false}
                                onToggleCollapse={() => {}}
                                onErrorLineDetected={setHighlightLine}
                            />
                        </div>
                    </div>
                ) : (
                    <Split className="split flex h-full w-full" sizes={mainSizes} minSize={300} gutterSize={8} snapOffset={30} onDragEnd={setMainSizes}>
                        <div id="problem-description" className="h-full overflow-hidden border-l border-dashed border-gray-400 dark:border-white/10">
                            <ProblemDescription
                                problem={problem}
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                                isSolved={isSolvedState}
                                contestId={contestId}
                                domain={problem.domain}
                                nextProblemSlug={nextProblemSlug}
                                courseId={courseId}
                                onRestoreCode={handleRestoreCode}
                                isSubmitting={isSubmitting}
                                latestSubmissionId={submissionId}
                            />
                        </div>
                        <div className="h-full overflow-hidden flex flex-col border-r border-dashed border-gray-400 dark:border-white/10 min-h-0">
                            <Split className="split-vertical flex flex-col h-full min-h-0" direction="vertical" sizes={verticalSizes} minSize={[100, 40]} gutterSize={8} onDragEnd={setVerticalSizes}>
                                <div id="code-editor" className="overflow-hidden flex flex-col min-h-0 h-full">
                                    <CodeEditor
                                        key={`${problem.id}-${languageId}`}
                                        value={code}
                                        onChange={handleEditorChange}
                                        languageId={languageId}
                                        onLanguageChange={handleLanguageChange}
                                        problemId={problem.id}
                                        domain={problem.domain}
                                        functionTemplates={problem.useFunctionTemplate && problem.functionTemplates ? problem.functionTemplates : undefined}
                                        settings={editorSettings}
                                        onOpenSettings={handleOpenSettings}
                                        readOnly={isSubmitting}
                                        userId={session?.user?.id || ""}
                                        fileTabs={fileTabsNode}
                                        highlightLine={highlightLine}
                                        allowedLanguages={problem.allowedLanguages}
                                      />
                                </div>
                                <div id="test-cases" className="overflow-hidden flex flex-col min-h-0 h-full bg-[#fafafa] dark:bg-[#1D1E23] border-b border-l border-r border-dashed border-gray-300 dark:border-white/10">
                                    <TestCases
                                        cases={problem.testCases}
                                        customCases={customTestCases}
                                        onAddCustomCase={handleAddCustomCase}
                                        onUpdateCustomCase={handleUpdateCustomCase}
                                        onRemoveCustomCase={handleRemoveCustomCase}
                                        results={submissionResults}
                                        status={submissionStatus}
                                        mode={submissionMode}
                                        problemId={problem.id}
                                        isCollapsed={isTestCasesCollapsed}
                                        onToggleCollapse={toggleTestCases}
                                        onErrorLineDetected={setHighlightLine}
                                    />
                                </div>
                            </Split>
                        </div>
                    </Split>
                )}
                <style jsx global>{`
                    .split { display: flex; }
                    .split-vertical { display: flex; flex-direction: column; }
                    .gutter { background-color: transparent; transition: all 0.25s ease; position: relative; }
                    .gutter:hover { background-color: rgba(234, 88, 12, 0.1) !important; }
                    .gutter.gutter-horizontal { cursor: col-resize; border-left: 1px dashed #d1d5db; }
                    .gutter.gutter-vertical { cursor: row-resize; border-top: 1px dashed #d1d5db; }
                    .dark .gutter.gutter-horizontal { border-left: 1px dashed rgba(255, 255, 255, 0.1); }
                    .dark .gutter.gutter-vertical { border-top: 1px dashed rgba(255, 255, 255, 0.1); }

                    .gutter::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background-color: #9ca3af;
                        border-radius: 4px;
                        opacity: 0.5;
                        transition: all 0.25s ease;
                    }
                    .gutter.gutter-horizontal::after { width: 4px; height: 24px; }
                    .gutter.gutter-vertical::after { width: 24px; height: 4px; }
                    .gutter:hover::after { opacity: 1; background-color: #f97316; height: 32px; width: 4px; }
                    .gutter.gutter-vertical:hover::after { width: 32px; height: 4px; }
                    .dark .gutter::after { background-color: rgba(255, 255, 255, 0.3); }
                    .dark .gutter:hover { background-color: rgba(255, 121, 198, 0.15) !important; }
                    .dark .gutter:hover::after { background-color: #ff79c6; }
                `}</style>
            </div>
        </div>
    );
}
