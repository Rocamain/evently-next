import './globals.css';
import { Inter } from 'next/font/google';
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
        <main
          id="background-main"
          className="relative -z-1 overflow-hidden min-h-full"
        >
          <Navbar />
          {children}
          <footer
            style={{ height: '25vh', backgroundColor: 'black', color: 'white' }}
          >
            FOOTER
          </footer>
        </main>
      </body>
    </html>
  );
}
