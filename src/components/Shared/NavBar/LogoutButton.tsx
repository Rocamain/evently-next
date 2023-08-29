'use client'
import React from 'react'
import { useAuth } from '@/components/Shared/AuthProvider/AuthProvider'

export default function LogoutButton() {
  const { isAuthenticated, logout, isMounted } = useAuth()

  if (isMounted && isAuthenticated) {
    return (
      <li className="">
        <button onClick={logout}>Logout</button>
      </li>
    )
  }

  return null
}
