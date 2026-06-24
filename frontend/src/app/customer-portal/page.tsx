import { redirect } from 'next/navigation';
import { FEATURES } from '@/config/features.config';

export default function CustomerPortalPage() {
  if (!FEATURES.CUSTOMER_PORTAL) {
    redirect('/');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-brand-bg font-body">
      <h1 className="text-3xl font-bold font-heading text-slate-900 mb-2">Customer Portal</h1>
      <p className="text-text-secondary text-sm">Customer portal features are active.</p>
    </div>
  );
}
