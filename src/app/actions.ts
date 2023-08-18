'use server'

import { cookies } from 'next/headers'

export const checkIsLogged = async () => {
  const accessToken = cookies().get('AccessToken')
  if (accessToken) {
    const authToken = accessToken.value
    const URL = process.env.API_URL

    const response = await fetch(`${URL}/auth/verifyToken`, {
      next: { tags: ['tokenVerified'] },
      headers: {
        Authorization: authToken,
      },
    })

    const { verified } = await response.json()

    return verified
  }

  return false
}

export const logout = async () => {
  console.log('logout')
  cookies().delete('AccessToken')
  cookies().delete('RefreshToken')
  cookies().delete('UserInfo')
  await fetch(`${process.env.API_URL}/auth/logout?tag=tokenVerified`)
}
