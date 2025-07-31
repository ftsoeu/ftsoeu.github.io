import { create } from 'zustand';

interface WalletState {
  address?: `0x${string}`;
  setAddress: (addr?: `0x${string}`) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: undefined,
  setAddress: (addr) => set({ address: addr }),
}));
