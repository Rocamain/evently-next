'use client'
import React from 'react'
import { logoutUser } from '@/app/actions/actions'
import { useAuth } from '@/context/AuthProvider/AuthProvider'

export default function LogoutButton() {
  const { logout } = useAuth()

  return (
    <li className="">
      <form action={logoutUser}>
        <button onClick={logout} type="submit">
          Logout
        </button>
      </form>
    </li>
  )
}
