import { cookies } from 'next/headers'
import axios from 'axios'
import { NextResponse, NextRequest } from 'next/server'
import { User, LoginData, ApiResponse } from '@/lib/interfaces'

const requestAccess = async (loginData: LoginData) => {
  const URL = `${process.env.DB_URL}/login`
  const response = await axios.post<ApiResponse<User>>(URL, loginData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.statusText === 'OK') {
    const { AccessToken, ExpiresIn, RefreshToken, userInfo } =
      response.data.data

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
  } else {
    throw new Error('Oops something Strange happened')
  }
}

export async function POST(request: NextRequest) {
  const loginPayload = await request.json()

  try {
    await requestAccess(loginPayload)

    return new Response(JSON.stringify({ message: 'login successful' }), {
      status: 200,
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response as {
        status: number
        data: { message: string }
      }

      if (errorData?.data) {
        return NextResponse.json(
          { error: errorData.data.message },
          { status: errorData.status },
        )
      }
      return NextResponse.json(
        { error: 'Oop something weird happened' },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
