'use server'
import axios from 'axios'
import { revalidateTag } from 'next/cache'
import { notFound } from 'next/navigation'
import {
  setCookies,
  getCookiesToken,
  deleteCookies,
  userInfoFormatter,
  EventInfoFormatter,
} from '../../lib/utils'
import {
  LoginData,
  LoginResponse,
  AuthResponse,
  UserData,
  EventData,
  EventDataReceived,
} from '@/lib/interfaces'

const URL = process.env.API_URL

//  Register user function , parsed the request body and call api point to reg the user
export const registerUser = async (
  userData: UserData,
): Promise<LoginResponse> => {
  try {
    const { data } = await axios.post(`${URL}/auth/register`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    return data
  } catch (error) {
    if (axios.isAxiosError<LoginResponse>(error)) {
      const data = error.response?.data
      if (data) {
        return data
      }
    }
    return {
      message: null,
      userInfo: null,
      error: { message: 'Server is down', name: 'Server error' },
    }
  }
}

//  Login user function , parsed the request body and call api point to log the user
export const loginUser = async (
  userData: LoginData,
): Promise<LoginResponse> => {
  try {
    const { data } = await axios.post(`${URL}/auth/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const { AccessToken, RefreshToken, userInfo, ExpiresIn } = data

    // On Login success setCookies is called
    setCookies(AccessToken, RefreshToken, userInfo, ExpiresIn)
    revalidateTag('tokenVerified')

    return { message: data.message, userInfo, error: null }
  } catch (error) {
    // On Login fail remove old cookies if they exist

    if (axios.isAxiosError<LoginResponse>(error)) {
      const errorData = error.response?.data

      if (errorData) {
        return {
          message: null,
          userInfo: null,
          error: {
            message: 'Something strange has happened',
            name: 'Server error',
          },
        }
      }
    }

    return {
      message: null,
      userInfo: null,
      error: {
        message: 'Something strange has happened',
        name: 'Server error',
      },
    }
  }
}

// Logout function
export const logoutUser = () => {
  deleteCookies()
  revalidateTag('tokenVerified')
}

// Authenticate function verifies access token
export const authenticate = async (): Promise<AuthResponse> => {
  const tokens = getCookiesToken()

  if (tokens) {
    const { authToken, userInfo } = tokens

    const response = await fetch(`${URL}/auth/verifyToken`, {
      next: { tags: ['tokenVerified'] },
      headers: {
        Authorization: authToken,
      },
    })

    const body = await response.json()

    // PENDING IMPLEMENTATION FOR REFRESH TOKEN

    return { verified: body.verified, userInfo }
  }

  return { verified: false, userInfo: null }
}

// Create Event function calls the DB with token to save an Event
export const createEvent = async (eventData: FormData) => {
  const cookiesInfo = getCookiesToken()
  if (cookiesInfo) {
    const { authToken, userInfo } = cookiesInfo
    const parsedData: EventData = JSON.parse(eventData.get('data') as string)
    const eventDataWithUser = userInfoFormatter(userInfo, parsedData)
    eventData.set('data', JSON.stringify(eventDataWithUser))

    try {
      const { DB_URL } = process.env
      await axios.post(`${DB_URL}/item`, eventData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      return 'created'
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return 'bad'
      }
    }
  }

  // PENDING IMPLEMENTATION RETURN TO LOGIN
}

export const getEventData = async (
  id: string,
): Promise<EventDataReceived | undefined> => {
  const res = await fetch(`${process.env.DB_URL}/item/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const { data } = await res.json()
  if (data && Object.keys(data).length) {
    return data
  }
  // If not found redirect to not found page.

  notFound()
}

// PENDING IMPLEMENTATION

export const updateEvent = async (eventData: FormData) => {
  const isSubmit = eventData.has('submit')
  if (isSubmit) {
    eventData.delete('submit')

    const data = EventInfoFormatter(eventData)

    console.log(data)
  }
}
