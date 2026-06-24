import React from 'react';
import { cn } from '../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'primary', children, ...props }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide select-none",
        variant === 'primary' && "bg-primary/10 text-primary",
        variant === 'secondary' && "bg-secondary/10 text-secondary",
        variant === 'accent' && "bg-accent/20 text-dark-bg",
        variant === 'success' && "bg-success/10 text-success",
        variant === 'outline' && "border border-brand-border text-text-secondary",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
