"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/actions/user.action";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Suspense } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface OnboardingFormData {
    name: string;
    phone: string;
    dateOfBirth: string;
    collegeName: string;
    collegeId: string;
    branch: string;
    year: string;
    bio: string;
}

const RadioOption = ({ label, shortcut, selected, onClick }: { label: string, shortcut: string, selected: boolean, onClick: () => void }) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-3 p-3.5 rounded-lg border shadow-sm cursor-pointer transition-all ${
            selected
                ? "border-orange-500 dark:border-orange-500 bg-orange-50/50 dark:bg-orange-900/10 ring-1 ring-orange-500 dark:ring-orange-500"
                : "border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
        }`}
    >
        <div className={`w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold ${
            selected ? "bg-orange-500 text-white" : "bg-gray-200 dark:bg-[#333] text-gray-500 dark:text-gray-400"
        }`}>
            {shortcut}
        </div>
        <span className={`text-base font-medium ${selected ? "text-orange-600 dark:text-orange-500" : "text-gray-600 dark:text-gray-400"}`}>
            {label}
        </span>
    </div>
);

const Label = ({ children, required }: { children: React.ReactNode, required?: boolean }) => (
    <label className="block text-base font-bold text-gray-800 dark:text-gray-200 mb-2.5">
        {children} {required && <span className="text-gray-400 dark:text-gray-600 font-normal">*</span>}
    </label>
);

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        {...props}
        className={`w-full sm:w-[420px] border border-gray-200 dark:border-[#333] rounded-lg px-4 py-3 text-base text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 focus:ring-1 focus:ring-orange-500 dark:focus:ring-orange-500 transition-colors bg-white dark:bg-[#121212] shadow-md [&::-webkit-calendar-picker-indicator]:dark:filter [&::-webkit-calendar-picker-indicator]:dark:invert ${className || ''}`}
    />
);

function OnboardingContent() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<OnboardingFormData>({
        name: "",
        phone: "",
        dateOfBirth: "",
        collegeName: "",
        collegeId: "",
        branch: "",
        year: "",
        bio: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (step === 1 && (!formData.name.trim() || !formData.dateOfBirth.trim())) {
            toast.error("Please fill in all required fields.");
            return;
        }
        if (step === 2 && !formData.phone.trim()) {
            toast.error("Please fill in all required fields.");
            return;
        }
        if (step === 3 && (!formData.collegeName.trim() || !formData.collegeId.trim())) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setStep(step + 1);
    };

    const handleSubmit = async () => {
        if (!formData.branch.trim() || !formData.year) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        const res = await completeOnboarding(formData);
        if (res.success) {
            toast.success("Profile setup complete!");
            router.push("/dashboard?onboarding=complete");
        } else {
            toast.error(res.error || "Something went wrong");
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                const isRadioSelected = !!formData.year && step === 4;
                if (e.target instanceof HTMLInputElement && e.target.type !== "radio" && !isRadioSelected && step === 4) {
                    return; // Don't submit if pressing enter on text fields during step 4 before selecting year
                }

                e.preventDefault();
                if (step < 4) handleNext();
                else handleSubmit();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [step, formData]);

    const handleKeyPressAction = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (step < 4) handleNext();
            else handleSubmit();
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] text-black dark:text-white flex flex-col items-center justify-center pt-8 md:pt-0 px-6 font-sans relative">
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center w-full">
                <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Welcome to Algofox</span>
            </div>
            <div className="absolute top-6 right-6">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-2xl mt-16 md:mt-0">
                {/* Header title similar to tally form design */}
                <div className="mb-14">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                        Onboarding
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        Please provide your details to personalize your experience.
                    </p>
                </div>

                <div className="relative min-h-[350px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                        >
                            {step === 1 && (
                                <div className="space-y-10">
                                    <div>
                                        <Label required>Full Name</Label>
                                        <Input
                                            name="name"
                                            placeholder="e.g. John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyPressAction}
                                            autoFocus
                                        />
                                    </div>
                                    <div>
                                        <Label required>Date of Birth</Label>
                                        <Input
                                            name="dateOfBirth"
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyPressAction}
                                            max={new Date().toISOString().split("T")[0]}
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-10">
                                    <div>
                                        <Label required>Phone Number</Label>
                                        <Input
                                            name="phone"
                                            type="tel"
                                            placeholder="e.g. 9876543210"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyPressAction}
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-10">
                                    <div>
                                        <Label required>College Name</Label>
                                        <Input
                                            name="collegeName"
                                            placeholder="Type your college name..."
                                            value={formData.collegeName}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyPressAction}
                                            autoFocus
                                        />
                                    </div>
                                    <div>
                                        <Label required>College ID / Roll No</Label>
                                        <Input
                                            name="collegeId"
                                            placeholder="e.g. 2021BCS001"
                                            value={formData.collegeId}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyPressAction}
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-10">
                                    <div>
                                        <Label required>Branch / Degree</Label>
                                        <Input
                                            list="branches"
                                            name="branch"
                                            placeholder="Search or type your branch..."
                                            value={formData.branch}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyPressAction}
                                            autoFocus
                                        />
                                        <datalist id="branches">
                                            <option value="Computer Science Engineering (CSE)" />
                                            <option value="Information Technology (IT)" />
                                            <option value="Electronics and Communication Engineering (ECE)" />
                                            <option value="Electrical and Electronics Engineering (EEE)" />
                                            <option value="Mechanical Engineering (ME)" />
                                            <option value="Civil Engineering (CE)" />
                                            <option value="Artificial Intelligence and Data Science (AI & DS)" />
                                            <option value="Computer Science and Business Systems (CSBS)" />
                                            <option value="Mathematics and Computing" />
                                            <option value="Software Engineering" />
                                        </datalist>
                                    </div>
                                    <div>
                                        <Label required>Academic Year</Label>
                                        <div className="flex flex-col gap-2.5 sm:w-[420px]">
                                            {[
                                                { label: "1st Year", value: "1", shortcut: "A" },
                                                { label: "2nd Year", value: "2", shortcut: "B" },
                                                { label: "3rd Year", value: "3", shortcut: "C" },
                                                { label: "4th Year", value: "4", shortcut: "D" },
                                                { label: "Passout / Alumni", value: "5", shortcut: "E" },
                                            ].map((opt) => (
                                                <RadioOption
                                                    key={opt.value}
                                                    label={opt.label}
                                                    shortcut={opt.shortcut}
                                                    selected={formData.year === opt.value}
                                                    onClick={() => setFormData({ ...formData, year: opt.value })}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="mt-8 flex items-center gap-3">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-[#262626] text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-[#333] transition-colors text-sm border-none cursor-pointer"
                        >
                            Back
                        </button>
                    )}
                    {step < 4 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="px-5 py-2.5 flex items-center gap-2 rounded-lg bg-orange-600 dark:bg-orange-500 text-white font-semibold hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors text-sm border-none cursor-pointer"
                        >
                            Next <span className="text-lg leading-none">&rarr;</span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading || !formData.branch || !formData.year}
                            className="px-5 py-2.5 flex items-center gap-2 rounded-lg bg-orange-600 dark:bg-orange-500 text-white font-semibold hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors disabled:opacity-50 text-sm border-none cursor-pointer"
                        >
                            {loading ? "Saving..." : "Submit"} <span className="text-lg leading-none">&rarr;</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Progress bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 dark:bg-[#262626] border-none z-50">
                <div
                    className="h-full bg-orange-500 dark:bg-orange-500 transition-all duration-300 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                    style={{ width: `${(step / 4) * 100}%` }}
                />
            </div>
        </div>
    );
}

export default function Onboarding() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-black dark:border-white border-t-transparent dark:border-t-transparent"></div>
            </div>
        }>
            <OnboardingContent />
        </Suspense>
    );
}
