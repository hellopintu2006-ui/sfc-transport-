import React from 'react';

export const StatsSection: React.FC = () => {
  const stats = [
    { value: '10+', label: 'Routes Covered', desc: 'VKI se Sitapura, Vatika aur Jaipur ke har kone tak' },
    { value: 'Daily', label: 'Service Running', desc: 'Bina kisi chhuti ke, lagatar daily transport' },
    { value: '10 AM - 11 PM', label: 'Working Hours', desc: 'Daily support aur continuous updates' },
    { value: '3 Modes', label: 'Full / Part / Nag Load', desc: 'Aapke budget aur requirements ke anusar' }
  ];

  return (
    <section className="bg-primary text-white font-body py-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-blue-500/30">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4 pt-4 first:pt-0 lg:pt-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-accent leading-none">
                {stat.value}
              </span>
              <span className="text-base font-bold font-heading mt-2">
                {stat.label}
              </span>
              <span className="text-xs text-blue-100 mt-1 max-w-xs">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default StatsSection;
