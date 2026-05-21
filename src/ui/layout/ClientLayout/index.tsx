'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navigation } from '@/ui';
import { AuthProvider } from '@/store/authStore';
import { IdeasProvider } from '@/store/ideasStore';
import { styles } from './ClientLayout.style';

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isCanvas = pathname === '/nodes';

  return (
    <AuthProvider>
      <IdeasProvider>
        <Navigation />
        <main 
          className={`${isCanvas ? '' : 'xl:ml-72 pb-24 xl:pb-0'} min-h-screen relative`}
          style={styles.mainArea(isCanvas)}
        >
          {children}
        </main>
      </IdeasProvider>
    </AuthProvider>
  );
};

export default ClientLayout;
