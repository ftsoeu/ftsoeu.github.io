'use client';

import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmiConfig';

export default function WagmiWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
