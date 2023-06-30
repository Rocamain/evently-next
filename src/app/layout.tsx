import './globals.css';
import { Inter } from 'next/font/google';

import Navbar from '@/components/NavBar/Navbar';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Evently the app for events',
  description: 'Create and book events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
