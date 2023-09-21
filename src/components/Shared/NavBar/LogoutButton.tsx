'use client'
import React from 'react'
import { logoutUser } from '@/app/actions'
import { useAuth } from '@/context/AuthProvider/AuthProvider'

export default function LogoutButton() {
  const auth = useAuth()

  return (
    <li>
      <form action={logoutUser}>
        <button onClick={auth.logout} type="submit">
          Logout
        </button>
      </form>
    </li>
  )
}
