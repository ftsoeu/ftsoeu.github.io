// lib/wagmiConfig.ts
import { createConfig } from 'wagmi';
import { flare, songbird } from 'wagmi/chains'; // o wagmi/chains se li hai lì
import { http } from 'viem';

import { injected } from '@wagmi/connectors';

export const config = createConfig({
  chains: [flare, songbird],
  ssr: false,
  connectors: [injected()], // qui metterai i tuoi connettori
  transports: {
    [flare.id]: http(),
    [songbird.id]: http(),
  },
});
