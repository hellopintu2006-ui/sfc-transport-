import React from 'react';
import { cn } from '../utils/cn';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, centered = false, className }) => {
  return (
    <div className={cn("mb-12", centered && "text-center mx-auto max-w-2xl", className)}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-secondary font-medium font-body leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
