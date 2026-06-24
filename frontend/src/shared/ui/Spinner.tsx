import React from 'react';
import { cn } from '../utils/cn';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className }) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-t-transparent border-primary border-2",
        size === 'sm' && "h-4 w-4 border-[2px]",
        size === 'md' && "h-8 w-8 border-[3px]",
        size === 'lg' && "h-12 w-12 border-[4px]",
        className
      )}
    />
  );
};
