import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const inter = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FTSOEU',
  description: 'a Flare Network Delegation Services',
};

const isVisible = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
      {isVisible && <script src='https://unpkg.com/spacingjs' defer></script>}
    </html>
  );
}
