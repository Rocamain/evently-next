import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authenticate } from '@/app/actions'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/create')) {
    const { verified } = await authenticate()
    if (!verified) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)

  // pass the header to the layout
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
