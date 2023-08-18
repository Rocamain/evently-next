import './globals.css'
import React from 'react'
import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Shared/NavBar/Navbar'
import { AuthProvider } from '@/components/Shared/AuthProvider/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Evently the app for events',
  description: 'Create and book events',
}

const getPath = () => {
  const headersList = headers()
  const pathname = headersList.get('x-invoke-path') || ''
  return pathname
}

export default function RootLayout({
  children,
  random,
}: {
  children: React.ReactNode
  random: number
}) {
  const pathname = getPath()

  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          id={pathname === '/' ? 'background-main' : undefined}
          className="relative -z-1 overflow-hidden min-h-full"
        >
          <AuthProvider>
            <Navbar path={pathname} />
            {children}
          </AuthProvider>
          <footer
            style={{ height: '25vh', backgroundColor: 'black', color: 'white' }}
          >
            {random}
          </footer>
        </main>
      </body>
    </html>
  )
}
