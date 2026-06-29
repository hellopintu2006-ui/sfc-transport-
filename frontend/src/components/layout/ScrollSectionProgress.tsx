'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const ScrollSectionProgress: React.FC = () => {
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Function to find logical section elements on the page
    const updateSections = () => {
      const foundSections = Array.from(document.querySelectorAll('section')) as HTMLElement[];
      setSections(foundSections);
      setTotal(foundSections.length);
    };

    updateSections();

    // Use MutationObserver to update list if DOM changes (e.g. client side navigation)
    const observer = new MutationObserver(updateSections);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sections.length === 0) return;

    // Detect which section is currently active in the viewport
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Center-focused window to accurately track active section
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sections.indexOf(entry.target as HTMLElement);
          if (index !== -1) {
            setCurrentIndex(index);
          }
        }
      });
    };

    const io = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => io.observe(section));

    return () => {
      sections.forEach((section) => io.unobserve(section));
    };
  }, [sections]);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (total < 2) return null; // Don't show if the page doesn't have multiple scrollable sections

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-4 bg-slate-950/60 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg text-white transition-opacity duration-300 font-heading">
      
      {/* Prev/Next Navigation Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => scrollToSection(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-white transition-colors cursor-pointer"
          aria-label="Previous Section"
        >
          <ArrowLeft size={14} />
        </button>
        <button
          onClick={() => scrollToSection(currentIndex + 1)}
          disabled={currentIndex === total - 1}
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-white transition-colors cursor-pointer"
          aria-label="Next Section"
        >
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Section Progress Bar */}
      <div className="w-12 h-[2px] bg-white/10 relative rounded overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-red-600 transition-all duration-300 rounded"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        />
      </div>

      {/* Counter */}
      <span className="text-xs font-bold text-slate-400">
        <span className="text-white">0{currentIndex + 1}</span> / 0{total}
      </span>

    </div>
  );
};

export default ScrollSectionProgress;
