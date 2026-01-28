"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { completeOnboarding } from "@/actions/user.action";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Suspense } from "react";

const Icons = {
    User: (props: any) => (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    ),
    Code: (props: any) => (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    ),
    Rocket: (props: any) => (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    )
};

function OnboardingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        collegeId: "",
        year: "",
        leetCodeHandle: "",
        codeChefHandle: "",
        codeforcesHandle: "",
        githubHandle: "",
    });

    useEffect(() => {
        if (searchParams.get("welcome") === "true") {
            toast.success("Successfully signed in!");
            router.replace("/onboarding");
        }
    }, [searchParams, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (step === 1 && (!formData.name.trim() || !formData.collegeId.trim() || !formData.year)) {
            return;
        }
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const res = await completeOnboarding(formData);
        if (res.success) {
            router.push("/dashboard");
        } else {
            alert(res.error || "Something went wrong");
            setLoading(false);
        }
    };

    const isStep1Valid = !!formData.name.trim() && !!formData.collegeId.trim() && !!formData.year;

    return (
        <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Effects (Subtle) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-40 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-orange-100/50 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-gray-100/50 rounded-full blur-[120px]" />
            </div>

            {/* Navbar / Header (Minimal) */}
            <div className="absolute top-8 left-0 w-full px-8 flex justify-between items-center z-20">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center font-bold text-white shadow-lg">A</div>
                    <span className="font-bold text-lg tracking-tight">Algofox</span>
                </div>
            </div>

            <div className="w-full max-w-xl relative z-10">
                {/* Progress Indicators */}
                <div className="flex justify-center mb-16 gap-3">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${step >= i ? "bg-orange-500" : "bg-gray-200"}`}
                            initial={false}
                            animate={{ width: step === i ? 48 : 16, opacity: 1 }}
                        />
                    ))}
                </div>

                <div className="mb-8 text-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-transparent"
                        >
                            {step === 1 && (
                                <div className="space-y-8 text-left max-w-lg mx-auto">
                                    <div className="mb-10 text-center">
                                        <h2 className="text-4xl font-black tracking-tight mb-3">Who are you?</h2>
                                        <p className="text-gray-500 text-lg">We need your college details to personalize your competitive programming journey.</p>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border-b-2 border-gray-200 px-0 py-4 text-xl font-medium focus:outline-none focus:border-orange-500 focus:bg-transparent transition-all placeholder:text-gray-300 rounded-none"
                                                placeholder="e.g. John Doe"
                                                autoFocus
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">College ID / Name *</label>
                                            <input
                                                type="text"
                                                name="collegeId"
                                                value={formData.collegeId}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border-b-2 border-gray-200 px-0 py-4 text-xl font-medium focus:outline-none focus:border-orange-500 focus:bg-transparent transition-all placeholder:text-gray-300 rounded-none"
                                                placeholder="e.g. IIT Delhi"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Academic Year *</label>
                                            <select
                                                name="year"
                                                value={formData.year}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border-b-2 border-gray-200 px-0 py-4 text-xl font-medium focus:outline-none focus:border-orange-500 focus:bg-transparent transition-all rounded-none"
                                                required
                                            >
                                                <option value="">Select your year</option>
                                                <option value="1">1st Year</option>
                                                <option value="2">2nd Year</option>
                                                <option value="3">3rd Year</option>
                                                <option value="4">4th Year</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">Bio</label>
                                            <textarea
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleChange}
                                                className="w-full bg-gray-50 border-b-2 border-gray-200 px-0 py-4 text-xl font-medium focus:outline-none focus:border-orange-500 focus:bg-transparent transition-all placeholder:text-gray-300 rounded-none resize-none"
                                                placeholder="Tell us what you code..."
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-8 text-left max-w-lg mx-auto">
                                    <div className="mb-10 text-center">
                                        <h2 className="text-4xl font-black tracking-tight mb-3">Connect Profiles</h2>
                                        <p className="text-gray-500 text-lg">Showcase your ratings from other platforms.</p>
                                    </div>
                                    <div className="space-y-5">
                                        {[
                                            { label: "LeetCode", name: "leetCodeHandle", logo: "/handles_logos/leetcode.png" },
                                            { label: "CodeChef", name: "codeChefHandle", logo: "/handles_logos/codechef.png" },
                                            { label: "Codeforces", name: "codeforcesHandle", logo: "/handles_logos/codeforces.png" },
                                        ].map((field) => (
                                            <div key={field.name} className="flex items-center gap-6 group">
                                                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300 p-2">
                                                     <img src={field.logo} alt={field.label} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex-1 relative">
                                                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 absolute -top-2 left-0">{field.label}</label>
                                                    <input
                                                        type="text"
                                                        name={field.name}
                                                        // @ts-ignore
                                                        value={formData[field.name]}
                                                        onChange={handleChange}
                                                        className="w-full bg-transparent border-b-2 border-gray-200 px-0 py-2 text-lg font-medium focus:outline-none focus:border-orange-500 transition-all placeholder:text-gray-300"
                                                        placeholder="username"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-8 text-left max-w-lg mx-auto">
                                    <div className="mb-10 text-center">
                                        <h2 className="text-4xl font-black tracking-tight mb-3">Final Step</h2>
                                        <p className="text-gray-500 text-lg">Add your GitHub and you're ready to launch.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase tracking-wider text-gray-500 ml-1">GitHub Username</label>
                                            <div className="relative">
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="githubHandle"
                                                    value={formData.githubHandle}
                                                    onChange={handleChange}
                                                    className="w-full bg-transparent border-b-2 border-gray-200 px-0 py-4 pl-10 text-xl font-medium focus:outline-none focus:border-orange-500 transition-all placeholder:text-gray-300 rounded-none"
                                                    placeholder="github_username"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex justify-between items-center mt-16 max-w-lg mx-auto">
                                <button
                                    onClick={handleBack}
                                    className={`text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-black transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                                >
                                    Back
                                </button>

                                {step < 3 ? (
                                    <button
                                        onClick={handleNext}
                                        disabled={step === 1 && !isStep1Valid}
                                        className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 hover:-translate-y-1 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                                    >
                                        Next
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 hover:-translate-y-1 shadow-lg shadow-orange-500/30 transition-all disabled:opacity-70 disabled:transform-none flex items-center gap-2"
                                    >
                                        {loading ? "Launching..." : "Complete Setup"}
                                        {!loading && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default function Onboarding() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        }>
            <OnboardingContent />
        </Suspense>
    );
}
