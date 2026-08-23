'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Loader2, AlertTriangle } from 'lucide-react';

interface ConfirmationCardProps {
  toolName: string;
  preview: Record<string, unknown>;
  onConfirm: (actionId: string) => Promise<boolean>;
  onCancel: (actionId: string) => Promise<boolean>;
  actionId: string;
}

const TOOL_LABELS: Record<string, string> = {
  createClassroom: 'Create Classroom',
  createAssignment: 'Create Assignment',
  createQuiz: 'Create Quiz',
  assignQuizToClassroom: 'Assign Quiz',
  importStudents: 'Import Students',
};

export function ConfirmationCard({ toolName, preview, onConfirm, onCancel, actionId }: ConfirmationCardProps) {
  const [loading, setLoading] = useState<'confirm' | 'cancel' | null>(null);

  return (
    <div className="border border-orange-200/60 dark:border-orange-500/20 rounded-2xl bg-gradient-to-b from-orange-50/80 to-white dark:from-orange-500/5 dark:to-transparent overflow-hidden shadow-sm shadow-orange-500/5">
      <div className="px-4 py-3 border-b border-orange-200/60 dark:border-orange-500/15 bg-orange-50/50 dark:bg-orange-500/5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-500/15 flex items-center justify-center">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <Badge variant="orange" className="text-[10px] font-semibold">
              {TOOL_LABELS[toolName] || toolName}
            </Badge>
            <span className="text-[11px] text-gray-400 dark:text-gray-500 ml-2">requires approval</span>
          </div>
        </div>
      </div>
      <div className="px-4 py-4">
        <pre className="text-[12px] text-gray-600 dark:text-gray-400 font-mono whitespace-pre-wrap max-h-40 overflow-y-auto bg-gray-50 dark:bg-white/[0.03] rounded-xl p-3.5 border border-gray-200/60 dark:border-white/[0.06] leading-relaxed">
          {JSON.stringify(preview, null, 2)}
        </pre>
        <div className="flex gap-2.5 mt-4">
          <Button
            size="sm"
            onClick={async () => { setLoading('confirm'); await onConfirm(actionId); setLoading(null); }}
            disabled={loading !== null}
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 rounded-xl px-4 h-8 text-[12px] font-semibold shadow-sm shadow-emerald-500/20"
          >
            {loading === 'confirm' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            Confirm
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={async () => { setLoading('cancel'); await onCancel(actionId); setLoading(null); }}
            disabled={loading !== null}
            className="gap-1.5 rounded-xl px-4 h-8 text-[12px] font-semibold border-gray-200 dark:border-white/[0.08]"
          >
            {loading === 'cancel' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <X className="w-3.5 h-3.5" />}
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
