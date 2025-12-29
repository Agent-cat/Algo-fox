"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { CheckCircle2, XCircle, Terminal, Lock, Clock, AlertCircle, Code2 } from 'lucide-react';
import { ProblemTestCase, TestCase } from '@prisma/client';

interface TestCasesProps {
    cases?: ProblemTestCase[];
    results?: TestCase[];
    mode?: "RUN" | "SUBMIT" | null;
    status?: string | null;
}

export default function TestCases({ cases, results, mode, status }: TestCasesProps) {
    const [activeTab, setActiveTab] = useState<number | "console">(0);

    // Check if there's any compilation error or error message
    const hasError = useMemo(() => {
        // If overall status implies error, return true
        if (status === "COMPILE_ERROR" || status === "RUNTIME_ERROR") return true;

        if (!results || results.length === 0) return false;
        // Check if any test case has COMPILE_ERROR status, RUNTIME_ERROR status, or error message
        const hasErr = results.some(r =>
            r.status === "COMPILE_ERROR" ||
            r.status === "RUNTIME_ERROR" ||
            (r.errorMessage && r.errorMessage.trim().length > 0)
        );
        return hasErr;
    }, [results, status]);

    const errorMessage = useMemo(() => {
        // If system error (status error but no results), can't get specific message from test cases
        if ((status === "COMPILE_ERROR" || status === "RUNTIME_ERROR") && (!results || results.length === 0)) {
            return "Execution failed. The server might be unreachable or the code caused a fatal system error.";
        }

        if (!results || results.length === 0) return null;
        // Find the first error message (prefer COMPILE_ERROR)
        // For compilation errors, all test cases usually have the same error
        const compileError = results.find(r => r.status === "COMPILE_ERROR" && r.errorMessage && r.errorMessage.trim().length > 0);
        if (compileError?.errorMessage) return compileError.errorMessage.trim();

        const runtimeError = results.find(r => r.status === "RUNTIME_ERROR" && r.errorMessage && r.errorMessage.trim().length > 0);
        if (runtimeError?.errorMessage) return runtimeError.errorMessage.trim();

        // Try to find any error message
        const anyError = results.find(r => r.errorMessage && r.errorMessage.trim().length > 0);
        if (anyError?.errorMessage) return anyError.errorMessage.trim();

        return null;
    }, [results, status]);

    // Get error details for console (defined before useEffect that uses it)
    const errorDetails = useMemo(() => {
        // Handle system level errors (no results)
        if ((status === "COMPILE_ERROR" || status === "RUNTIME_ERROR") && (!results || results.length === 0)) {
            return {
                type: status === "COMPILE_ERROR" ? "Compilation Error" : "Runtime Error",
                status: status,
                message: "System Error: The execution environment returned an error without test case details. This often indicates a connection issue with the judge server or a fatal crash.",
                testCaseIndex: undefined,
                time: undefined,
                memory: undefined
            };
        }

        if (!results || results.length === 0) return null;

        // Find error with most details - check for COMPILE_ERROR first (even without errorMessage)
        const compileError = results.find(r => r.status === "COMPILE_ERROR");
        if (compileError) {
            return {
                type: "Compilation Error",
                status: "COMPILE_ERROR",
                message: compileError.errorMessage || "Compilation failed",
                testCaseIndex: compileError.index,
                time: undefined,
                memory: undefined
            };
        }

        // Find RUNTIME_ERROR (even without errorMessage)
        const runtimeError = results.find(r => r.status === "RUNTIME_ERROR");
        if (runtimeError) {
            // Provide more descriptive default message if errorMessage is missing
            const errorMsg = runtimeError.errorMessage?.trim();
            const defaultMsg = errorMsg
                ? errorMsg
                : "A runtime error occurred. This usually means:\n- Division by zero\n- Array index out of bounds\n- Null pointer exception\n- Stack overflow\n- Other execution-time errors";

            return {
                type: "Runtime Error",
                status: "RUNTIME_ERROR",
                message: defaultMsg,
                testCaseIndex: runtimeError.index,
                time: runtimeError.time,
                memory: runtimeError.memory
            };
        }

        // Find any error with error message
        const anyError = results.find(r => r.errorMessage && r.errorMessage.trim().length > 0);
        if (anyError) {
            return {
                type: "Error",
                status: anyError.status,
                message: anyError.errorMessage,
                testCaseIndex: anyError.index,
                time: anyError.time,
                memory: anyError.memory
            };
        }

        // Find any error status (even without message)
        const anyErrorStatus = results.find(r =>
            r.status !== "ACCEPTED" &&
            r.status !== "PENDING" &&
            (r.status === "WRONG_ANSWER" || r.status === "TIME_LIMIT_EXCEEDED" || r.status === "MEMORY_LIMIT_EXCEEDED")
        );
        if (anyErrorStatus) {
            return {
                type: anyErrorStatus.status.replace(/_/g, " "),
                status: anyErrorStatus.status,
                message: anyErrorStatus.errorMessage || `${anyErrorStatus.status.replace(/_/g, " ")} occurred`,
                testCaseIndex: anyErrorStatus.index,
                time: anyErrorStatus.time,
                memory: anyErrorStatus.memory
            };
        }

        return null;
    }, [results, status]);

    // Auto-switch to console tab when error is first detected
    // Reset to first test case when results are cleared
    useEffect(() => {
        if (!results || results.length === 0) {
            // No results, go back to first test case
            setActiveTab(0);
        } else if (hasError) {
            // Always switch to console when there's an error
            // This ensures runtime errors are visible
            setActiveTab("console");
        }
    }, [hasError, results]);

    // Ensure cases is always an array
    const safeCases = cases || [];

    // Filter to show only public (non-hidden) test cases in the UI
    const publicCases = safeCases.filter(tc => !tc.hidden);

    // Determine which test cases to display:
    // - If no results: show only public test cases
    // - If results exist and mode is SUBMIT: show all test cases (public + hidden) but hide contents
    // - If results exist and mode is RUN: show only public test cases (map results to public cases)
    let displayCases: ProblemTestCase[];
    let totalCount: number;
    let resultsMap: Map<number, TestCase> | null = null;

    if (results && results.length > 0) {
        // Create a map of original index -> result for easier lookup
        resultsMap = new Map(results.map(r => [r.index, r]));

        if (mode === "SUBMIT") {
            // For SUBMIT mode, show all test cases (we'll hide contents for hidden ones)
            displayCases = safeCases;
            totalCount = safeCases.length;
        } else {
            // For RUN mode, show only public test cases
            // Results are stored with original indices, so we need to map them
            displayCases = publicCases;
            totalCount = publicCases.length;
        }
    } else {
        // No results yet, show only public test cases
        displayCases = publicCases;
        totalCount = publicCases.length;
    }

    // Generate indices array [0, 1, 2...]
    const indices = Array.from({ length: totalCount }, (_, i) => i);

    return (
        <div className="h-full flex flex-col bg-white border-t border-gray-200">
            {/* Header */}
            <div className="flex items-center gap-4 px-4 py-2 bg-gray-50/50 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Terminal className="w-4 h-4 text-orange-500" />
                    Test Cases
                </div>
            </div>

            {/* Tabs and Content */}
            <div className="px-4 py-3 flex-1 flex flex-col overflow-hidden">
                <div className="flex gap-2 mb-4 overflow-x-auto pb-1 custom-scrollbar">
                    {/* Console Tab - ALWAYS show FIRST if there's an error, with prominent styling */}
                    {hasError && (
                        <button
                            onClick={() => setActiveTab("console")}
                            className={`
                                flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap border
                                ${activeTab === "console"
                                    ? 'bg-red-100 text-red-900 border-red-300 shadow-sm font-semibold'
                                    : 'text-red-600 border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700 font-medium'
                                }
                            `}
                        >
                            <AlertCircle className="w-3.5 h-3.5" />
                            Console
                        </button>
                    )}
                    {indices.map((displayIndex) => {
                        const testCase = displayCases[displayIndex];
                        // Find the original index of this test case in safeCases
                        const originalIndex = safeCases.findIndex(tc => tc.id === testCase.id);
                        // Get result using original index
                        const result = resultsMap?.get(originalIndex);
                        const isHidden = testCase.hidden;
                        const status = result?.status;

                        return (
                            <button
                                key={displayIndex}
                                onClick={() => setActiveTab(displayIndex)}
                                className={`
                                    flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap border
                                    ${activeTab === displayIndex
                                        ? 'bg-gray-100 text-gray-900 border-gray-200 shadow-sm'
                                        : 'text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-700'
                                    }
                                    ${status === 'ACCEPTED' ? 'bg-green-50 border-green-200' : ''}
                                    ${status && status !== 'ACCEPTED' && status !== 'PENDING' ? 'bg-red-50 border-red-200' : ''}
                                `}
                            >
                                {status === 'ACCEPTED' && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                                {status && status !== 'ACCEPTED' && status !== 'PENDING' && <XCircle className="w-3.5 h-3.5 text-red-500" />}
                                {status === 'PENDING' && <div className="w-3 h-3 border-2 border-gray-300 border-t-gray-500 rounded-full animate-spin" />}

                                {mode === "SUBMIT" && isHidden ? `Case ${originalIndex + 1}` : (isHidden ? "Hidden Case" : `Case ${originalIndex + 1}`)}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden">
                    {activeTab === "console" && hasError ? (
                        errorDetails ? (
                            /* Console Content - Full error details */
                            <div className="h-full flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                {/* Console Header */}
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
                                    <Code2 className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm font-semibold text-gray-700">Console Output</span>
                                    <div className="ml-auto flex items-center gap-2">
                                        <div className={`px-2 py-0.5 rounded text-xs font-medium ${errorDetails.status === "COMPILE_ERROR" || errorDetails.status === "RUNTIME_ERROR"
                                            ? "bg-red-50 text-red-700 border border-red-200"
                                            : "bg-amber-50 text-amber-700 border border-amber-200"
                                            }`}>
                                            {errorDetails.type}
                                        </div>
                                    </div>
                                </div>

                                {/* Console Content */}
                                <div className="flex-1 overflow-auto p-4">
                                    <div className="space-y-4">
                                        {/* Error Type */}
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className={`w-4 h-4 ${errorDetails.status === "COMPILE_ERROR" || errorDetails.status === "RUNTIME_ERROR" ? "text-red-500" : "text-amber-500"
                                                }`} />
                                            <span className={`text-sm font-semibold ${errorDetails.status === "COMPILE_ERROR" || errorDetails.status === "RUNTIME_ERROR" ? "text-red-700" : "text-amber-700"
                                                }`}>
                                                {errorDetails.type}
                                            </span>
                                        </div>

                                        {/* Error Location */}
                                        {errorDetails.testCaseIndex !== undefined && (
                                            <div className="text-xs text-gray-500">
                                                <span className="font-medium text-gray-700">Test Case:</span> {errorDetails.testCaseIndex + 1}
                                            </div>
                                        )}

                                        {/* Error Stats */}
                                        {((errorDetails.time !== null && errorDetails.time !== undefined) || (errorDetails.memory !== null && errorDetails.memory !== undefined)) && (
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                {errorDetails.time !== null && errorDetails.time !== undefined && (
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        Time: {errorDetails.time}s
                                                    </span>
                                                )}
                                                {errorDetails.memory && (
                                                    <span>Memory: {errorDetails.memory}KB</span>
                                                )}
                                            </div>
                                        )}

                                        {/* Error Message */}
                                        <div className="mt-4">
                                            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">Error Details</div>
                                            <div className="bg-red-50/50 border border-red-100 rounded-lg p-4 font-mono text-sm text-red-900 whitespace-pre-wrap overflow-x-auto">
                                                {errorDetails.message}
                                            </div>
                                        </div>

                                        {/* Error Status */}
                                        <div className="text-xs text-gray-500">
                                            <span className="font-medium text-gray-700">Status:</span>{" "}
                                            <span className="font-mono text-gray-600">
                                                {errorDetails.status.replace(/_/g, " ")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Fallback: Show error info even when errorDetails is null */
                            <div className="h-full flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
                                    <Code2 className="w-4 h-4 text-amber-500" />
                                    <span className="text-sm font-semibold text-gray-700">Console</span>
                                    <div className="ml-auto">
                                        <div className="px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                            Error Detected
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-auto p-4">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 text-amber-500" />
                                            <span className="text-sm font-semibold text-amber-700">Runtime or Compilation Error</span>
                                        </div>
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                            <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">Error Information</div>
                                            <div className="text-sm space-y-2">
                                                {results && results.length > 0 && (
                                                    <>
                                                        {results.some(r => r.status === "RUNTIME_ERROR") && (
                                                            <div>
                                                                <span className="text-gray-500">Status: </span>
                                                                <span className="text-red-600 font-mono font-medium">RUNTIME_ERROR</span>
                                                            </div>
                                                        )}
                                                        {results.some(r => r.status === "COMPILE_ERROR") && (
                                                            <div>
                                                                <span className="text-gray-500">Status: </span>
                                                                <span className="text-red-600 font-mono font-medium">COMPILE_ERROR</span>
                                                            </div>
                                                        )}
                                                        {/* Show error messages from all test cases with errors */}
                                                        {results.filter(r => (r.status === "RUNTIME_ERROR" || r.status === "COMPILE_ERROR") && r.errorMessage).map((errorResult, idx) => (
                                                            <div key={idx} className="mt-3 p-3 bg-red-50 border border-red-100 rounded">
                                                                <div className="text-xs text-gray-500 mb-1">Test Case {errorResult.index + 1}:</div>
                                                                <div className="text-sm text-red-700 font-mono whitespace-pre-wrap">{errorResult.errorMessage}</div>
                                                            </div>
                                                        ))}
                                                        {!results.some(r => (r.status === "RUNTIME_ERROR" || r.status === "COMPILE_ERROR") && r.errorMessage) && (
                                                            <div className="mt-4 text-xs text-gray-500">
                                                                No detailed error message available. Check the test case tabs above for more information.
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ) : (() => {
                        if (typeof activeTab !== "number") return null;
                        const displayIndex = activeTab;
                        if (displayIndex >= totalCount) return <div className='text-gray-400 text-sm'>Select a case</div>;

                        const testCase = displayCases[displayIndex];
                        // Find the original index of this test case in safeCases
                        const originalIndex = safeCases.findIndex(tc => tc.id === testCase.id);
                        // Get result using original index
                        const result = resultsMap?.get(originalIndex);
                        const isHidden = testCase.hidden;

                        // In SUBMIT mode, hide contents for all test cases (public and hidden)
                        const hideContents = mode === "SUBMIT";

                        return (
                            <div className="space-y-6">
                                {/* Result Status Banner */}
                                {result && (
                                    <div className={`
                                        p-3 rounded-lg border text-sm font-medium flex items-center justify-between
                                        ${result.status === 'ACCEPTED' ? 'bg-green-50 text-green-700 border-green-100' :
                                            result.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                'bg-red-50 text-red-700 border-red-100'}
                                    `}>
                                        <span className="flex items-center gap-2">
                                            {result.status.replace(/_/g, " ")}
                                        </span>
                                        <div className="flex items-center gap-4 text-xs opacity-80">
                                            {result.time !== null && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {result.time}s
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {(isHidden || hideContents) ? (
                                    <div className="flex flex-col items-center justify-center p-8 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                                        <Lock className="w-8 h-8 mb-2 opacity-50" />
                                        <span className="text-sm font-medium">
                                            {hideContents ? "Test case contents are hidden" : "This test case is hidden"}
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Input</div>
                                            <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 font-mono text-sm text-gray-800 whitespace-pre-wrap">
                                                {testCase.input}
                                            </div>
                                        </div>

                                        {/* Output Display Grid */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Expected Output</div>
                                                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 font-mono text-sm text-gray-800 whitespace-pre-wrap h-full">
                                                    {testCase.output}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Your Output</div>
                                                <div className={`
                                                    border rounded-lg p-3 font-mono text-sm whitespace-pre-wrap h-full
                                                    ${result?.status === 'ACCEPTED'
                                                        ? 'bg-green-50/50 border-green-100 text-green-900'
                                                        : result?.status === 'WRONG_ANSWER'
                                                            ? 'bg-red-50/50 border-red-100 text-red-900'
                                                            : 'bg-gray-50 border-gray-100 text-gray-800'
                                                    }
                                                `}>
                                                    {/* Prioritize showing stdout if available, otherwise show "No output" or similar placeholder */}
                                                    {/* Note: result might be typed as TestCase but need to ensure it includes stdout */}
                                                    {(result as any)?.stdout || (result?.status === 'PENDING' ? '...' : 'No output')}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    );
}
