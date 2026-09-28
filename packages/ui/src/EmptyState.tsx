"use client";

import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-[#15161A]/50 my-2">
      {icon && <div className="mb-3 text-gray-400 dark:text-gray-500">{icon}</div>}
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      {description && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 max-w-sm">
          {description}
        </p>
      )}
    </div>
  );
}
