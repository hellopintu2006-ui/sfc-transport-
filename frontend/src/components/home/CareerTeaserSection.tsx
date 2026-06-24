'use client';

import React from 'react';
import { Briefcase } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { FEATURES } from '@/config/features.config';

export const CareerTeaserSection: React.FC = () => {
  if (!FEATURES.CAREER_PAGE) return null;

  return (
    <section className="bg-slate-50 border-t border-b border-slate-200/60 py-6 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3 justify-center sm:justify-start">
          <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center shrink-0">
            <Briefcase size={20} />
          </div>
          <div>
            <h4 className="font-heading font-bold text-slate-900 text-base">
              Driver ya Staff chahiye? Career dekho
            </h4>
            <p className="text-xs text-text-secondary mt-0.5">
              SFC Transport ke sath regular income aur daily route driving roles ke liye apply karein.
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => window.location.href = '/career'}
          className="shrink-0 text-xs px-5 py-2.5 bg-secondary hover:bg-secondary/95 font-semibold border-0"
        >
          Career Opportunities
        </Button>
      </div>
    </section>
  );
};
export default CareerTeaserSection;
