"use client";

import { createCourse, updateCourse } from "@/actions/admin/course";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ImageUpload from "./ImageUpload";

interface CourseFormProps {
    course?: any;
    isEdit?: boolean;
}

export default function CourseForm({ course, isEdit = false }: CourseFormProps) {
    const [imageUrl, setImageUrl] = useState(course?.image || "");
    const action = isEdit ? updateCourse.bind(null, course.id) : createCourse;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/courses"
                    className="p-3 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-2xl text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                        {isEdit ? "Edit Course" : "Create New Course"}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium translate-y-1">
                        {isEdit ? "Update course details and settings" : "Add a new learning path to the platform"}
                    </p>
                </div>
            </div>

            <form action={action} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <input type="hidden" name="image" value={imageUrl} />

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-[2.5rem] p-8 space-y-6">
                        <ImageUpload
                            value={imageUrl}
                            onChange={setImageUrl}
                            label="Course Banner"
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">Course Title</label>
                            <input
                                name="title"
                                type="text"
                                defaultValue={course?.title}
                                placeholder="e.g. DSA Fundamentals"
                                required
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-[#262626] border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">Description</label>
                            <textarea
                                name="description"
                                defaultValue={course?.description}
                                placeholder="Describe what students will learn..."
                                required
                                rows={6}
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-[#262626] border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all font-medium resize-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="slug" className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">URL Slug</label>
                            <input
                                id="slug"
                                name="slug"
                                type="text"
                                defaultValue={course?.slug || ""}
                                placeholder="dsa-fundamentals"
                                required
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-[#262626] border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all font-mono text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="difficulty" className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">Difficulty</label>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    defaultValue={course?.difficulty || "EASY"}
                                    className="w-full px-6 py-4 bg-gray-50 dark:bg-[#262626] border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                                >
                                    <option value="EASY">Easy</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HARD">Hard</option>
                                    <option value="CONCEPT">Concept</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="duration" className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">Duration</label>
                                <input
                                    id="duration"
                                    name="duration"
                                    type="text"
                                    defaultValue={course?.duration || ""}
                                    placeholder="e.g. 10 hours"
                                    className="w-full px-6 py-4 bg-gray-50 dark:bg-[#262626] border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="domain" className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">Domain</label>
                            <select
                                id="domain"
                                name="domain"
                                defaultValue={course?.domain || "DSA"}
                                className="w-full px-6 py-4 bg-gray-50 dark:bg-[#262626] border-none rounded-2xl focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                            >
                                <option value="DSA">DSA</option>
                                <option value="SQL">SQL</option>
                                <option value="APTITUDE">Aptitude</option>
                                <option value="OOPS">OOPS</option>
                                <option value="WEBDEV">Web Dev</option>
                                <option value="REACT">React</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-[2.5rem] p-8 space-y-8">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">Settings</label>
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#262626] rounded-2xl border border-transparent hover:border-orange-500/20 transition-all group">
                                <label htmlFor="isPublished" className="text-sm font-bold text-gray-700 dark:text-gray-300 cursor-pointer">Published</label>
                                <input
                                    id="isPublished"
                                    name="isPublished"
                                    type="checkbox"
                                    defaultChecked={course?.isPublished}
                                    className="w-5 h-5 accent-orange-500 rounded-lg cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="tags" className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1">Tags (Comma Separated)</label>
                            <input
                                id="tags"
                                name="tags"
                                type="text"
                                defaultValue={course?.tags?.join(", ") || ""}
                                placeholder="Algo, DS, Interview"
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#262626] border-none rounded-xl focus:ring-2 focus:ring-orange-500 transition-all text-xs font-bold"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            <Save className="w-5 h-5" />
                            {isEdit ? "Update Course" : "Create Course"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
