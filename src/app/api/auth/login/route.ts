import axios from 'axios'
import { NextResponse, NextRequest } from 'next/server'
import { LoginData, LoginResponse } from '@/lib/interfaces'

const URL = `${process.env.DB_URL}/login`

// Create the Login Api point to call the DB for Auth
export async function POST(request: NextRequest) {
  try {
    const parserRequest = await request.json()
    const loginPayload = parserRequest.body as LoginData

    const { data, status, statusText } = await axios.post(URL, loginPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = NextResponse.json(data, { status, statusText })

    return response
  } catch (error) {
    // If axios error
    if (axios.isAxiosError<LoginResponse>(error)) {
      // Connection Error with DB
      if (error.code === 'ECONNREFUSED') {
        return NextResponse.json(
          {
            error: {
              message: 'Something unexpected happened',
              name: 'Server error',
            },
          },
          { status: 500, statusText: 'Server Down' },
        )
      }

      // In case other error
      const data = error.response?.data
      const status = error.response?.status
      const statusText = error.response?.statusText
      const response = NextResponse.json(data, { status, statusText })

      return response
    }

    // Fallback error
    return NextResponse.json(
      {
        error: {
          message: 'Something unexpected happened',
          name: 'Server error',
        },
      },
      { status: 500, statusText: 'Server Down' },
    )
  }
}
