"use client";

import { useState, useEffect, useRef } from "react";
import { Share2, Link as LinkIcon, Check, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  title: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Check out this article: "${title}"\n`);
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, "_blank");
  };

  const shareOnX = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Check out this article on @Algo_fox: "${title}"`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const shareOnTelegram = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Check out this article: "${title}"`);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank");
  };

  return (
    <div className="relative inline-flex" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border bg-white dark:bg-[#202227] border-gray-200 dark:border-white/5 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-all cursor-pointer"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 w-48 bg-white dark:bg-[#24262C] border border-gray-200 dark:border-white/10 rounded-2xl p-2.5 shadow-2xl z-50 animate-fadeIn">
          <div className="flex flex-col gap-1">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 text-left w-full transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4 text-gray-400" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={shareOnWhatsApp}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-500/10 hover:text-green-600 dark:hover:text-green-400 text-left w-full transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-green-500" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={shareOnX}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white text-left w-full transition-colors cursor-pointer"
            >
              {/* Custom X/Twitter icon */}
              <svg className="w-4 h-4 text-gray-800 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>X / Twitter</span>
            </button>

            <button
              onClick={shareOnTelegram}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-500/10 hover:text-sky-500 dark:hover:text-sky-400 text-left w-full transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 text-sky-500" />
              <span>Telegram</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
