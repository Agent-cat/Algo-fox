import { getSubmission } from "@/actions/submission.action";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Database, CheckCircle2, XCircle, AlertCircle, Terminal } from "lucide-react";
import CodeEditor from "@/components/workspace/CodeEditor";
import { Suspense } from "react";

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
        <div className="min-h-screen bg-white dark:bg-[#050505] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1400px] mx-auto space-y-8">
                {/* HEADER / BREADCRUMBS */}
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-[#1a1a1a] pb-6">
                    <div className="flex items-center gap-6">
                        <Link
                            href={`/problems/${problem.slug}`}
                            className="group flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-medium uppercase tracking-widest">Back</span>
                        </Link>
                        <div className="h-6 w-[1px] bg-gray-200 dark:bg-[#1a1a1a]" />
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 dark:text-white zf uppercase ">{problem.title}</h1>
                            <p className="text-[10px] text-gray-400 font-mono mt-0.5 tracking-tighter uppercase">Submission Reference: {id}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* LEFT SIDE: CODE VIEWER */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="glass-container relative bg-white/5 dark:bg-white/[0.02] backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-sm overflow-hidden flex flex-col shadow-2xl shadow-black/5">
                            <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-black/20 flex items-center justify-between">
                                <h2 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] flex items-center gap-3">
                                    <Terminal className="w-3.5 h-3.5 text-orange-500" />
                                    Source Code
                                </h2>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-black text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-none border border-orange-500/20 uppercase tracking-widest">
                                        {language.name}
                                    </span>
                                </div>
                            </div>
                            <div className="h-[600px] lg:h-[calc(100vh-300px)] w-full antialiased font-mono">
                                <CodeEditor
                                    value={code}
                                    languageId={language.id}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: METADATA & RESULTS */}
                    <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-8">
                        {/* OUTCOME - TEXT ONLY VERSION */}
                        <div className="flex flex-col items-center text-center py-6">
                            <div className={`mb-4 ${getStatusColor(status).replace('text-', 'text- opacity-80 ')} animate-pulse`}>
                                {getStatusIcon(status)}
                            </div>
                            <h3 className={`text-4xl font-black uppercase tracking-tighter italic ${getStatusColor(status)} line-height-1`}>
                                {status.replace(/_/g, " ")}
                            </h3>
                            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-600 mt-2 uppercase tracking-[0.3em]">Status Result</p>
                        </div>

                        <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-100 dark:via-white/10 to-transparent w-full" />

                        {/* PERFORMANCE STATS - GLASS STYLE */}
                        <div className="bg-white/5 rounded-xl dark:bg-white/[0.02] backdrop-blur-md border border-gray-100 dark:border-white/10 p-8 rounded-none shadow-xl shadow-black/5">
                            <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-8 border-b border-white/5 pb-4">
                                Metrics Detail
                            </h3>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Clock className="w-3 h-3" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Runtime</span>
                                    </div>
                                    <p className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tighter">
                                        {time ? <>{time}<span className="text-xs ml-1 font-medium text-gray-400">ms</span></> : <span className="text-gray-200 dark:text-gray-800">--</span>}
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Database className="w-3 h-3" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Memory</span>
                                    </div>
                                    <p className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tighter">
                                        {memory ? <>{memory}<span className="text-xs ml-1 font-medium text-gray-400">KB</span></> : <span className="text-gray-200 dark:text-gray-800">--</span>}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-10 pt-6 border-t  border-gray-50 dark:border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Submitted</span>
                                        <p className="text-[11px] font-bold text-gray-900 dark:text-gray-300 uppercase tracking-tighter flex items-center gap-2">
                                            <Calendar className="w-3 h-3 text-orange-500" />
                                            {new Date(createdAt).toLocaleString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TEST CASES ACCORDION / LIST */}
                        {testCases.length > 0 && (
                            <div className="bg-white/5 rounded-xl dark:bg-white/[0.02] backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-none shadow-xl shadow-black/5 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-black/20 flex items-center justify-between">
                                    <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Test Scenarios</h3>
                                    <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 px-2 py-1">
                                        <span className="text-[10px] font-black text-green-500">{testCases.filter(t => t.status === 'ACCEPTED').length}</span>
                                        <span className="text-[10px] font-black text-gray-300 italic">PASS</span>
                                    </div>
                                </div>
                                <div className="divide-y divide-gray-100 dark:divide-white/5 max-h-[300px] overflow-y-auto custom-scrollbar">
                                    {testCases.map((tc) => (
                                        <div key={tc.id} className="px-6 py-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/[0.02] transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-1 h-4 rounded-none ${tc.status === 'ACCEPTED' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                <span className="text-[10px] font-bold text-gray-700 dark:text-gray-400 uppercase tracking-widest">Case {tc.index + 1}</span>
                                            </div>
                                            <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${tc.status === 'ACCEPTED' ? 'text-green-500' : 'text-red-500'}`}>
                                                {tc.status === 'ACCEPTED' ? 'OK' : 'FAIL'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
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
