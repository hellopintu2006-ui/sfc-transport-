'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={cn(
          "relative bg-white w-full max-w-lg rounded-[8px] border border-brand-border shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh] z-10 font-body",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-brand-border mb-4">
          <h3 className="text-xl font-bold text-text-primary font-heading">
            {title || 'Dialog'}
          </h3>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
};
