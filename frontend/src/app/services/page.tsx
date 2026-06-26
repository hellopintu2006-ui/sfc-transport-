'use client';

import React from 'react';
import { Truck, Package, Boxes } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import { CTASection } from '@/components/home/CTASection';
import { SITE_CONFIG } from '@/config/site.config';

export default function ServicesPage() {
  const routesData = [
    { name: "Sitapura", distance: "~25 KM", services: ["Full Load", "Part Load", "Nag Load"] },
    { name: "Vatika", distance: "~30 KM", services: ["Full Load", "Part Load", "Nag Load"] },
    { name: "Sanganer", distance: "~20 KM", services: ["Full Load", "Part Load", "Nag Load"] },
    { name: "Tonk Road", distance: "~18 KM", services: ["Full Load", "Part Load"] },
    { name: "Goner", distance: "~28 KM", services: ["Full Load", "Part Load"] },
    { name: "Shivdaspura", distance: "~32 KM", services: ["Full Load", "Part Load"] },
    { name: "Beelwa", distance: "~26 KM", services: ["Full Load", "Part Load"] },
    { name: "Chaksu", distance: "~40 KM", services: ["Full Load", "Part Load"] },
    { name: "Mansarovar", distance: "~15 KM", services: ["Full Load", "Part Load", "Nag Load"] },
    { name: "Pratap Nagar", distance: "~22 KM", services: ["Full Load", "Part Load", "Nag Load"] },
  ];

  return (
    <div className="flex flex-col w-full font-body bg-brand-bg text-left">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-blue-800 to-slate-900 text-white py-16 text-center shrink-0">
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-3">
          Hamari Transport Services
        </h1>
        <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto font-medium">
          Aapki har logistics aur transportation zaroorat ka single solution
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-24 flex-1">
        
        {/* Full Load Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="full-load">
          <div className="flex flex-col gap-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Truck size={32} className="text-primary" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-slate-900">
              Full Load Services
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              Agar aapki shipment badi hai ya aap bulk materials bhejna chahte hain, toh Full Load sabse best option hai. Isme poora truck sirf aapke maal ke liye book hota hai.
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              Koi intermediate stop nahi hota, maal direct VKI warehouse se load hokar bina kisi rukaawat ke destination point tak pahunchta hai. Badi companies, factories aur warehouses ke liye yeh highly safe aur speed-oriented transport option hai.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="primary">Badi Company</Badge>
              <Badge variant="primary">Factory Material</Badge>
              <Badge variant="primary">Warehouse Supply</Badge>
              <Badge variant="primary">Bulk Maal</Badge>
            </div>
            <div className="mt-4">
              <Button variant="outline" onClick={() => window.open(`tel:${SITE_CONFIG.contact.phoneCall}`)}>
                Call For Rates
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <img src="/images/full-load.png" alt="Full Load Truck" className="object-cover w-full h-full" />
          </div>
        </div>

        {/* Part Load Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse" id="part-load">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-md lg:order-last">
            <img src="/images/hero section.png" alt="Part Load Packages" className="object-cover w-full h-full" />
          </div>
          <div className="flex flex-col gap-5 lg:order-first">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
              <Package size={32} className="text-secondary" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-slate-900">
              Part Load Services
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              Maal kam hai? Poore truck ki zaroorat nahi hai? Toh Part Load aapke liye sabse best aur cost-effective option hai. Isme aapko poore truck ka paisa nahi dena padta, sirf jitna space aapka maal gherta hai, utne ka hi charges lagta hai.
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              Jaipur ke sabhi standard commercial and industrial areas me daily sharing services. Chhoti dukaano aur medium businesses ke liye yeh sabse zyada budget-friendly option hai.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary">Chhoti Dukaan</Badge>
              <Badge variant="secondary">Kam Maal</Badge>
              <Badge variant="secondary">Budget Delivery</Badge>
              <Badge variant="secondary">Sharing Space</Badge>
            </div>
            <div className="mt-4">
              <Button variant="outline" onClick={() => window.open(`tel:${SITE_CONFIG.contact.phoneCall}`)}>
                Call For Rates
              </Button>
            </div>
          </div>
        </div>

        {/* Nag Load Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="nag-load">
          <div className="flex flex-col gap-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Boxes size={32} className="text-primary" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-slate-900">
              Nag Load (Item Count Delivery)
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              Nag Load hamari specialized delivery service hai. Isme hum ek-ek item count karke verify karte hain aur delivery slip banate hain. Jaise ki Vatika area me 2000 dukaane hain, toh har dukaan ka specific cartoon aur item count proper list ke sath deliver hota hai.
            </p>
            
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 space-y-4">
              <h4 className="font-bold text-slate-900 text-sm tracking-wide uppercase">How It Works:</h4>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                  <p className="text-text-secondary">Aapka maal VKI warehouse par receive hota hai.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                  <p className="text-text-secondary">Har shop ke liye specific item/cartoon count kiya jata hai.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                  <p className="text-text-secondary">Proper count details ke sath verification delivery slip banti hai.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
                  <p className="text-text-secondary">Ek-ek shop par count verify karwake delivery complete ki jati hai.</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="primary">Retail Area Supply</Badge>
              <Badge variant="primary">Multiple Shops Drop</Badge>
              <Badge variant="primary">Item Verification</Badge>
              <Badge variant="primary">Vatika & Sanganer</Badge>
            </div>
            <div className="mt-4">
              <Button variant="outline" onClick={() => window.open(SITE_CONFIG.contact.whatsappLink, '_blank')}>
                Apni Route Ka Rate Jaano
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <img src="/images/hero section.png" alt="Nag Load boxes" className="object-cover w-full h-full" />
          </div>
        </div>

        {/* Routes Table */}
        <div id="routes-table" className="pt-8">
          <SectionHeader
            title="Kaun Se Routes Cover Karte Hain"
            subtitle="Jaipur ke routes aur available services ki details"
            centered
          />
          
          <div className="bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Route Name</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Distance from VKI</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Available Services</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 text-sm">
                  {routesData.map((route, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-900 flex items-center gap-2">
                        <span>📍</span> {route.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-text-secondary">
                        {route.distance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1.5">
                          {route.services.map((svc, idx) => (
                            <span
                              key={idx}
                              className={`px-2.5 py-0.5 rounded text-xs font-medium ${
                                svc === 'Full Load' ? 'bg-blue-50 text-primary border border-blue-100' :
                                svc === 'Part Load' ? 'bg-red-50 text-secondary border border-red-100' :
                                'bg-green-50 text-success border border-green-100'
                              }`}
                            >
                              {svc}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <CTASection />
    </div>
  );
}
