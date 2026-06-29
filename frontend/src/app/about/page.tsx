'use client';

import React from 'react';
import { Target, Eye, ShieldCheck, Clock, CircleDollarSign, HeartHandshake } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import { SITE_CONFIG } from '@/config/site.config';
import { CTASection } from '@/components/home/CTASection';

export default function AboutPage() {
  const values = [
    {
      icon: <Clock className="text-primary w-8 h-8" />,
      title: "Samay ki Pabandhi",
      desc: "Hum har delivery ko timeline ke andar complete karne ke liye committed hain."
    },
    {
      icon: <ShieldCheck className="text-secondary w-8 h-8" />,
      title: "Surakshit Delivery",
      desc: "Hum safely loaded vehicles aur trained drivers ke sath secure handling guarantee karte hain."
    },
    {
      icon: <CircleDollarSign className="text-success w-8 h-8" />,
      title: "Sahi Daam",
      desc: "Jaipur ke routes par sabse transparent aur customer-friendly pricing models."
    },
    {
      icon: <HeartHandshake className="text-primary w-8 h-8" />,
      title: "Customer Pehle",
      desc: "Direct support aur fast resolution. Hum customer satisfaction ko priority dete hain."
    }
  ];

  return (
    <div className="flex flex-col w-full font-body bg-brand-bg text-left">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-blue-800 to-slate-900 text-white py-16 text-center shrink-0">
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-3">
          SFC Transport ke Baare Mein
        </h1>
        <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto font-medium">
          {SITE_CONFIG.fullName}
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-20 flex-1">
        {/* Story */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-extrabold font-heading text-secondary">
              Hamari Kahani
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              Saini Freight Carrier (SFC) Transport ki shuruaat Jaipur ke VKI (Vishwakarma Industrial Area) se hui. Hamara ek hi sankalp tha - local businesses aur suppliers ko ek aisi reliable service dena jo bina delay ke, sahi daam me unka maal sahi jagah pahunchaye.
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              Aaj hum Jaipur ke 10+ major route connections par daily basis par service run karte hain. Sitapura Industrial Area se lekar Vatika, Sanganer aur Tonk Road ke commercial markets tak, hamare trucks har roz businesses ko connect karte hain. Hamari specialized Nag Load service ne local retailers ka transport asan banaya hai.
            </p>
          </div>
          <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl bg-slate-900 overflow-hidden shadow-lg border border-slate-200">
            <img
              src="/images/hero section.png"
              alt="SFC Transport Warehouse Work"
              className="object-cover w-full h-full opacity-90"
            />
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card hoverEffect className="bg-white flex gap-4 p-8 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
              <Target className="text-secondary w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">Hamara Mission</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                "Samay par, Surakshit, Sasti Transport" - Hamara mission hai har ek small business aur corporate house ko ek reliable, fast aur completely safe transport system provide karna, taaki unhe logistics ki chinta na karni pade.
              </p>
            </div>
          </Card>

          <Card hoverEffect className="bg-white flex gap-4 p-8 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
              <Eye className="text-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-slate-900 mb-2">Hamara Vision</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                VKI se shuru hokar pure Jaipur aur aaspas ke districts me sabse trusted aur tech-friendly transport company banana. Hum aane wale samay me pricing, route efficiency, aur tracking ko aasan banakar client experience ko behtar karna chahte hain.
              </p>
            </div>
          </Card>
        </section>

        {/* Values */}
        <section>
          <SectionHeader
            title="Hamare Siddhant (Values)"
            subtitle="Inhi chaar stambho par tika hai hamara vishwas aur hamari service quality"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Card key={i} hoverEffect className="bg-white text-center flex flex-col items-center p-6 border border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h4 className="text-base font-bold font-heading text-text-primary mb-2">
                  {v.title}
                </h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {v.desc}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <CTASection />
    </div>
  );
}
