"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Plus, Check, Trash2, Edit2, Link as LinkIcon, ArrowUpDown, Image as ImageIcon, X } from "lucide-react";
import { createFeaturedItemAction, deleteFeaturedItemAction, updateFeaturedItemAction } from "@/actions/featured";

interface FeaturedItem {
  id: string;
  imageUrl: string;
  redirectUrl: string;
  order: number;
}

interface FeaturedManagerClientProps {
  initialItems: FeaturedItem[];
}

export default function FeaturedManagerClient({ initialItems }: FeaturedManagerClientProps) {
  const router = useRouter();
  
  // Local state initialized by server data
  const [items, setItems] = useState<FeaturedItem[]>(initialItems);
  const [editingItem, setEditingItem] = useState<FeaturedItem | null>(null);

  // Form states
  const [imageUrl, setImageUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [order, setOrder] = useState(0);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Triggered when clicking Edit on a banner card
  const handleEditClick = (item: FeaturedItem) => {
    setEditingItem(item);
    setImageUrl(item.imageUrl);
    setRedirectUrl(item.redirectUrl);
    setOrder(item.order);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Resets the edit mode back to create mode
  const handleCancelEdit = () => {
    setEditingItem(null);
    setImageUrl("");
    setRedirectUrl("");
    setOrder(0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload-document", {
        method: "POST",
        body: formData,
      });

      const data = await uploadRes.json();
      if (!uploadRes.ok || !data.success) {
        throw new Error(data.error || "Failed to upload image");
      }

      setImageUrl(data.url);
      toast.success("Image uploaded successfully!", { id: toastId });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to upload image", { id: toastId });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl.trim() || !redirectUrl.trim()) {
      toast.error("Please fill in both the Image URL/Upload and Redirect URL");
      return;
    }

    setLoading(true);

    try {
      if (editingItem) {
        // Edit Mode
        const res = await updateFeaturedItemAction(editingItem.id, {
          imageUrl,
          redirectUrl,
          order,
        });

        if (res.success && res.item) {
          toast.success("Featured banner updated successfully!");
          // Update local state
          setItems(prev =>
            prev
              .map(item => (item.id === editingItem.id ? (res.item as FeaturedItem) : item))
              .sort((a, b) => a.order - b.order)
          );
          handleCancelEdit();
          router.refresh();
        } else {
          toast.error(res.error || "Failed to update featured banner");
        }
      } else {
        // Create Mode
        const res = await createFeaturedItemAction({
          imageUrl,
          redirectUrl,
          order,
        });

        if (res.success && res.item) {
          toast.success("Featured banner added successfully!");
          // Update local state
          setItems(prev => [...prev, res.item as FeaturedItem].sort((a, b) => a.order - b.order));
          setImageUrl("");
          setRedirectUrl("");
          setOrder(0);
          router.refresh();
        } else {
          toast.error(res.error || "Failed to add featured banner");
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this featured banner?");
    if (!confirmDelete) return;

    const toastId = toast.loading("Deleting banner...");
    try {
      const res = await deleteFeaturedItemAction(id);
      if (res.success) {
        toast.success("Featured banner deleted successfully!", { id: toastId });
        setItems(prev => prev.filter(item => item.id !== id));
        if (editingItem?.id === id) {
          handleCancelEdit();
        }
        router.refresh();
      } else {
        toast.error(res.error || "Failed to delete featured banner", { id: toastId });
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An error occurred", { id: toastId });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form column (1 col on LG) */}
      <div className="bg-white dark:bg-[#202227] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm h-fit">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 pb-3 mb-5">
          <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
            {editingItem ? "Edit Featured Banner" : "Add Featured Banner"}
          </h3>
          {editingItem && (
            <button
              onClick={handleCancelEdit}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title="Cancel Edit"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Cover Image Upload/URL */}
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Banner Image *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/banner.jpg"
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/2 border border-gray-200 dark:border-white/5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-xs transition-all text-gray-700 dark:text-gray-300"
                required
              />
              <label className="flex items-center justify-center px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl transition-all cursor-pointer border border-gray-200 dark:border-white/5 shrink-0 select-none">
                {uploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  "Upload"
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            {imageUrl && (
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-white/2 border border-gray-200 dark:border-white/5 group mt-2">
                <img
                  src={imageUrl}
                  alt="Uploaded Banner preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer shadow-sm text-xs font-bold"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.9)" }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Redirect URL */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
              Redirect URL *
            </label>
            <input
              type="text"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              placeholder="e.g., /problems/dsa or https://externallink.com"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/2 border border-gray-200 dark:border-white/5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-xs transition-all text-gray-700 dark:text-gray-300"
              required
            />
          </div>

          {/* Sorting Order */}
          <div>
            <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
              Sort Order Rank (Ascending)
            </label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/2 border border-gray-200 dark:border-white/5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-xs transition-all text-gray-700 dark:text-gray-300"
              min={0}
            />
          </div>

          <div className="flex gap-3">
            {editingItem && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-white/5 rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-center"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-orange-600/10 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : editingItem ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              <span>{editingItem ? "Update Banner" : "Create Banner"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* List column (2 cols on LG) */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-2">
          Active Banners ({items.length})
        </h3>

        {items.length === 0 ? (
          <div className="bg-white dark:bg-[#202227] border border-gray-200 dark:border-white/5 rounded-2xl p-12 text-center text-gray-500 dark:text-gray-400 font-medium">
            <ImageIcon className="w-8 h-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
            No custom featured banners configured yet. Fill out the form to add one!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`bg-white dark:bg-[#202227] border rounded-2xl p-4 shadow-sm flex flex-col justify-between group overflow-hidden relative transition-all ${
                  editingItem?.id === item.id
                    ? "border-orange-500 ring-1 ring-orange-500"
                    : "border-gray-200 dark:border-white/5"
                }`}
              >
                <div className="space-y-3">
                  {/* Visual Preview */}
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-white/2 border border-gray-200 dark:border-white/5">
                    <img
                      src={item.imageUrl}
                      alt="Featured Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Metadata details */}
                  <div className="space-y-1.5 pl-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                      <LinkIcon className="w-3.5 h-3.5 flex-shrink-0 text-orange-500" />
                      <span className="font-bold truncate" title={item.redirectUrl}>
                        {item.redirectUrl}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-black uppercase tracking-wider">
                      <ArrowUpDown className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                      <span>Order Rank: {item.order}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditClick(item)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 bg-transparent border border-gray-200 dark:border-white/5 rounded-xl transition-all cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 hover:text-white bg-transparent hover:bg-red-650 border border-red-500/20 hover:border-red-650 rounded-xl transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
