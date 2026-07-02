"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search, Loader2, Plus } from "lucide-react";
import { getCategories } from "@/actions/category.action";
import { ProblemDomain } from "@prisma/client";

interface TopicCategory {
  id: string;
  name: string;
  slug: string;
}

interface TopicCategoryInputProps {
  value: TopicCategory[];
  onChange: (categories: TopicCategory[]) => void;
  domain: ProblemDomain;
  placeholder?: string;
}

export function TopicCategoryInput({
  value,
  onChange,
  domain,
  placeholder = "Search and add topic sheets...",
}: TopicCategoryInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [allCategories, setAllCategories] = useState<TopicCategory[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<TopicCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch all categories for this domain on mount / domain change
  useEffect(() => {
    async function fetchAll() {
      setIsLoading(true);
      try {
        const res = await getCategories(domain);
        if (res && res.categories) {
          setAllCategories(res.categories);
        }
      } catch (err) {
        console.error("Failed to load topic categories:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAll();
  }, [domain]);

  // Filter suggestions when input changes
  useEffect(() => {
    if (!inputValue.trim()) {
      // Show all categories not currently selected when focused
      const selectedIds = new Set(value.map((c) => c.id));
      setFilteredSuggestions(allCategories.filter((c) => !selectedIds.has(c.id)));
      return;
    }

    const query = inputValue.toLowerCase();
    const selectedIds = new Set(value.map((c) => c.id));
    const matched = allCategories.filter(
      (c) =>
        c.name.toLowerCase().includes(query) &&
        !selectedIds.has(c.id)
    );
    setFilteredSuggestions(matched);
  }, [inputValue, allCategories, value]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCategory = (category: TopicCategory) => {
    onChange([...value, category]);
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleRemoveCategory = (id: string) => {
    onChange(value.filter((c) => c.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredSuggestions.length > 0) {
        handleSelectCategory(filteredSuggestions[0]);
      }
    }
  };

  return (
    <div className="space-y-3" ref={wrapperRef}>
      {/* Selected Items */}
      <div className="flex flex-wrap gap-2">
        {value.map((cat) => (
          <span
            key={cat.id}
            className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 rounded-[3px] text-sm font-bold border border-orange-200 dark:border-orange-500/20 shadow-sm"
          >
            {cat.name}
            <button
              type="button"
              onClick={() => handleRemoveCategory(cat.id)}
              className="ml-2 hover:text-red-500 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-[#444] rounded-[3px] focus:outline-none focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 bg-white dark:bg-[#1D1E23] text-gray-900 dark:text-gray-300 font-mono text-sm shadow-sm"
          placeholder={placeholder}
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute z-50 mt-1 w-full bg-white dark:bg-[#1D1E23] rounded-[3px] shadow-xl border border-gray-200 dark:border-[#333] max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-400 text-sm flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Loading topics...
              </div>
            ) : (
              <div className="py-1">
                {filteredSuggestions.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat)}
                    className="w-full text-left px-4 py-2 hover:bg-orange-50 dark:hover:bg-[#262626] text-gray-700 dark:text-gray-300 text-sm transition-colors flex items-center justify-between group"
                  >
                    <span>{cat.name}</span>
                    <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 text-orange-500" />
                  </button>
                ))}

                {filteredSuggestions.length === 0 && (
                  <div className="p-4 text-center text-gray-400 text-sm font-mono">
                    No topic sheets found.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
