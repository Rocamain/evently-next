import { cookies } from 'next/headers'
import { UserInfo, EventData, EventDataToSend } from '@/lib/interfaces'

// Function the get the Auth cookies
export const getCookiesToken = () => {
  const authCookie = cookies().get('AccessToken')
  const userInfoCookie = cookies().get('UserInfo')
  if (authCookie && userInfoCookie) {
    const userInfo = JSON.parse(userInfoCookie.value)
    const authToken = authCookie.value

    return { authToken, userInfo }
  }
  return null
}

// Function the set the Auth cookies
export const setCookies = (
  AccessToken: string,
  RefreshToken: string,
  userInfo: UserInfo,
  ExpiresIn: number,
) => {
  cookies().set('AccessToken', AccessToken, {
    maxAge: ExpiresIn,
    httpOnly: true,
  })
  cookies().set('RefreshToken', RefreshToken, {
    maxAge: ExpiresIn,
    httpOnly: true,
  })
  cookies().set('UserInfo', JSON.stringify(userInfo), {
    maxAge: ExpiresIn,
    httpOnly: true,
  })
}

export const deleteCookies = () => {
  const authCookie = cookies().get('AccessToken')
  const refreshCookie = cookies().get('RefreshToken')
  const userInfoCookie = cookies().get('UserInfo')

  if (authCookie) cookies().delete('AccessToken')
  if (refreshCookie) cookies().delete('RefreshToken')
  if (userInfoCookie) cookies().delete('UserInfo')
}

export const userInfoFormatter = (
  userInfo: UserInfo,
  eventData: EventData,
): EventDataToSend => {
  const owner = {
    eventOwnerId: userInfo.sub,
    eventOwnerName: `${userInfo.name} ${userInfo.family_name}`,
    eventOwnerEmail: userInfo.email,
  }

  return { ...owner, ...eventData }
}
