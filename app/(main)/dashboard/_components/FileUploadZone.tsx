'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';

interface FileUploadZoneProps {
  classroomId: string;
  onUploadComplete: (result: unknown) => void;
}

export function FileUploadZone({ classroomId, onUploadComplete }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      alert('Only CSV and XLSX files are supported.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Maximum size is 5MB.');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('classroomId', classroomId);

      const res = await fetch('/api/ai-agent/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Upload failed');
        return;
      }

      onUploadComplete(data);
    } catch {
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [classroomId, onUploadComplete]);

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => fileRef.current?.click()}
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
        isDragging
          ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/10'
          : 'border-gray-300 dark:border-gray-700 hover:border-orange-300'
      }`}
    >
      <input
        ref={fileRef}
        type="file"
        accept=".csv,.xlsx"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
      <p className="text-sm text-gray-500">
        {isUploading ? 'Uploading...' : 'Drop CSV/XLSX file or click to upload'}
      </p>
    </div>
  );
}
