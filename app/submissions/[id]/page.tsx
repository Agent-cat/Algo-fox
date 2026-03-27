import { getSubmission } from "@/actions/submission.action";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Database, CheckCircle2, XCircle, AlertCircle, Terminal } from "lucide-react";
import CodeEditor from "@/components/workspace/CodeEditor";
import { Suspense } from "react";
import SubmissionDistribution from "@/components/workspace/SubmissionDistribution";


interface PageProps {
    params: Promise<{ id: string }>;
}

async function SubmissionContent({ params }: PageProps) {
    "use cache: private";
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
        <div className="min-h-screen bg-white dark:bg-[#050505] py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1440px] mx-auto space-y-6">
                {/* MODERN HEADER */}
                <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex flex-col gap-4">
                            <Link
                                href={`/problems/${problem.slug}`}
                                className="group inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors"
                            >
                                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform font-sans" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] font-sans">Return</span>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight font-sans">
                                    {problem.title}
                                </h1>
                                <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest opacity-60">Submission Ref: {id}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 lg:gap-8">
                            {/* Outcome Badge */}
                            <div className="flex items-center gap-4 pr-8 lg:border-r border-gray-100 dark:border-[#1a1a1a]">
                                <div className={`${getStatusColor(status)}`}>
                                    {getStatusIcon(status)}
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className={`text-2xl font-black uppercase tracking-tighter font-sans ${getStatusColor(status)}`}>
                                        {status.replace(/_/g, " ")}
                                    </h3>
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] block leading-none font-sans">Final Outcome</span>
                                </div>
                            </div>

                            {/* Detailed Stats */}
                            <div className="flex items-center gap-8">
                                <div className="space-y-2">
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] block leading-none font-sans">Language</span>
                                    <span className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-[10px] font-black rounded-md border border-gray-200 dark:border-white/10 uppercase font-mono">
                                        {language.name}
                                    </span>
                                </div>

                                {time && (
                                    <div className="min-w-[140px] space-y-2">
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] block leading-none font-sans">Runtime</span>
                                        <div className="font-mono">
                                            <SubmissionDistribution
                                                problemId={problem.id}
                                                currentValue={time}
                                                type="runtime"
                                                showGraph={false}
                                            />
                                        </div>
                                    </div>
                                )}

                                {memory && (
                                    <div className="min-w-[140px] space-y-2">
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] block leading-none font-sans">Memory</span>
                                        <div className="font-mono">
                                            <SubmissionDistribution
                                                problemId={problem.id}
                                                currentValue={memory}
                                                type="memory"
                                                showGraph={false}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] block leading-none font-sans">Date</span>
                                    <p className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase font-mono">
                                        {new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* LEFT SIDE: CODE VIEWER */}
                    <div className="lg:col-span-8">
                        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl overflow-hidden flex flex-col shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-100 dark:border-[#1a1a1a] bg-gray-50/50 dark:bg-white/[0.02] flex items-center justify-between">
                                <h2 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-3">
                                    <Terminal className="w-3.5 h-3.5 text-orange-500" />
                                    Source Implementation
                                </h2>
                            </div>
                            <div className="h-[600px] lg:h-[calc(100vh-320px)] w-full antialiased font-mono">
                                <CodeEditor
                                    value={code}
                                    languageId={language.id}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: TEST CASES & LOGS */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* TEST CASES */}
                        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl shadow-sm overflow-hidden flex flex-col max-h-[calc(100vh-320px)]">
                            <div className="px-6 py-4 border-b border-gray-100 dark:border-[#1a1a1a] bg-gray-50/50 dark:bg-white/[0.02] flex items-center justify-between">
                                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Execution Report</h3>
                                <div className="flex items-center gap-2 bg-green-500/10 px-2 py-1 rounded">
                                    <span className="text-[10px] font-black text-green-500">
                                        {testCases.filter(t => t.status === 'ACCEPTED').length}/{testCases.length}
                                    </span>
                                    <span className="text-[9px] font-black text-green-600/70 italic uppercase">Passed</span>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                                <div className="grid grid-cols-1 gap-2">
                                    {testCases.map((tc) => (
                                        <div
                                            key={tc.id}
                                            className={`
                                                group p-4 rounded-xl border transition-all duration-200
                                                ${tc.status === 'ACCEPTED'
                                                    ? 'bg-emerald-50/30 dark:bg-emerald-500/[0.02] border-emerald-100/50 dark:border-emerald-500/10 hover:border-emerald-200 dark:hover:border-emerald-500/20'
                                                    : 'bg-red-50/30 dark:bg-red-500/[0.02] border-red-100/50 dark:border-red-500/10 hover:border-red-200 dark:hover:border-red-500/20'}
                                            `}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black
                                                        ${tc.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                                        {tc.index + 1}
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest block">Test Case</span>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            {tc.time !== null && <span className="text-[9px] text-gray-400 font-medium">{tc.time}ms</span>}
                                                            {tc.memory !== null && <span className="text-[9px] text-gray-400 font-medium px-2 border-l border-gray-100 dark:border-white/5">{tc.memory}KB</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${tc.status === 'ACCEPTED' ? 'text-emerald-500' : 'text-red-500'}`}>
                                                        {tc.status === 'ACCEPTED' ? 'Passed' : 'Failed'}
                                                    </span>
                                                </div>
                                            </div>

                                            {tc.errorMessage && (
                                                <div className="mt-3 p-3 bg-red-500/5 rounded-lg border border-red-500/10 font-mono text-[10px] text-red-400 overflow-x-auto">
                                                    <p className="font-bold mb-1 opacity-50 uppercase tracking-tighter">Error Logs:</p>
                                                    {tc.errorMessage}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
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
