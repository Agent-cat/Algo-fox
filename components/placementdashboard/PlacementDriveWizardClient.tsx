"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPlacementJob } from "@/actions/placement";
import { toast } from "sonner";
import { Check, CheckCircle2, ChevronRight, Loader2, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const steps = [
    { id: 1, title: "Basic Details", description: "Company & Title" },
    { id: 2, title: "Job Info", description: "Role, CTC, & Skills" },
    { id: 3, title: "Hiring Workflow", description: "Interview Stages" },
    { id: 4, title: "Eligibility Criteria", description: "Marks & Groups" },
];

export function PlacementDriveWizardClient({ availableTags = [] }: { availableTags?: { tag: string; count: number }[] }) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Tag Input State
    const [tagInput, setTagInput] = useState("");
    const [isTagInputFocused, setIsTagInputFocused] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        companyName: "",
        companyAbout: "",
        companyWebsite: "",
        companyLogoUrl: "",
        type: "Full-time",
        location: "",
        category: "Tech",
        functions: "",
        ctc: "",
        description: "",
        requiredSkills: "",
        additionalInfo: "",
        attachedDocs: "",
        minGpa: "",
        min10thMarks: "",
        min12thMarks: "",
        targetTags: [] as string[],
        workflow: [{ title: "Online Assessment", venue: "", order: 1 }]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleWorkflowChange = (index: number, field: string, value: string) => {
        const newWorkflow = [...formData.workflow];
        newWorkflow[index] = { ...newWorkflow[index], [field]: value };
        setFormData(prev => ({ ...prev, workflow: newWorkflow }));
    };

    const addWorkflowStep = () => {
        setFormData(prev => ({
            ...prev,
            workflow: [...prev.workflow, { title: "", venue: "", order: prev.workflow.length + 1 }]
        }));
    };

    const removeWorkflowStep = (index: number) => {
        const newWorkflow = formData.workflow.filter((_, i) => i !== index).map((step, i) => ({ ...step, order: i + 1 }));
        setFormData(prev => ({ ...prev, workflow: newWorkflow }));
    };

    const handleTagToggle = (tag: string) => {
        setFormData(prev => {
            if (prev.targetTags.includes(tag)) {
                return { ...prev, targetTags: prev.targetTags.filter(t => t !== tag) };
            } else {
                return { ...prev, targetTags: [...prev.targetTags, tag] };
            }
        });
    };

    const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const value = tagInput.trim();
            if (value && !formData.targetTags.includes(value)) {
                setFormData(prev => ({ ...prev, targetTags: [...prev.targetTags, value] }));
            }
            setTagInput("");
        }
    };

    const addTagFromSuggestion = (tag: string) => {
        if (!formData.targetTags.includes(tag)) {
            setFormData(prev => ({ ...prev, targetTags: [...prev.targetTags, tag] }));
        }
        setTagInput("");
        // Keep focus can be tricky without a ref, we'll just clear input
    };

    const filteredSuggestions = availableTags.filter(({ tag }) => 
        tag.toLowerCase().includes(tagInput.toLowerCase()) && 
        !formData.targetTags.includes(tag)
    );

    const handleTagRemove = (tag: string) => {
        setFormData(prev => ({ ...prev, targetTags: prev.targetTags.filter(t => t !== tag) }));
    };

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true);
            const payload = {
                ...formData,
                description: formData.description.split("\n").filter(d => d.trim() !== ""),
                requiredSkills: formData.requiredSkills.split(",").map(s => s.trim()).filter(s => s !== ""),
                attachedDocs: formData.attachedDocs.split(",").map(d => d.trim()).filter(d => d !== ""),
                minGpa: formData.minGpa && !isNaN(parseFloat(formData.minGpa)) ? parseFloat(formData.minGpa) : undefined,
                min10thMarks: formData.min10thMarks && !isNaN(parseFloat(formData.min10thMarks)) ? parseFloat(formData.min10thMarks) : undefined,
                min12thMarks: formData.min12thMarks && !isNaN(parseFloat(formData.min12thMarks)) ? parseFloat(formData.min12thMarks) : undefined,
            };

            const res = await createPlacementJob(payload);

            if (res.success) {
                toast.success("Placement drive created successfully!");
                router.push("/placementdashboard/placement-drive");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to create placement drive");
            }
        } catch (error: any) {
            toast.error(error.message || "An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto p-4 md:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100">
                    Create Placement Drive
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Follow the steps to post a new job or internship opportunity.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="bg-white dark:bg-[#1D1E23] rounded-2xl border border-gray-200 dark:border-[#333] p-6 shadow-sm sticky top-6">
                        <div className="space-y-6">
                            {steps.map((step) => {
                                const isActive = currentStep === step.id;
                                const isCompleted = currentStep > step.id;
                                return (
                                    <div key={step.id} className="flex items-start gap-4 relative">
                                        {/* Connecting Line */}
                                        {step.id !== steps.length && (
                                            <div className={`absolute top-8 left-[11px] w-[2px] h-full -z-10 ${isCompleted ? 'bg-orange-500' : 'bg-gray-200 dark:bg-[#333]'}`} />
                                        )}
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 mt-0.5 z-10 bg-white dark:bg-[#1D1E23] ${isActive ? 'border-orange-500 text-orange-500' : isCompleted ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'}`}>
                                            {isCompleted ? <Check className="w-3.5 h-3.5" /> : <span className="text-xs font-bold">{step.id}</span>}
                                        </div>
                                        <div>
                                            <h4 className={`text-sm font-bold ${isActive || isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                                {step.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Form Area */}
                <div className="flex-1 bg-white dark:bg-[#1D1E23] rounded-2xl border border-gray-200 dark:border-[#333] p-8 shadow-sm">
                    {/* Step 1: Basic Details */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Basic Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Job Title</label>
                                        <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Software Development Engineer" className="dark:bg-[#24262C] dark:border-[#333]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Company Name</label>
                                        <Input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. Google" className="dark:bg-[#24262C] dark:border-[#333]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Company Website</label>
                                        <Input name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} placeholder="https://" className="dark:bg-[#24262C] dark:border-[#333]" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Company Logo URL</label>
                                        <Input name="companyLogoUrl" value={formData.companyLogoUrl} onChange={handleChange} placeholder="https://" className="dark:bg-[#24262C] dark:border-[#333]" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">About Company</label>
                                        <Textarea name="companyAbout" value={formData.companyAbout} onChange={handleChange} placeholder="Brief description of the company..." className="dark:bg-[#24262C] dark:border-[#333] h-24" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Job Info */}
                    {currentStep === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Job Info</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Job Type</label>
                                        <select name="type" value={formData.type} onChange={handleChange} className="w-full rounded-md border border-gray-200 dark:border-[#333] bg-white dark:bg-[#24262C] px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Job Category</label>
                                        <select name="category" value={formData.category} onChange={handleChange} className="w-full rounded-md border border-gray-200 dark:border-[#333] bg-white dark:bg-[#24262C] px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                                            <option value="Tech">Tech</option>
                                            <option value="Non-Tech">Non-Tech</option>
                                            <option value="Core">Core</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Location</label>
                                        <Input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Bangalore, Remote" className="dark:bg-[#24262C] dark:border-[#333]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">CTC / Stipend</label>
                                        <Input name="ctc" value={formData.ctc} onChange={handleChange} placeholder="e.g. 15 LPA or 50k/month" className="dark:bg-[#24262C] dark:border-[#333]" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Functions / Role Context</label>
                                        <Input name="functions" value={formData.functions} onChange={handleChange} placeholder="e.g. Backend Development, Product Management" className="dark:bg-[#24262C] dark:border-[#333]" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Required Skills (comma separated)</label>
                                        <Input name="requiredSkills" value={formData.requiredSkills} onChange={handleChange} placeholder="e.g. React, Node.js, Python, SQL" className="dark:bg-[#24262C] dark:border-[#333]" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Job Description</label>
                                        <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter job description (each new line is a bullet point)" className="dark:bg-[#24262C] dark:border-[#333] h-32" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Hiring Workflow */}
                    {currentStep === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Hiring Workflow</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Define the stages of the hiring process (e.g., Resume Shortlisting, Technical Test, HR Interview).</p>
                                
                                <div className="space-y-4">
                                    {formData.workflow.map((step, index) => (
                                        <div key={index} className="flex gap-4 items-start bg-gray-50 dark:bg-[#24262C] p-4 rounded-xl border border-gray-200 dark:border-[#333]">
                                            <div className="flex-1 space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Stage Title</label>
                                                    <Input value={step.title} onChange={(e) => handleWorkflowChange(index, "title", e.target.value)} placeholder="e.g. Technical Interview" className="dark:bg-[#1D1E23] dark:border-[#333]" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Venue / Details (Optional)</label>
                                                    <Input value={step.venue} onChange={(e) => handleWorkflowChange(index, "venue", e.target.value)} placeholder="e.g. Online, Campus Room 302" className="dark:bg-[#1D1E23] dark:border-[#333]" />
                                                </div>
                                            </div>
                                            <button onClick={() => removeWorkflowStep(index)} disabled={formData.workflow.length === 1} className="mt-7 p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={addWorkflowStep} className="mt-6 flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#333] hover:bg-gray-200 dark:hover:bg-[#444] text-gray-900 dark:text-white text-sm font-bold rounded-lg transition-colors">
                                    <Plus className="w-4 h-4" /> Add Stage
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Eligibility Criteria */}
                    {currentStep === 4 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Eligibility Criteria</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Min. GPA</label>
                                        <Input name="minGpa" type="number" step="0.1" value={formData.minGpa} onChange={handleChange} placeholder="e.g. 7.5" className="dark:bg-[#24262C] dark:border-[#333]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Min. 10th Marks (%)</label>
                                        <Input name="min10thMarks" type="number" value={formData.min10thMarks} onChange={handleChange} placeholder="e.g. 70" className="dark:bg-[#24262C] dark:border-[#333]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Min. 12th / Inter (%)</label>
                                        <Input name="min12thMarks" type="number" value={formData.min12thMarks} onChange={handleChange} placeholder="e.g. 70" className="dark:bg-[#24262C] dark:border-[#333]" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-200 dark:border-[#333]">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Target Tags</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Only students with matching tags will be able to see and apply for this drive. If none are added, it will be visible to everyone.</p>
                                
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {formData.targetTags.map((tag) => (
                                            <div key={tag} className="flex items-center gap-1 bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 px-3 py-1.5 rounded-full text-sm font-medium">
                                                <span>{tag}</span>
                                                <button onClick={(e) => { e.preventDefault(); handleTagRemove(tag); }} className="hover:bg-orange-200 dark:hover:bg-orange-500/30 rounded-full p-0.5 transition-colors">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <Input 
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={handleTagAdd} 
                                            onFocus={() => setIsTagInputFocused(true)}
                                            onBlur={() => setTimeout(() => setIsTagInputFocused(false), 200)}
                                            placeholder="Type a tag and press Enter..." 
                                            className="dark:bg-[#24262C] dark:border-[#333]" 
                                        />
                                        
                                        {/* Autocomplete Suggestions */}
                                        {isTagInputFocused && filteredSuggestions.length > 0 && (
                                            <div className="absolute z-20 w-full mt-1 bg-white dark:bg-[#24262C] border border-gray-200 dark:border-[#333] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                {filteredSuggestions.map(({ tag, count }) => (
                                                    <div 
                                                        key={tag}
                                                        onClick={() => addTagFromSuggestion(tag)}
                                                        className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#1D1E23] cursor-pointer transition-colors"
                                                    >
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tag}</span>
                                                        <span className="text-xs font-bold text-gray-500 bg-gray-100 dark:bg-[#333] px-2 py-0.5 rounded-md">
                                                            {count} {count === 1 ? 'Student' : 'Students'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-10 pt-6 border-t border-gray-200 dark:border-[#333] flex items-center justify-between">
                        <button 
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            disabled={currentStep === 1 || isSubmitting}
                            className="px-6 py-2.5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 transition-colors"
                        >
                            Back
                        </button>
                        
                        {currentStep < 4 ? (
                            <button 
                                onClick={() => setCurrentStep(prev => prev + 1)}
                                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                            >
                                Continue <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button 
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-8 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-green-500/20 flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                                ) : (
                                    <><Check className="w-4 h-4" /> Create Placement Drive</>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
