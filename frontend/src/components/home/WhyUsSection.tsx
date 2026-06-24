import React from 'react';
import { Clock, Map, Shield, CheckCircle2, Boxes, PhoneCall } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { SectionHeader } from '@/shared/ui/SectionHeader';

export const WhyUsSection: React.FC = () => {
  const features = [
    {
      icon: <Clock className="text-secondary w-6 h-6" />,
      title: "Daily Service",
      desc: "Bina kisi rukaawat ke daily pickup aur delivery. Hamare trucks roz routes par chalte hain."
    },
    {
      icon: <Map className="text-primary w-6 h-6" />,
      title: "10+ Routes",
      desc: "Jaipur ke sabhi pramukh industrial aur commercial areas jaise Sitapura, Vatika, aur Sanganer covered."
    },
    {
      icon: <Shield className="text-success w-6 h-6" />,
      title: "Safe Delivery",
      desc: "Aapke maal ki suraksha hamari zimmewari. Loading se unloading tak careful handling."
    },
    {
      icon: <CheckCircle2 className="text-primary w-6 h-6" />,
      title: "On Time",
      desc: "Hum samay ki pabandhi ko prioritize karte hain taaki aapka business bina rukaawat ke chalta rahe."
    },
    {
      icon: <Boxes className="text-secondary w-6 h-6" />,
      title: "Nag Load Available",
      desc: "Dukandaaron ke liye ek-ek item count karke verify karwana aur safely drop karwane ki service."
    },
    {
      icon: <PhoneCall className="text-success w-6 h-6" />,
      title: "Direct Contact",
      desc: "Owner aur team se direct baat karein. No call center delay, seedha updates payein."
    }
  ];

  return (
    <section className="py-20 bg-brand-bg font-body" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Kyun Chune SFC Transport?"
          subtitle="Jaipur ki sabse bharosemand aur experienced freight carrier service"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <Card key={idx} hoverEffect className="bg-white border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0 shadow-sm">
                {feat.icon}
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold font-heading text-text-primary mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WhyUsSection;
