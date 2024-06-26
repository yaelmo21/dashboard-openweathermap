import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components';

export const metadata: Metadata = {
  title: 'Dashboard OpenWeatherMap',
  description: 'Dashboard OpenWeatherMap',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es' className='h-full pt-safe'>
      <body className='h-full'>
        <Header />
        <main className='h-full pt-16 overflow-y-auto'>{children}</main>
      </body>
    </html>
  );
}
