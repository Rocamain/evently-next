import { cookies } from 'next/headers'
import { EventData, EventDataToSend, UserInfo } from '@/lib/interfaces'

// Function the get the Auth cookies
export const getCookiesToken = () => {
  const cookiesList = cookies()

  const authCookie = cookiesList.get('AccessToken')
  const userInfoCookie = cookiesList.get('UserInfo')

  if (authCookie?.value && userInfoCookie?.value) {
    const userInfo = JSON.parse(userInfoCookie.value) as UserInfo
    const authToken = authCookie.value

    return { authToken, userInfo }
  }
}

// Function the set the Auth cookies
export const setCookies = (
  AccessToken: string,
  RefreshToken: string,
  userInfo: UserInfo,
  ExpiresIn: number,
) => {
  const cookiesList = cookies()

  cookiesList.set('AccessToken', AccessToken, {
    maxAge: ExpiresIn,
    httpOnly: true,
  })
  cookiesList.set('RefreshToken', RefreshToken, {
    maxAge: ExpiresIn,
    httpOnly: true,
  })
  cookiesList.set('UserInfo', JSON.stringify(userInfo), {
    maxAge: ExpiresIn,
    httpOnly: true,
  })
}

export const deleteCookies = () => {
  const cookiesList = cookies()
  const authCookie = cookiesList.get('AccessToken')
  const refreshCookie = cookiesList.get('RefreshToken')
  const userInfoCookie = cookiesList.get('UserInfo')

  if (authCookie) {
    cookiesList.delete('AccessToken')
  }

  if (refreshCookie) cookiesList.delete('RefreshToken')
  if (userInfoCookie) cookiesList.delete('UserInfo')
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

type InputsNames =
  | 'eventTitle'
  | 'eventPhotos'
  | 'eventDescription'
  | 'eventTime'
  | 'eventLink'
  | 'eventPrice'

export const EventInfoFormatter = (eventData: FormData) => {
  const inputsNames: Array<InputsNames> = [
    'eventTitle',
    'eventPhotos',
    'eventDescription',
    'eventTime',
    'eventLink',
    'eventPrice',
  ]

  const data: EventDataToSend = {}
  inputsNames.forEach((inputName) => {
    if (eventData.has(inputName)) {
      const inputValue = eventData.get(inputName) as string

      data[inputName] = inputValue
    }
  })
  return data
}

export const getStringDate = (dateToConvert: Date): string => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Europe/London',
  } as const

  const stringDate = dateToConvert.toLocaleTimeString('en-GB', options)

  return stringDate
}
