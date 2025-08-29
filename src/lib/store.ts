import { createStore } from 'zustand/vanilla';

import { type Network } from './types';

export type NetworkActions = {
  handleSwitch: () => void;
};

export type NetworkStore = Network & NetworkActions;

export const FlareNetwork: Network = {
  name: 'flare',
  chainId: 14,
};

export const SongbirdNetwork: Network = {
  name: 'songbird',
  chainId: 19,
};

export const defaultInitState: Network = FlareNetwork;

export const createNetworkStore = (initState: Network = defaultInitState) => {
  return createStore<NetworkStore>()((set) => ({
    ...initState,
    handleSwitch: () =>
      set((state) =>
        state.chainId === FlareNetwork.chainId
          ? { ...state, ...SongbirdNetwork }
          : { ...state, ...FlareNetwork }
      ),
  }));
};
