'use client';

import dynamic from 'next/dynamic';
import ClientOnly from '@/components/Connect/ClientOnly';
import WagmiWrapper from '@/components/Connect/WagmiWrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const InnerConnect = dynamic(
  () => import('@/components/Connect/InnerConnect'),
  {
    ssr: false,
  }
);

export default function ConnectButton() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ClientOnly>
      <QueryClientProvider client={queryClient}>
        <WagmiWrapper>
          <InnerConnect />
        </WagmiWrapper>
      </QueryClientProvider>
    </ClientOnly>
  );
}
