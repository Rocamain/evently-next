import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookiesList = cookies()
    const authCookie = cookiesList.get('AccessToken')
    const refreshCookie = cookiesList.get('RefreshToken')
    const userInfoCookie = cookiesList.get('UserInfo')

    if (authCookie) {
      cookiesList.delete('AccessToken')
    }

    if (refreshCookie) cookiesList.delete('RefreshToken')
    if (userInfoCookie) cookiesList.delete('UserInfo')

    return NextResponse.json({ deletedCookies: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ deletedCookies: false }, { status: 400 })
  }
}
