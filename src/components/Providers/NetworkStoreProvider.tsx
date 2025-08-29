'use client';

import { createNetworkStore, NetworkStore } from '@/lib/store';
import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

export type NetworkStoreApi = ReturnType<typeof createNetworkStore>;

export interface NetworkStoreProviderProps {
  children: ReactNode;
}

export const NetworkStoreContext = createContext<NetworkStoreApi | undefined>(
  undefined
);

export const NetworkStoreProvider = ({
  children,
}: NetworkStoreProviderProps) => {
  const storeRef = useRef<NetworkStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createNetworkStore();
  }

  return (
    <NetworkStoreContext.Provider value={storeRef.current}>
      {children}
    </NetworkStoreContext.Provider>
  );
};

export const useNetworkStore = <T,>(
  selector: (store: NetworkStore) => T
): T => {
  const networkStoreContext = useContext(NetworkStoreContext);

  if (!networkStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(networkStoreContext, selector);
};
