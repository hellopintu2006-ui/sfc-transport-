'use client';

import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { cn } from '../utils/cn';

export const ToastContainer: React.FC = () => {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full px-4 md:px-0 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "p-4 rounded-[6px] shadow-lg border text-white flex items-start gap-3 pointer-events-auto transition-all duration-300 font-body text-sm",
            t.type === 'success' && "bg-success border-success/20",
            t.type === 'error' && "bg-secondary border-secondary/20",
            t.type === 'info' && "bg-primary border-primary/20"
          )}
        >
          {t.type === 'success' && <CheckCircle size={18} className="shrink-0 mt-0.5" />}
          {t.type === 'error' && <AlertCircle size={18} className="shrink-0 mt-0.5" />}
          {t.type === 'info' && <Info size={18} className="shrink-0 mt-0.5" />}
          
          <div className="flex-1">{t.message}</div>
          
          <button
            onClick={() => dismiss(t.id)}
            className="text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
