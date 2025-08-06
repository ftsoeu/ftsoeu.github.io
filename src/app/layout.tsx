import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/Navbar/NavBar';
import MobileList from '@/components/Navbar/MobileList';
import Footer from '@/components/Footer/Footer';
import { headers } from 'next/headers';
import { TooltipProvider } from '@/components/ui/tooltip';

import Script from 'next/script';

const inter = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FTSOEU',
  description: 'a Flare Network Delegation Services',
};

const isVisible = false;

export default function RootLayout({
  children,
  nonce,
}: {
  children: React.ReactNode;
  nonce?: string;
}) {
  //const nonce = headers().get('X-CSP-Nonce') || '';

  return (
    <html lang='en'>
      <head></head>
      <body className={inter.className}>
        <div className='absolute w-full h-full'>
          <NavBar />
          <MobileList />
          <TooltipProvider>{children}</TooltipProvider>
          <Footer />
        </div>
      </body>
      <Script nonce={nonce} />
      {isVisible && (
        <Script src='https://unpkg.com/spacingjs' nonce={nonce} defer />
      )}
    </html>
  );
}
