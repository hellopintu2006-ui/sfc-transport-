'use client';

import React from 'react';
import { ShieldCheck, MapPin, Eye, CheckCircle2 } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import { CTASection } from '@/components/home/CTASection';

export default function FleetPage() {
  const vehicles = [
    {
      name: "Mahindra Pik-Up",
      capacity: "1.7 Ton",
      bestFor: "Nag Load & Part Load",
      desc: "City limits ke andar heavy luggage aur quick deliveries ke liye standard carrier.",
      status: "Well Maintained",
      image: "/images/pik-up.png"
    },
    {
      name: "Tata Ace (Chota Hathi)",
      capacity: "850 Kg",
      bestFor: "Nag Load (Retail Areas)",
      desc: "Retail shop supplies ke liye best option. Chhoti galion me aasan movements.",
      status: "GPS Enabled",
      image: "/images/tata-ace.png"
    },
    {
      name: "Tata 407",
      capacity: "2.5 Ton",
      bestFor: "Full Load & Part Load",
      desc: "Industrial parts aur bulk commercial loads ke liye high durability transporter.",
      status: "Experienced Driver",
      image: "/images/tata-407.png"
    }
  ];

  const stats = [
    { title: "GPS Enabled", desc: "Vehicle routes aur current locations monitor karne ke liye tracking enabled." },
    { title: "Regular Service", desc: "All fleet trucks breakdown free service ke liye time-to-time mechanical verify hote hain." },
    { title: "Safe & Secure", desc: "Lashing belts aur high quality tarpaulin coverings ke sath full loading safety." },
    { title: "Experienced Drivers", desc: "Jaipur routes se acchi tarah waqif aur trained license-holder local drivers." }
  ];

  return (
    <div className="flex flex-col w-full font-body bg-brand-bg text-left">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-blue-800 to-slate-900 text-white py-16 text-center shrink-0">
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-3">
          Hamara Fleet
        </h1>
        <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto font-medium">
          Aapke maal ki suraksha aur timing ke liye naye aur updated vehicles
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-20 flex-1">
        
        {/* Vehicles Grid */}
        <div>
          <SectionHeader
            title="Hamare Vehicles"
            subtitle="Har shipment size aur quantity ke liye perfect matching options"
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicles.map((v, i) => (
              <Card key={i} hoverEffect className="bg-white border border-slate-100 flex flex-col justify-between p-0 overflow-hidden text-left">
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img src={v.image} alt={v.name} className="object-cover w-full h-full opacity-90" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="accent">{v.status}</Badge>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold font-heading text-slate-900">{v.name}</h3>
                      <Badge variant="primary">{v.capacity}</Badge>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mt-2">{v.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-50 text-xs">
                    <span className="text-text-secondary"><strong>Best For:</strong> {v.bestFor}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Fleet Stats */}
        <div>
          <SectionHeader
            title="Fleet Quality Indicators"
            subtitle="Maal ki suraksha aur time accuracy ko maintain karne ke liye features"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, idx) => (
              <Card key={idx} hoverEffect className="bg-white border border-slate-100/80 p-6 flex flex-col justify-between text-left">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center mb-4 text-primary font-bold">
                    ✓
                  </div>
                  <h4 className="text-base font-bold font-heading text-slate-900 mb-2">
                    {s.title}
                  </h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>

      <CTASection />
    </div>
  );
}
