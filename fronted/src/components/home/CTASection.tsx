'use client';

import React from 'react';
import { SITE_CONFIG } from '@/config/site.config';
import { Button } from '@/shared/ui/Button';

export const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-blue-800 to-slate-900 text-white font-body relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 flex flex-col items-center gap-6">
        <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-accent border border-white/10">
          Fast booking
        </span>
        <h2 className="text-4xl md:text-5xl font-black font-heading leading-tight tracking-tight text-white">
          Aaj Hi Book Karo
        </h2>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed">
          SFC Transport ke sath apne maal ki safe aur timely delivery secure karein. Hum daily route transport me best rates provide karte hain.
        </p>
        
        <p className="text-sm md:text-base font-bold text-accent tracking-wide uppercase">
          🕒 {SITE_CONFIG.hours.display}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mt-2">
          <Button
            variant="accent"
            size="lg"
            onClick={() => window.open(SITE_CONFIG.contact.whatsappLink, '_blank')}
            className="w-full sm:w-auto shadow-lg"
          >
            WhatsApp Karo
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open(`tel:${SITE_CONFIG.contact.phoneCall}`)}
            className="w-full sm:w-auto border-white text-white hover:bg-white/10"
          >
            Call Karo
          </Button>
        </div>
      </div>
    </section>
  );
};
export default CTASection;
