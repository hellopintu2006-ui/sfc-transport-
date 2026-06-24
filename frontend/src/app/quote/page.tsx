import { redirect } from 'next/navigation';
import { FEATURES } from '@/config/features.config';

export default function QuotePage() {
  if (!FEATURES.QUOTE_SYSTEM) {
    redirect('/');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-brand-bg font-body">
      <h1 className="text-3xl font-bold font-heading text-slate-900 mb-2">Quote Request</h1>
      <p className="text-text-secondary text-sm">Quote system is active.</p>
    </div>
  );
}
