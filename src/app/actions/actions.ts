'use server'
import axios from 'axios'
import {
  setCookies,
  getCookiesToken,
  deleteCookies,
  userInfoFormatter,
} from './utils/utils'
import {
  LoginData,
  LoginResponse,
  AuthResponse,
  UserData,
  EventData,
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
    return { error: { message: 'Server is down', name: 'Server error' } }
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

    return { message: data.message }
  } catch (error) {
    // On Login fail remove old cookies if they exist
    deleteCookies()

    if (axios.isAxiosError<LoginResponse>(error)) {
      const data = error.response?.data

      if (data) {
        return data
      }
    }

    return {
      error: {
        message: 'Something strange has happened',
        name: 'Server error',
      },
    }
  }
}

// Logout function
export const logout = async () => {
  deleteCookies()

  const response = await fetch(`${URL}/auth/revalidate`, {
    next: { tags: ['tokenVerified'] },
  })

  const { verified } = await response.json()

  return verified
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

    const { verified } = await response.json()

    // PENDING IMPLEMENTATION FOR REFRESH TOKEN

    return { verified, userInfo }
  }

  return { verified: false, userInfo: null }
}

// RemoveCookies function removes access token
export const removeCookies = async () => {
  deleteCookies()
  try {
    const response = await fetch(`${URL}/auth/revalidate`, {
      next: { tags: ['tokenVerified'] },
    })

    const { verified } = await response.json()

    return verified
  } catch (error) {}
}

// CreateEvent function
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    }
  }

  // PENDING IMPLEMENTATION RETURN TO LOGIN
}
