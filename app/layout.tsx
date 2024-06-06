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
    <html lang='en' className='h-full'>
      <body className='h-full'>
        <Header />
        {children}
      </body>
    </html>
  );
}
