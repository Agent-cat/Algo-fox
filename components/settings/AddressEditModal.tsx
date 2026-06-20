"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { updateUserInfo } from "@/actions/user.action";
import { toast } from "sonner";

interface AddressData {
    country: string;
    pincode: string;
    state: string;
    district: string;
    city: string;
    addressLine: string;
}

interface AddressEditModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: any;
    onSuccess: () => void;
}

export function AddressEditModal({ open, onOpenChange, user, onSuccess }: AddressEditModalProps) {
    const [tab, setTab] = useState<"permanent" | "current">("permanent");
    const [isLoading, setIsLoading] = useState(false);

    const defaultPermanent = user.permanentAddress || {};
    const defaultCurrent = user.currentAddress || {};

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            permanent: {
                country: defaultPermanent.country || "India",
                pincode: defaultPermanent.pincode || "",
                state: defaultPermanent.state || "",
                district: defaultPermanent.district || "",
                city: defaultPermanent.city || "",
                addressLine: defaultPermanent.addressLine || ""
            },
            current: {
                country: defaultCurrent.country || "India",
                pincode: defaultCurrent.pincode || "",
                state: defaultCurrent.state || "",
                district: defaultCurrent.district || "",
                city: defaultCurrent.city || "",
                addressLine: defaultCurrent.addressLine || ""
            }
        }
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const res = await updateUserInfo({
                permanentAddress: data.permanent,
                currentAddress: data.current
            });
            if (res.success) {
                toast.success("Address updated successfully");
                onSuccess();
                onOpenChange(false);
            } else {
                toast.error(res.error || "Failed to update address");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const renderFormFields = (type: "permanent" | "current") => (
        <div className="space-y-6 pt-2">
            <div className="relative">
                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                    Select Country *
                </label>
                <select {...register(`${type}.country`)} className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200">
                    <option value="India">India</option>
                </select>
            </div>
            <div className="relative">
                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                    Enter Pincode *
                </label>
                <input {...register(`${type}.pincode`)} className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" />
            </div>
            <div className="relative">
                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                    Select State *
                </label>
                <select {...register(`${type}.state`)} className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200">
                    <option value="">Select State</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                </select>
            </div>
            <div className="relative">
                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                    Enter District Name *
                </label>
                <input {...register(`${type}.district`)} className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" />
            </div>
            <div className="relative">
                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                    Enter City Name *
                </label>
                <input {...register(`${type}.city`)} className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" />
            </div>
            <div className="relative">
                <label className="absolute -top-2 left-3 inline-block bg-white dark:bg-[#1D1E23] px-1 text-[11px] font-medium text-gray-400">
                    Enter Address Line Name *
                </label>
                <input {...register(`${type}.addressLine`)} className="w-full px-4 py-3 border border-gray-200 rounded-lg dark:bg-[#1D1E23] dark:border-[#333] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-transparent text-sm transition-colors text-gray-800 dark:text-gray-200" />
            </div>
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px] p-0 bg-white dark:bg-[#1D1E23] border-none shadow-2xl rounded-2xl overflow-hidden">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader className="p-6 pb-4 border-b border-gray-100 dark:border-[#333]">
                        <DialogTitle className="text-center text-lg font-bold text-gray-800 dark:text-gray-100">Edit Address</DialogTitle>
                    </DialogHeader>

                    <div className="flex border-b border-gray-100 dark:border-[#333]">
                        <button
                            type="button"
                            onClick={() => setTab("permanent")}
                            className={`flex-1 py-4 text-sm font-semibold transition-colors ${tab === "permanent" ? "text-orange-600 dark:text-orange-500 border-b-2 border-orange-600 dark:border-orange-500" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            Permanent Address
                        </button>
                        <button
                            type="button"
                            onClick={() => setTab("current")}
                            className={`flex-1 py-4 text-sm font-semibold transition-colors ${tab === "current" ? "text-orange-600 dark:text-orange-500 border-b-2 border-orange-600 dark:border-orange-500" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            Current Address
                        </button>
                    </div>

                    <div className="p-8 max-h-[60vh] overflow-y-auto">
                        {tab === "permanent" ? renderFormFields("permanent") : renderFormFields("current")}
                    </div>

                    <div className="p-6 flex justify-center border-t border-gray-100 dark:border-[#333]">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-12 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-full flex items-center transition-colors shadow-sm"
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                            Next
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
