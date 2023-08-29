import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag') as string

  try {
    await revalidateTag(tag)
    return NextResponse.json({ revalidate: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ revalidate: false }, { status: 400 })
  }
}
