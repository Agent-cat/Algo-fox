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
            case 'ACCEPTED': return 'bg-green-100 text-green-700 border-green-200';
            case 'WRONG_ANSWER': return 'bg-red-100 text-red-700 border-red-200';
            case 'TIME_LIMIT_EXCEEDED': return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'MEMORY_LIMIT_EXCEEDED': return 'bg-purple-100 text-purple-700 border-purple-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'ACCEPTED': return <CheckCircle2 className="w-5 h-5" />;
            case 'WRONG_ANSWER': return <XCircle className="w-5 h-5" />;
            default: return <AlertCircle className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <Link
                        href={`/problems/${problem.slug}`}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Problem
                    </Link>
                    <div className="text-sm text-gray-500">
                        Submission ID: {id}
                    </div>
                </div>

                {/* OVERVIEW CARD */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">{problem.title}</h1>
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(status)}`}>
                                    {getStatusIcon(status)}
                                    {status.replace(/_/g, " ")}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                    <Terminal className="w-4 h-4 text-gray-400" />
                                    <span className="font-medium text-gray-900">{language.name}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                    <Clock className="w-4 h-4 text-gray-400" />
                                    <span className="font-medium text-gray-900">{time ? `${time} ms` : '-'}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                    <Database className="w-4 h-4 text-gray-400" />
                                    <span className="font-medium text-gray-900">{memory ? `${memory} KB` : '-'}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span>{new Date(createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CODE VIEWER */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-gray-500" />
                            Submitted Code
                        </h2>
                    </div>
                    <div className="h-[500px]">
                        <CodeEditor
                            value={code}
                            languageId={language.id}
                            readOnly={true}
                        />
                    </div>
                </div>

                {/* TEST CASES */}
                {testCases.length > 0 && (
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="font-semibold text-gray-900">Test Cases</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {testCases.map((tc) => (
                                <div key={tc.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                    <span className="text-sm font-medium text-gray-700">Case {tc.index + 1}</span>
                                    <span className={`text-xs px-2 py-1 rounded font-medium ${tc.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {tc.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
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
