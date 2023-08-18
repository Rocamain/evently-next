import { CognitoJwtVerifier } from 'aws-jwt-verify'

import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const authorizationHeader = request.headers.get('authorization') as string

  if (!authorizationHeader) {
    return NextResponse.json({ verified: false }, { status: 401 })
  } else {
    const token = authorizationHeader

    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_POOL_ID!,
      tokenUse: 'access',
      clientId: process.env.COGNITO_APP_CLIENT_ID!,
    })

    try {
      await verifier.verify(token)

      return NextResponse.json({ verified: true }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ verified: false }, { status: 401 })
    }
  }
}
