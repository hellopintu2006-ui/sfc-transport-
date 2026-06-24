'use client';

import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, MapPin, Clock, Send } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/Textarea';
import { Select } from '@/shared/ui/Select';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { SITE_CONFIG } from '@/config/site.config';
import { toast } from '@/shared/hooks/useToast';
import { contactService } from '@/services/contact.service';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Rate Poochho',
    message: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const subjectOptions = [
    { value: 'Rate Poochho', label: 'Rate Poochho (Get Rates)' },
    { value: 'Booking', label: 'Booking Request' },
    { value: 'Complaint', label: 'Complaint / Feedback' },
    { value: 'Other', label: 'Other Inquiry' }
  ];

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = 'Valid 10-digit phone number is required';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const key = id === 'email' ? 'email' : id === 'name' ? 'name' : id === 'phone' ? 'phone' : id === 'subject' ? 'subject' : 'message';
    
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      subject: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await contactService.submit(formData);
      toast.success(res.message || 'Message sent successfully!');
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'Rate Poochho',
        message: ''
      });
      setErrors({});
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full font-body bg-brand-bg text-left pb-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-blue-800 to-slate-900 text-white py-16 text-center shrink-0">
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-3">
          Humse Sampark Karo
        </h1>
        <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto font-medium">
          Koi bhi sawaal ya booking enquiries - seedha humse baat karo
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-12 flex-1">
        
        {/* Section 2 - Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card hoverEffect className="bg-white border border-slate-100 p-6 flex flex-col items-center text-center gap-4">
            <span className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center text-xl shrink-0">
              💬
            </span>
            <div>
              <h3 className="font-heading font-bold text-slate-900">WhatsApp Karo</h3>
              <p className="text-sm text-text-secondary mt-1">{SITE_CONFIG.contact.phoneWhatsApp}</p>
            </div>
            <Button
              variant="accent"
              size="sm"
              onClick={() => window.open(SITE_CONFIG.contact.whatsappLink, '_blank')}
              className="mt-2 w-full justify-center bg-success text-white hover:bg-success/90"
            >
              WhatsApp Open Karo
            </Button>
          </Card>

          <Card hoverEffect className="bg-white border border-slate-100 p-6 flex flex-col items-center text-center gap-4">
            <span className="w-12 h-12 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xl shrink-0">
              📞
            </span>
            <div>
              <h3 className="font-heading font-bold text-slate-900">Call Karo</h3>
              <p className="text-sm text-text-secondary mt-1">
                {SITE_CONFIG.contact.phoneWhatsApp} / {SITE_CONFIG.contact.phoneCall}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`tel:${SITE_CONFIG.contact.phoneCall}`)}
              className="mt-2 w-full justify-center"
            >
              Abhi Call Karo
            </Button>
          </Card>

          <Card hoverEffect className="bg-white border border-slate-100 p-6 flex flex-col items-center text-center gap-4">
            <span className="w-12 h-12 rounded-full bg-secondary/15 text-secondary flex items-center justify-center text-xl shrink-0">
              ✉️
            </span>
            <div>
              <h3 className="font-heading font-bold text-slate-900">Email Karo</h3>
              <p className="text-sm text-text-secondary mt-1 truncate max-w-[200px] sm:max-w-none">
                {SITE_CONFIG.contact.email}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`mailto:${SITE_CONFIG.contact.email}`)}
              className="mt-2 w-full justify-center border-secondary text-secondary hover:bg-secondary/5"
            >
              Email Bhejo
            </Button>
          </Card>
        </div>

        {/* Section 3 - Contact Form + Info (2-column layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Left */}
          <div className="lg:col-span-7">
            <Card className="bg-white border border-slate-200/80 p-6 md:p-8">
              <h3 className="text-2xl font-bold font-heading text-slate-900 mb-6">Enquiry Send Karein</h3>
              
              {success ? (
                <div className="bg-success/10 border border-success/30 rounded-xl p-6 text-center text-slate-800 space-y-4">
                  <span className="text-3xl">🎉</span>
                  <h4 className="text-lg font-bold text-success font-heading">Message Sent successfully!</h4>
                  <p className="text-sm text-text-secondary">
                    Hum jald hi contact karenge! Aapke inquiries receive ho gaye hain.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSuccess(false)} className="mt-2">
                    Naya Message Send Karo
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      id="name"
                      label="Aapka Naam (Required)"
                      placeholder="Naam likhein"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                    />
                    <Input
                      id="phone"
                      label="Mobile Number (Required)"
                      placeholder="10-digit number"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      error={errors.phone}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      id="email"
                      label="Email ID (Optional)"
                      placeholder="Email address"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                    <Select
                      id="subject"
                      label="Subject"
                      options={subjectOptions}
                      value={formData.subject}
                      onChange={handleSelectChange}
                    />
                  </div>

                  <Textarea
                    id="message"
                    label="Maal Aur Destination details (Required)"
                    placeholder="Kis type ka maal hai? Kahan se kahan bhejna hai?"
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                  />

                  <Button type="submit" variant="primary" isLoading={loading} className="w-full justify-center gap-1.5 py-3">
                    <Send size={16} /> Message Bhejo
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Info Right */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-white border border-slate-200/80 p-6 space-y-6 text-slate-800 text-sm">
              <h3 className="text-xl font-bold font-heading text-slate-900 border-b border-slate-100 pb-3">SFC Transport Address</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="text-lg mt-0.5">📍</span>
                  <div>
                    <p className="font-bold text-slate-900">VKI Office & Warehouse</p>
                    <p className="text-text-secondary leading-relaxed mt-1">
                      {SITE_CONFIG.address.line1},<br />
                      {SITE_CONFIG.address.line2},<br />
                      {SITE_CONFIG.address.area}, Jaipur - {SITE_CONFIG.address.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="text-lg mt-0.5">⏰</span>
                  <div>
                    <p className="font-bold text-slate-900">Working Hours</p>
                    <p className="text-text-secondary leading-relaxed mt-1">{SITE_CONFIG.hours.display}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{SITE_CONFIG.hours.days}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="text-lg mt-0.5">🚚</span>
                  <div className="w-full">
                    <p className="font-bold text-slate-900 mb-2">Pramukh Routes</p>
                    <div className="flex flex-wrap gap-1.5">
                      {SITE_CONFIG.routes.map((route, i) => (
                        <Badge key={i} variant="outline" className="bg-slate-50 text-[10px]">{route}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map Embed */}
            <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[260px] relative bg-slate-100">
              <iframe
                title="SFC Transport VKI Jaipur"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.5126868874136!2d75.768652!3d26.966453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c2db53ffffff%3A0x8f3c7b39678e7bbd!2sVishwakarma+Industrial+Area%2C+Jaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Sticky Quick Contact Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 grid grid-cols-2 shadow-2xl overflow-hidden h-14">
        <a
          href={SITE_CONFIG.contact.whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-success text-white font-bold text-sm hover:bg-success/95"
        >
          <span>💬</span> WhatsApp
        </a>
        <a
          href={`tel:${SITE_CONFIG.contact.phoneCall}`}
          className="flex items-center justify-center gap-2 bg-primary text-white font-bold text-sm hover:bg-primary/95"
        >
          <span>📞</span> Call Karo
        </a>
      </div>
    </div>
  );
}
