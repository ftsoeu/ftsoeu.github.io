'use client';

import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { injected } from '@wagmi/connectors';
import { useEffect } from 'react';
import axios from 'axios';

export default function InnerConnect() {
  const { address, isConnected } = useAccount();

  const { connectAsync } = useConnect(); // usa `connectAsync` per await

  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const handleConnectAndSign = async () => {
    try {
      const data = await connectAsync({ connector: injected() });
      const account = data.accounts[0];
      const message = `Login to FtsoEU\nDomain: ${
        window.location.origin
      }\nAddress: ${account}\nTime: ${new Date().toISOString()}`;
      const signature = await signMessageAsync({ message });

      const body = new URLSearchParams();
      body.append('address', account);
      body.append('message', message);
      body.append('signature', signature);

      fetch(
        `https://webdata.ftso.eu/flows/trigger/e6409462-67e0-499d-9e20-67172cf65f87?${body.toString()}`,
        {
          method: 'POST',
          body: JSON.stringify(body),
        }
      );

      console.log('Login con firma completato');
    } catch (err) {
      console.error('Errore durante connect + sign:', err);
    }
  };

  return (
    <div>
      {isConnected ? (
        <>
          <p>{address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
        </>
      ) : (
        <button onClick={handleConnectAndSign}>Connect & Sign</button>
      )}
    </div>
  );
}
