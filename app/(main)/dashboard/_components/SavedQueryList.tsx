'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface SavedQuery {
  id: string;
  name: string;
  query: string;
  createdAt: string;
}

interface SavedQueryListProps {
  onSelect: (query: string) => void;
}

export function SavedQueryList({ onSelect }: SavedQueryListProps) {
  const [queries, setQueries] = useState<SavedQuery[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/ai-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: '__list_saved_queries__' }),
      }).then(r => r.json()).then(data => {
        if (Array.isArray(data.response)) setQueries(data.response);
      }).catch(() => {});
    }
  }, [isOpen]);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex justify-between items-center"
      >
        <span>Saved Queries</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="px-3 pb-2 space-y-1">
          {queries.length === 0 && (
            <p className="text-xs text-gray-400">No saved queries yet.</p>
          )}
          {queries.map(q => (
            <button
              key={q.id}
              onClick={() => onSelect(q.query)}
              className="w-full text-left px-2 py-1 text-xs rounded hover:bg-gray-100 dark:hover:bg-gray-800 truncate"
            >
              {q.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
