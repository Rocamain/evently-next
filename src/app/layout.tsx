import './globals.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Navbar from '@/components/Shared/NavBar/Navbar';
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
        <div className="relative z-0 overflow-hidden">
          <Image
            src="/images/blob/pink-blob.svg"
            alt="pink blob background image"
            className="absolute top-[15%] right-[-60%] sm:h-auto sm:left-[40%] sm:top-[15%]"
            width={300}
            height={300}
          />
          <Image
            src="/images/blob/blue-blob.svg"
            alt="blue blob background image"
            className="absolute top-[-15%] right-[-15%] sm:h-auto sm:left-[45%] sm:top-[10%] sm:rotate-45"
            width={300}
            height={300}
          />

          <Image
            src="/images/blob/yellow-blob.svg"
            alt="yellow blob background image"
            className="absolute top-[65%] right-[50%] sm:h-auto sm:left-[75%] sm:top-[40%]"
            width={300}
            height={300}
          />

          <Navbar />
          {children}
          <footer
            style={{ height: '25vh', backgroundColor: 'black', color: 'white' }}
          >
            FOOTER
          </footer>
        </div>
      </body>
    </html>
  );
}
