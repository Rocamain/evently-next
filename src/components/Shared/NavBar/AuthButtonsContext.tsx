'use client'
import React from 'react'
import { useAuth } from '@/components/Shared/AuthProvider/AuthProvider'

export default function AuthButtonsContext({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isMounted } = useAuth()

  if (isMounted && !isAuthenticated) {
    return children
  }

  return null
}
