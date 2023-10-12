import axios from 'axios'
import { NextResponse, NextRequest } from 'next/server'
import { LoginResponse } from '@/lib/interfaces'

// Create the Register Api point to call the DB for Auth
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const URL = `${process.env.DB_URL}/join`
    const { data, status, statusText } = await axios.post(URL, formData)

    return NextResponse.json(data, { status, statusText })
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

      return NextResponse.json(data, { status, statusText })
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
