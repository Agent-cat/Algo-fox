"use client";

import { createInstitutionAction } from "@/actions/admin/institution";
import {
  Building2,
  Save,
  ArrowLeft,
  Globe,
  Shield,
  Sparkles,
  Layout,
  ArrowRight,
  Loader2,
  Plus,
  School,
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
        toast.success("Institution onboarded successfully");
        router.push("/admin/institutions");
        router.refresh();
      } else {
        toast.error(res.error || "Failed to create institution");
      }
    } catch (error) {
      console.error("Creation error:", error);
      toast.error("Critical failure during initialization");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] selection:bg-orange-100 pb-24">
      {/* Expansion Header - Hub Style */}
      <div className="pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center text-orange-600 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 mb-10"
          >
            <School className="w-12 h-12" />
          </motion.div>

          <div className="flex items-center gap-2 text-[10px] font-black text-orange-600 uppercase tracking-[0.3em] mb-4">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            Expansion Protocol
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none mb-6">
            Add New Node
          </h1>

          <p className="text-gray-500 font-medium text-lg max-w-xl mb-12">
            Register a new institution to the global network hub and delegate
            administrative authority.
          </p>

          <Link
            href="/admin/institutions"
            className="flex items-center gap-2 text-[11px] font-black text-gray-400 hover:text-gray-900 transition-all uppercase tracking-widest group bg-white px-6 py-3 rounded-full border border-gray-100 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Registry
          </Link>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto px-6 -mt-10 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white border border-gray-100 p-12 md:p-16 rounded-[4rem] shadow-2xl shadow-gray-200/50"
        >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
            {/* Configuration Section */}
            <div className="space-y-10">
              <div className="flex items-center gap-3 mb-10 border-b border-gray-50 pb-6">
                <Layout className="w-5 h-5 text-orange-600" />
                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.4em]">
                  Core Credentials
                </h3>
              </div>

              <div className="grid gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">
                    Formal Institution Name
                  </label>
                  <input
                    {...form.register("name")}
                    onChange={(e) => {
                      form.setValue("name", e.target.value);
                      if (!form.formState.dirtyFields.slug) {
                        form.setValue(
                          "slug",
                          e.target.value
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, "")
                        );
                      }
                    }}
                    className="w-full px-8 py-6 bg-[#FAFAFA] border border-gray-100 rounded-[2.5rem] text-sm font-bold focus:bg-white focus:outline-none focus:ring-12 focus:ring-orange-500/5 focus:border-orange-500 transition-all shadow-inner"
                    placeholder="e.g. Stanford University"
                  />
                  {form.formState.errors.name && (
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-2 px-2">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">
                    Unique Access Slug
                  </label>
                  <input
                    {...form.register("slug")}
                    className="w-full px-8 py-6 bg-[#FAFAFA] border border-gray-100 rounded-[2.5rem] text-sm font-bold focus:bg-white focus:outline-none focus:ring-12 focus:ring-orange-500/5 focus:border-orange-500 transition-all shadow-inner tracking-widest font-mono"
                    placeholder="stanford-active"
                  />
                  {form.formState.errors.slug && (
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-2 px-2">
                      {form.formState.errors.slug.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Network Metadata */}
            <div className="space-y-10">
              <div className="flex items-center gap-3 mb-10 border-b border-gray-50 pb-6">
                <Globe className="w-5 h-5 text-orange-600" />
                <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.4em]">
                  Network Routing
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">
                    Institution Domain
                  </label>
                  <input
                    {...form.register("domain")}
                    className="w-full px-8 py-6 bg-[#FAFAFA] border border-gray-100 rounded-[2.5rem] text-sm font-bold focus:bg-white focus:outline-none  focus:ring-orange-500/5 focus:border-orange-500 transition-all shadow-inner lowercase"
                    placeholder="stanford.edu"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">
                    Logo URL (Icon)
                  </label>
                  <input
                    {...form.register("logo")}
                    className="w-full px-8 py-6 bg-[#FAFAFA] border border-gray-100 rounded-[2.5rem] text-sm font-bold focus:bg-white focus:outline-none focus:ring-12 focus:ring-orange-500/5 focus:border-orange-500 transition-all shadow-inner"
                    placeholder="https://cloud.storage/icon.png"
                  />
                </div>
              </div>
            </div>

            <div className="pt-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full flex items-center justify-center gap-4 py-8 bg-gray-900 text-white hover:bg-orange-600 transition-all font-black text-sm rounded-[2.5rem] uppercase tracking-[0.4em] disabled:opacity-50 shadow-2xl shadow-gray-200 group"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                ) : (
                  <>
                    Authorize Onboarding
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Footer Security Seal */}
        <div className="mt-20 flex flex-col items-center gap-6 opacity-40">
          <div className="h-px w-24 bg-gray-200" />
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full border border-gray-100 shadow-sm">
            <Shield className="w-4 h-4 text-orange-500" />
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">
              Secure Node Initialization Protocol Verified
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
