"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label = "Upload Image" }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            if (result.success) {
                onChange(result.url);
                toast.success("Image uploaded successfully");
            } else {
                toast.error(result.error || "Upload failed");
            }
        } catch (err) {
             console.error("Upload error:", err);
            toast.error("Upload failed");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-4 w-full">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest px-1 block">{label}</label>

            <div className="relative group">
                {value ? (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-gray-100 dark:border-[#262626]">
                        <Image
                            src={value}
                            alt="Course"
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => onChange("")}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="w-full aspect-video flex flex-col items-center justify-center gap-3 bg-gray-50 dark:bg-[#262626] border-2 border-dashed border-gray-200 dark:border-[#333] hover:border-orange-500/50 dark:hover:border-orange-500/50 rounded-2xl transition-all group/upload"
                    >
                        {isUploading ? (
                            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                        ) : (
                            <>
                                <div className="p-4 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm group-hover/upload:scale-110 transition-transform">
                                    <Upload className="w-6 h-6 text-gray-400 group-hover/upload:text-orange-500" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Click to upload</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">SVG, PNG, JPG (max 5MB)</p>
                                </div>
                            </>
                        )}
                    </button>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    className="hidden"
                    accept="image/*"
                />
            </div>
        </div>
    );
}
