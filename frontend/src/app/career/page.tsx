'use client';

import { redirect } from 'next/navigation';
import { FEATURES } from '@/config/features.config';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import { SITE_CONFIG } from '@/config/site.config';
import { Briefcase, Milestone, Award, Coins } from 'lucide-react';

export default function CareerPage() {
  if (!FEATURES.CAREER_PAGE) {
    redirect('/');
  }

  const jobs = [
    {
      title: "HMV Driver",
      requirements: "Heavy Motor Vehicle (HMV) License, min 3 saal ka experience, clean driving track record.",
      location: "Jaipur Local Routes",
      whatsappMsg: "Hello SFC Transport, I am interested in the HMV Driver position."
    },
    {
      title: "Helper / Loader",
      requirements: "Good physical health, maal unload aur load karne me supportive, local routes se familiarity.",
      location: "VKI Warehouse & Delivery Routes",
      whatsappMsg: "Hello SFC Transport, I am interested in the Helper/Loader position."
    },
    {
      title: "Office Staff",
      requirements: "Logistics entries handle karna, basic computer/Excel knowledge, customer call attendance, VKI location reach.",
      location: "VKI Main Office",
      whatsappMsg: "Hello SFC Transport, I am interested in the Office Staff position."
    }
  ];

  const benefits = [
    { icon: <Coins className="text-success" />, title: "Regular Income", desc: "Har mahine sahi samay par direct bank deposit ya cash payment system." },
    { icon: <Milestone className="text-primary" />, title: "Daily Routes", desc: "Jaipur local routes hone ki wajah se har shaam ghar lautne ki suvidha (No long haul)." },
    { icon: <Award className="text-secondary" />, title: "Safe Environment", desc: "Fully maintained safe vehicles aur safety-oriented load management guides." },
    { icon: <Briefcase className="text-primary" />, title: "Professional Support", desc: "Direct owner connect aur experienced team members ke sath transparent work atmosphere." }
  ];

  return (
    <div className="flex flex-col w-full font-body bg-brand-bg text-left pb-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-blue-800 to-slate-900 text-white py-16 text-center shrink-0">
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-3">
          Career at SFC Transport
        </h1>
        <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto font-medium">
          Hamare growth and expanding team ke sath judiye aur ek secure future banaiye
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-20 flex-1">
        
        {/* Why work with us */}
        <div>
          <SectionHeader
            title="SFC Transport Ke Sath Kyun Kaam Karein?"
            subtitle="Hum apne drivers aur workers ko standard aur safe benefits provide karte hain"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => (
              <Card key={idx} hoverEffect className="bg-white border border-slate-100/80 p-6 flex flex-col justify-between text-left">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                    {b.icon}
                  </div>
                  <h4 className="text-base font-bold font-heading text-slate-900 mb-2">
                    {b.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Current Openings */}
        <div>
          <SectionHeader
            title="Available Vacancies"
            subtitle="Neeche diye gaye roles ke liye hum hiring kar rahe hain. Direct Apply karein."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jobs.map((job, idx) => {
              const encodedMsg = encodeURIComponent(job.whatsappMsg);
              const waLink = `https://wa.me/91${SITE_CONFIG.contact.phoneWhatsApp}?text=${encodedMsg}`;
              return (
                <Card key={idx} hoverEffect className="bg-white border border-slate-100 flex flex-col justify-between text-left p-6">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold font-heading text-slate-900">{job.title}</h3>
                      <Badge variant="primary">Active</Badge>
                    </div>
                    <p className="text-xs text-primary font-medium mb-4">📍 {job.location}</p>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      <strong>Requirements:</strong> {job.requirements}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-50">
                    <Button
                      variant="accent"
                      className="w-full py-2.5 justify-center text-xs tracking-wide"
                      onClick={() => window.open(waLink, '_blank')}
                    >
                      Apply Karo (WhatsApp)
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
