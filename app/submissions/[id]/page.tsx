import { getSubmission } from "@/actions/submission.action";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Database, CheckCircle2, XCircle, AlertCircle, Terminal } from "lucide-react";
import CodeEditor from "@/components/workspace/CodeEditor";
import { Suspense } from "react";
import SubmissionDistribution from "@/components/workspace/SubmissionDistribution";
import { cacheLife } from "next/cache";


interface PageProps {
    params: Promise<{ id: string }>;
}

async function SubmissionContent({ params }: PageProps) {
    "use cache: private";
    cacheLife("minutes"); // Fix: Use explicit built-in profile for nested cache compliance
    const { id } = await params;
    const submission = await getSubmission(id);

    if (!submission) {
        return notFound();
    }

    const { status, time, memory, createdAt, language, problem, code, testCases } = submission;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACCEPTED': return 'text-green-500';
            case 'WRONG_ANSWER': return 'text-red-500';
            case 'TIME_LIMIT_EXCEEDED': return 'text-orange-500';
            case 'MEMORY_LIMIT_EXCEEDED': return 'text-purple-500';
            default: return 'text-gray-500';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'ACCEPTED': return <CheckCircle2 className="w-12 h-12" />;
            case 'WRONG_ANSWER': return <XCircle className="w-12 h-12" />;
            case 'TIME_LIMIT_EXCEEDED': return <Clock className="w-12 h-12" />;
            case 'MEMORY_LIMIT_EXCEEDED': return <Database className="w-12 h-12" />;
            default: return <AlertCircle className="w-12 h-12" />;
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] antialiased text-gray-900 dark:text-gray-100">
            <div className="max-w-[1440px] mx-auto p-4 md:p-8">
                {/* TOP BREADCRUMB / NAV */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-[#1a1a1a]">
                    <Link
                        href={`/problems/${problem.slug}`}
                        className="group flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-all font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Back to Workspace</span>
                    </Link>

                    <div className="text-right">
                        <h1 className="text-lg font-bold">
                            {problem.title}
                        </h1>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest leading-none mt-1">Ref: {id.slice(0, 8)}</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* LEFT SIDEBAR: METRICS & STATUS */}
                    <aside className="w-full lg:w-[280px] lg:sticky lg:top-8 shrink-0">
                        {/* Status Area (Minimal) */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`${status === 'ACCEPTED' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {getStatusIcon(status)}
                                </div>
                                <h3 className={`text-2xl font-bold tracking-tight ${status === 'ACCEPTED' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {status.replace(/_/g, " ")}
                                </h3>
                            </div>
                            <p className="text-xs text-gray-400 font-medium">Final Execution Result</p>
                        </div>

                        {/* Performance Details (Plain List) */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 dark:border-[#1a1a1a] pb-2">Status Metrics</h4>

                                {time && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Runtime</span>
                                        <span className="text-sm font-mono font-semibold">{time}ms</span>
                                    </div>
                                )}

                                {memory && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Memory</span>
                                        <span className="text-sm font-mono font-semibold">{memory}KB</span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Language</span>
                                    <span className="text-sm font-semibold">{language.name}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Date</span>
                                    <span className="text-sm font-semibold">
                                        {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>

                            {/* Simple Graphs (if needed, but minimal) */}
                            {(time || memory) && (
                                <div className="space-y-6 pt-4">
                                    {time && (
                                        <div className="space-y-2">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Time Distribution</p>
                                            <SubmissionDistribution
                                                problemId={problem.id}
                                                currentValue={time}
                                                type="runtime"
                                                showGraph={false}
                                            />
                                        </div>
                                    )}
                                    {memory && (
                                        <div className="space-y-2">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Memory Distribution</p>
                                            <SubmissionDistribution
                                                problemId={problem.id}
                                                currentValue={memory}
                                                type="memory"
                                                showGraph={false}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            <Link
                                href={`/problems/${problem.slug}`}
                                className="inline-flex items-center text-xs font-bold text-orange-500 hover:text-orange-600 gap-2 mt-4"
                            >
                                <ArrowLeft className="w-3 h-3" />
                                RETURN TO WORKSPACE
                            </Link>
                        </div>
                    </aside>

                    {/* MAIN CONTENT AREA */}
                    <div className="flex-1 space-y-12 w-full">
                        {/* SOURCE CODE SECTION */}
                        <section className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#1a1a1a] rounded-lg overflow-hidden shadow-sm">
                            <div className="px-6 py-3 border-b border-gray-100 dark:border-[#1a1a1a] flex items-center justify-between bg-gray-50/30 dark:bg-white/1">
                                <h2 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <Terminal className="w-3.5 h-3.5" />
                                    Source Implementation
                                </h2>
                                <span className="text-[9px] font-bold text-gray-400 uppercase">Read Only</span>
                            </div>
                            <div className="h-[600px] lg:h-[65vh] w-full">
                                <CodeEditor
                                    value={code}
                                    languageId={language.id}
                                    readOnly={true}
                                />
                            </div>
                        </section>

                        {/* EXECUTION REPORT SECTION */}
                        <section className="space-y-8 pb-32">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[11px] font-bold text-gray-900 dark:text-gray-100 uppercase tracking-[0.2em] flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    Test Case Report
                                </h3>
                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    Passed: <span className="text-emerald-500">{testCases.filter(t => t.status === 'ACCEPTED').length}/{testCases.length}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {testCases.map((tc) => (
                                    <div
                                        key={tc.id}
                                        className={`
                                            group p-5 rounded-lg border transition-all duration-200
                                            ${tc.status === 'ACCEPTED'
                                                ? 'bg-transparent border-gray-100 dark:border-[#1a1a1a] hover:border-emerald-500/30'
                                                : 'bg-rose-50/30 dark:bg-rose-500/2 border-rose-100 dark:border-rose-500/20 hover:border-rose-500/40'}
                                        `}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold
                                                    ${tc.status === 'ACCEPTED'
                                                        ? 'bg-emerald-500/10 text-emerald-500'
                                                        : 'bg-rose-500/10 text-rose-500'}`}>
                                                    {tc.index + 1}
                                                </div>
                                                <span className={`text-xs font-bold uppercase tracking-tight ${tc.status === 'ACCEPTED' ? 'text-gray-400' : 'text-rose-500'}`}>
                                                    {tc.status === 'ACCEPTED' ? 'Pass' : 'Fail'}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[9px] text-gray-400 font-mono">
                                                    {tc.time}ms / {tc.memory ? Math.round(tc.memory / 10.24)/100 : 0}MB
                                                </p>
                                            </div>
                                        </div>

                                        {tc.errorMessage && (
                                            <div className="mt-3 p-3 bg-gray-50 dark:bg-black/20 rounded border border-gray-100 dark:border-[#1a1a1a] font-mono text-[10px] text-rose-400 overflow-x-auto whitespace-pre-wrap leading-relaxed opacity-90">
                                                {tc.errorMessage}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SubmissionPage({ params }: PageProps) {
    return (
        <Suspense fallback={
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        }>
            <SubmissionContent params={params} />
        </Suspense>
    );
}
