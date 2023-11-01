import './globals.css'
import React from 'react'
import { Inter } from 'next/font/google'
import Header from '@/components/Shared/Header/Header'
import { AuthProvider } from '@/hooks/AuthProvider/AuthProvider'
import { getPath } from '@/app/actions'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Evently the app for events',
  description: 'Create and book events',
}

export default function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const pathname = getPath()
  const isMain = pathname === '/'

  return (
    <html lang="en">
      <body className={inter.className + ' overscroll-none'}>
        <AuthProvider>
          <Header path={pathname} />
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
