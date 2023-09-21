import './globals.css'
import React from 'react'
import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Shared/NavBar/Navbar'
import { AuthProvider } from '@/context/AuthProvider/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Evently the app for events',
  description: 'Create and book events',
}

const getPath = () => {
  const headersList = headers()
  const pathname = headersList.get('x-invoke-path') as string
  return pathname
}

export default function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const pathname = getPath()
  const isMain = pathname === '/'

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar path={pathname} />
          <main
            id={isMain ? 'background-blob' : undefined}
            className="min-h-full"
          >
            {props.children}
            {props.modal}
          </main>
        </AuthProvider>
        <footer
          style={{
            height: '25vh',
            backgroundColor: 'black',
            color: 'white',
          }}
        ></footer>
      </body>
    </html>
  )
}
