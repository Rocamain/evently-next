import axios from 'axios'
import { NextResponse, NextRequest } from 'next/server'
import {
  ApiResponse,
  RegisterData,
  CreateUserResponse,
  CreateUserResponseError,
} from '@/lib/interfaces'

const requestRegistration = async (
  payload: RegisterData,
): Promise<ApiResponse<CreateUserResponse>> => {
  const URL = `${process.env.DB_URL}/join`

  const { data, status, statusText } = await axios.post(URL, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return { data, status, statusText }
}

export async function POST(request: NextRequest) {
  const registrationPayload = await request.json()
  try {
    const data = await requestRegistration(registrationPayload)

    if (data.status === 201) {
      return NextResponse.json(data)
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response as ApiResponse<CreateUserResponseError>

      if (errorData.data) {
        return NextResponse.json(
          { error: errorData.data.error.message },
          { status: errorData.status },
        )
      }
      return NextResponse.json(
        {
          error:
            'Oops something happened in our server. Please give us time to fix it.',
        },
        { status: 500 },
      )
    }
  }
}
