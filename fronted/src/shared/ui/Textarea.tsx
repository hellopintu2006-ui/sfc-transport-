import React from 'react';
import { cn } from '../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={cn(
            "w-full px-3 py-2 border rounded-[4px] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[100px] resize-y",
            error ? "border-secondary focus:ring-secondary" : "border-brand-border focus:ring-primary",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-secondary font-medium">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
