'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/utils/cn';

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className={cn("flex-1 flex flex-col w-full", !isHome && "pt-24 lg:pt-32")}>
      {children}
    </div>
  );
};

export default PageWrapper;