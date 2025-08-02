'use client';

import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { injected } from '@wagmi/connectors';

export default function InnerConnect() {
  const { address, isConnected } = useAccount();

  const { connectAsync } = useConnect(); // usa `connectAsync` per await

  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const handleConnectAndSign = async () => {
    try {
      const data = await connectAsync({ connector: injected() });
      const account = data.accounts[0];
      const cDate = new Date().toISOString();
      const cSource = window.location.origin;
      const message = `Login to FtsoEU\nDomain: ${cSource}\nAddress: ${account}\nTime: ${cDate}`;
      const signature = await signMessageAsync({ message });

      const body = new URLSearchParams();
      body.append('address', account);
      body.append('source', cSource);
      body.append('time', cDate);
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
          <button
            className='font-thin ml-2 pt-1 text-sm'
            onClick={() => disconnect()}
          >
            DISCONNECT
          </button>
        </>
      ) : (
        <button
          className='font-thin ml-2 pt-1 text-sm'
          onClick={handleConnectAndSign}
        >
          CONNECT
        </button>
      )}
    </div>
  );
}
