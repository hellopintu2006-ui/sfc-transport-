import React from 'react';
import Image from 'next/image';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import { FEATURES } from '@/config/features.config';

export const GallerySection: React.FC = () => {
  if (!FEATURES.GALLERY_SECTION) return null;

  const fleet = [
    {
      name: "Mahindra Pik-Up",
      capacity: "1.7 Ton",
      bestFor: "Nag Load & Part Load",
      type: "Medium Carrier",
      desc: "City limits me quick delivery ke liye best. Sanganer aur Mansarovar routes par active.",
      status: "Well Maintained"
    },
    {
      name: "Tata Ace (Chota Hathi)",
      capacity: "850 Kg",
      bestFor: "Nag Load (Retail Deliveries)",
      type: "Micro Truck",
      desc: "Chhoti galion aur retail shops tak maal pahunchane ke liye sabse useful vehicle.",
      status: "GPS Enabled"
    },
    {
      name: "Tata 407",
      capacity: "2.5 Ton",
      bestFor: "Full Load & Part Load",
      type: "Heavy Carrier",
      desc: "Factory outlet aur warehouse supplies ke bulk orders ke liye sabse suitable truck.",
      status: "Experienced Driver"
    }
  ];

  return (
    <section className="py-20 bg-white font-body" id="fleet">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Hamara Fleet"
          subtitle="Naye aur fully functional vehicles jo aapke logistics requirements ko aasan banate hain"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fleet.map((vehicle, idx) => (
            <Card key={idx} hoverEffect className="bg-slate-50 border border-slate-100 flex flex-col justify-between text-left p-0">
              <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
                <Image
                  src="/images/hero section.png"
                  alt={vehicle.name}
                  fill
                  className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="accent">{vehicle.status}</Badge>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold font-heading text-text-primary">
                      {vehicle.name}
                    </h3>
                    <Badge variant="primary">{vehicle.capacity}</Badge>
                  </div>
                  <p className="text-xs font-semibold tracking-wider text-primary uppercase mb-3">
                    {vehicle.type}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {vehicle.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/50">
                  <p className="text-xs text-text-secondary">
                    <strong>Best For:</strong> {vehicle.bestFor}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default GallerySection;
