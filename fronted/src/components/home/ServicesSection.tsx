'use client';

import React from 'react';
import { Truck, Package, List } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { SectionHeader } from '@/shared/ui/SectionHeader';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <Truck size={36} className="text-primary" />,
      title: "Full Load",
      desc: "Pura truck book karo, sirf aapka maal transport hoga. Koi intermediate stop nahi, seedhi aur sabse fast delivery.",
      cta: "Jano Aur",
      link: "/services#full-load"
    },
    {
      icon: <Package size={36} className="text-secondary" />,
      title: "Part Load",
      desc: "Maal kam hai? Kisi aur ke sath truck space share karo aur rate bachaao. Chhote businesses ke liye sabse budget-friendly option.",
      cta: "Jano Aur",
      link: "/services#part-load"
    },
    {
      icon: <List size={36} className="text-primary" />,
      title: "Nag Load",
      desc: "Item count ke hisab se delivery. Har ek box/cartoon alag se register hoga aur specific dukandaaron tak slip ke sath deliver kiya jayega.",
      cta: "Jano Aur",
      link: "/services#nag-load"
    }
  ];

  return (
    <section className="py-20 bg-brand-bg font-body" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Hamari Services"
          subtitle="Aapki zaroorat ke hisab se safe aur professional transport solutions"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc, i) => (
            <Card key={i} hoverEffect className="flex flex-col justify-between h-full bg-white">
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm shrink-0">
                  {svc.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-text-primary mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = svc.link}
                  className="w-full text-center text-xs tracking-wide"
                >
                  {svc.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ServicesSection;
