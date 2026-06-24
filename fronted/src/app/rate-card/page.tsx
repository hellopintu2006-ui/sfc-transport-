'use client';

import React from 'react';
import { SITE_CONFIG } from '@/config/site.config';
import { FEATURES } from '@/config/features.config';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import { CTASection } from '@/components/home/CTASection';
import { MessageSquare, Phone, Scale, Milestone, Truck, Percent } from 'lucide-react';

export default function RateCardPage() {
  const routesRateData = [
    { route: "Sitapura", fullLoad: "Custom", partLoad: "Custom", nagLoad: "Per Item Count" },
    { route: "Vatika", fullLoad: "Custom", partLoad: "Custom", nagLoad: "Per Item Count" },
    { route: "Sanganer", fullLoad: "Custom", partLoad: "Custom", nagLoad: "Per Item Count" },
    { route: "Tonk Road", fullLoad: "Custom", partLoad: "Custom", nagLoad: "N/A" },
    { route: "Goner", fullLoad: "Custom", fullLoadVal: "Custom", partLoad: "Custom", nagLoad: "N/A" },
    { route: "Shivdaspura", fullLoad: "Custom", partLoad: "Custom", nagLoad: "N/A" },
    { route: "Beelwa", fullLoad: "Custom", partLoad: "Custom", nagLoad: "N/A" },
    { route: "Chaksu", fullLoad: "Custom", partLoad: "Custom", nagLoad: "N/A" },
    { route: "Mansarovar", fullLoad: "Custom", partLoad: "Custom", nagLoad: "Per Item Count" },
    { route: "Pratap Nagar", fullLoad: "Custom", partLoad: "Custom", nagLoad: "Per Item Count" },
  ];

  const pricingFactors = [
    { icon: <Milestone className="text-primary" />, title: "Distance Base", desc: "VKI warehouse se destination distance se basic pricing decide hoti hai." },
    { icon: <Scale className="text-secondary" />, title: "Maal Ka Weight", desc: "Aapke maal ka weight aur size (volume) space allocation ko effect karta hai." },
    { icon: <Truck className="text-primary" />, title: "Service Type", desc: "Full Load, Part Load, ya Nag Load service me rate levels alag hoti hain." },
    { icon: <Percent className="text-success" />, title: "Regular Customer", desc: "Humare regular clients ke liye special discounted rates and priorities milti hain." }
  ];

  return (
    <div className="flex flex-col w-full font-body bg-brand-bg text-left">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-blue-800 to-slate-900 text-white py-16 text-center shrink-0">
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-3">
          Rate Card
        </h1>
        <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto font-medium">
          Best rates and transparent pricing model for your transport needs
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-16 flex-1">
        
        {/* Phase 1 / Phase 2 conditional logic */}
        {!FEATURES.RATE_TABLE ? (
          /* SECTION 2 - PHASE 1 (FEATURES.RATE_TABLE = false) */
          <Card className="bg-white border border-slate-200/80 p-8 md:p-12 text-center shadow-lg rounded-2xl max-w-2xl mx-auto flex flex-col items-center gap-6">
            <span className="w-16 h-16 rounded-full bg-blue-50 text-primary flex items-center justify-center text-2xl shrink-0">
              🏷️
            </span>
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-black font-heading text-slate-900">
                Best Rate Chahiye?
              </h2>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                Humare rates aapki shipment size, route aur service type par depend karte hain. Aap humse direct baat karein, hum aapko Jaipur ke routes par best competitive rate offer karenge.
              </p>
            </div>

            {/* Info Box */}
            <div className="w-full bg-slate-50 rounded-xl p-6 border border-slate-200/50 text-left grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm mt-2">
              <div>
                <p className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Full Load Rate</p>
                <p className="font-bold text-slate-900 mt-1">Custom Quote</p>
              </div>
              <div className="sm:border-x sm:border-slate-200 sm:px-4">
                <p className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Part Load Rate</p>
                <p className="font-bold text-slate-900 mt-1">Custom Quote</p>
              </div>
              <div className="sm:pl-4">
                <p className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Nag Load Rate</p>
                <p className="font-bold text-slate-900 mt-1">Per Item Count</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
              <Button
                variant="accent"
                className="w-full sm:flex-1 py-3 justify-center gap-2"
                onClick={() => window.open(SITE_CONFIG.contact.whatsappLink, '_blank')}
              >
                <MessageSquare size={18} /> WhatsApp Par Rate Poochho
              </Button>
              <Button
                variant="primary"
                className="w-full sm:flex-1 py-3 justify-center gap-2"
                onClick={() => window.open(`tel:${SITE_CONFIG.contact.phoneCall}`)}
              >
                <Phone size={18} /> Call Karo
              </Button>
            </div>
            
            <p className="text-xs text-text-secondary font-medium">
              * Working Hours: 10:00 AM - 11:00 PM Daily
            </p>
          </Card>
        ) : (
          /* SECTION 3 - PHASE 2 (FEATURES.RATE_TABLE = true) */
          <div>
            <SectionHeader
              title="Standard Route Rates"
              subtitle="Jaipur routes ke liye reference full, part aur nag load rates"
              centered
            />
            
            <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Route</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Full Load</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Part Load</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Nag Load</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100 text-sm">
                    {routesRateData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-900">
                          {item.route}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary font-medium">
                          {item.fullLoad}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary font-medium">
                          {item.partLoad}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-text-secondary font-medium">
                          {item.nagLoad}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <p className="text-sm text-center text-text-secondary font-medium">
              * Bade orders aur heavy monthly supplies par special discount milta hai. Details ke liye hume <a href={SITE_CONFIG.contact.whatsappLink} className="text-secondary font-bold hover:underline">WhatsApp</a> karein.
            </p>
          </div>
        )}

        {/* How Pricing Works */}
        <div>
          <SectionHeader
            title="Rate Kis Tarah Decide Hota Hai?"
            subtitle="Humare transparent pricing framework ko samajhein"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pricingFactors.map((factor, i) => (
              <Card key={i} hoverEffect className="bg-white border border-slate-100 p-6 flex gap-4 text-left">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  {factor.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold font-heading text-slate-900 mb-1.5">{factor.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{factor.desc}</p>
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
