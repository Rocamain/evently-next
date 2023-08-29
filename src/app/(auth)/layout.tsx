import React from 'react'

export const metadata = {
  title: 'Evently the app for events',
  description: 'Create and book events',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="overflow-hidden min-h-full">{children}</main>
}
