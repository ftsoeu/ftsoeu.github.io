'use client';
import { WagmiProvider } from 'wagmi';
import { config } from '@/lib/wagmiConfig';

export function WagmiWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
import { injected, useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWalletStore } from '@/lib/zustand';
import { useEffect, useState } from 'react';

export default function ConnectButton() {
  const { address, isConnected } = useAccount();
  const connect = useConnect();
  const disconnect = useDisconnect();
  const setAddress = useWalletStore((s) => s.setAddress);

  if (address) setAddress(address);

  return (
    <div>
      <WagmiWrapper>
        {isConnected ? (
          <>
            <p>Connected: {address}</p>
            <button onClick={() => disconnect.disconnect()}>Disconnect</button>
          </>
        ) : (
          <button onClick={() => connect.connect({ connector: injected() })}>
            Connect Wallet
          </button>
        )}
      </WagmiWrapper>
    </div>
  );
}
