'use client';

import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site.config';
import { Button } from '@/shared/ui/Button';
import { SectionHeader } from '@/shared/ui/SectionHeader';

export const RoutesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white font-body" id="routes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Hamare Routes"
          subtitle="VKI (Vishwakarma Industrial Area) warehouse se in sabhi pramukh ilakon mein daily delivery"
          centered
        />

        <div className="bg-slate-900 rounded-3xl p-6 md:p-10 shadow-xl border border-slate-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side info */}
            <div className="lg:col-span-4 flex flex-col items-start gap-4">
              <span className="bg-primary/20 text-accent font-bold text-xs uppercase px-3 py-1 rounded-full tracking-wider border border-primary/30">
                Coverage Area
              </span>
              <h3 className="text-2xl md:text-3xl font-black font-heading leading-tight text-white">
                VKI Se Jaipur Ke Kone Kone Tak
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Hamara main head office aur warehouse VKI me located hai. Vahan se daily trucks in 10 major destinations par supply lekar nikalte hain.
              </p>
              <Button
                variant="accent"
                className="mt-2"
                onClick={() => window.location.href = '/contact'}
              >
                Apna Route Check Karo
              </Button>
            </div>

            {/* Right side interactive routes layout */}
            <div className="lg:col-span-8 flex flex-col gap-6 w-full">
              {/* VKI Source Node */}
              <div className="flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-3 bg-secondary px-6 py-3.5 rounded-2xl shadow-lg border border-secondary/20">
                  <MapPin size={24} className="text-white animate-bounce" />
                  <div className="text-left">
                    <p className="text-xs uppercase text-red-200 tracking-widest font-semibold">Starting Hub</p>
                    <p className="text-lg font-black font-heading text-white">VKI Warehouse (V.K.I)</p>
                  </div>
                </div>
              </div>

              {/* Connecting line helper */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-600 pl-4 py-1">
                <Navigation size={14} className="transform rotate-90 text-primary animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-semibold text-slate-500">Daily Running Routes</span>
              </div>

              {/* Route Destination Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {SITE_CONFIG.routes.map((route, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/80 backdrop-blur-sm hover:bg-slate-800 hover:border-primary border border-slate-700/60 p-2.5 sm:p-3.5 rounded-xl flex items-center gap-2 sm:gap-2.5 transition-all duration-300 group shadow-md"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-slate-700/50 flex items-center justify-center text-[10px] sm:text-xs text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                      📍
                    </div>
                    <span className="text-xs sm:text-sm font-bold sm:font-semibold tracking-tight text-slate-200 group-hover:text-white break-words">
                      {route}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default RoutesSection;
