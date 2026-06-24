import React from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, type = 'text', id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            "w-full px-3 py-2 border rounded-[4px] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all",
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

Input.displayName = 'Input';
