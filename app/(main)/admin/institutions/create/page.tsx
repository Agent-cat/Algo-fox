"use client";

import { createInstitutionAction } from "@/actions/admin/institution";
import {
  Building2,
  ArrowLeft,
  Globe,
  Layout,
  ArrowRight,
  Loader2,
  Plus,
  School,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const institutionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric and hyphens"),
  logo: z.string().url().optional().or(z.literal("")),
  domain: z.string().optional().or(z.literal("")),
});

type InstitutionFormValues = z.infer<typeof institutionSchema>;

export default function CreateInstitutionPage() {
  const router = useRouter();
  const form = useForm<InstitutionFormValues>({
    resolver: zodResolver(institutionSchema),
    defaultValues: {
      name: "",
      slug: "",
      logo: "",
      domain: "",
    },
  });

  const onSubmit = async (values: InstitutionFormValues) => {
    try {
      const res = await createInstitutionAction(values);
      if (res.success) {
        toast.success("Institution created successfully");
        router.push("/admin/institutions");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to create institution");
      }
    } catch (error) {
      console.error("Creation error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("name", value);
    if (!form.formState.dirtyFields.slug) {
      form.setValue(
        "slug",
        value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
        { shouldValidate: true }
      );
    }
  };

  return (
    <div className="min-h-screen dark:bg-[#0a0a0a] pb-20 transition-colors duration-300">
      <div className="max-w-xl mx-auto px-6">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/admin/institutions"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Institutions
          </Link>
        </motion.div>

        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl text-orange-600 dark:text-orange-500 mb-6">
            <School className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            Create Institution
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
            Register a new campus to the platform and initialize their administrative hub.
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] shadow-sm overflow-hidden"
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                  Institution Name
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <input
                    {...form.register("name")}
                    onChange={onNameChange}
                    className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#262626] rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-gray-900 dark:text-gray-100"
                    placeholder="e.g. Stanford University"
                  />
                </div>
                {form.formState.errors.name && (
                  <p className="text-xs font-medium text-red-500 ml-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                  Access Slug
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors">
                    <Layout className="w-5 h-5" />
                  </div>
                  <input
                    {...form.register("slug")}
                    className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#262626] rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-gray-900 dark:text-gray-100 font-mono"
                    placeholder="campus-slug"
                  />
                </div>
                {form.formState.errors.slug && (
                  <p className="text-xs font-medium text-red-500 ml-1">
                    {form.formState.errors.slug.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                    Domain
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors">
                      <Globe className="w-4 h-4" />
                    </div>
                    <input
                      {...form.register("domain")}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#262626] rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-gray-900 dark:text-gray-100"
                      placeholder="university.edu"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                    Logo (URL)
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <input
                      {...form.register("logo")}
                      className="w-full bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#262626] rounded-xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all text-gray-900 dark:text-gray-100"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full py-4 px-6 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white transition-all shadow-sm hover:shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Create Institution
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Footer info */}
        <div className="mt-8 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
          Verified Campus Onboarding Protocol
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
