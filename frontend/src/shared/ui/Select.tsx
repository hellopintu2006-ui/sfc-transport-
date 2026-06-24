import React from 'react';
import { cn } from '../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, options, id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <select
          id={id}
          ref={ref}
          className={cn(
            "w-full px-3 py-2 border rounded-[4px] bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all cursor-pointer",
            error ? "border-secondary focus:ring-secondary" : "border-brand-border focus:ring-primary",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-secondary font-medium">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
