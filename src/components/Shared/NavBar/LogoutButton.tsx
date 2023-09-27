'use client'
import React from 'react'
import { logoutUser } from '@/app/actions'
import { useAuth } from '@/hooks/AuthProvider/AuthProvider'

export default function LogoutButton() {
  const auth = useAuth()

  return (
    <li>
      <form action={logoutUser}>
        <button
          className="text-lg
      p-2 px-3 hover:text-teal-500 font-medium whitespace-nowrap"
          onClick={auth.logout}
          type="submit"
        >
          Logout
        </button>
      </form>
    </li>
  )
}
