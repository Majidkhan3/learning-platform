import { NextResponse } from 'next/server'
import { verifyToken } from '../../../../lib/verifyToken'
export async function GET(req) {
  const result = await verifyToken(req)

  if (result.valid) {
    return NextResponse.json({ valid: true })
  } else {
    return NextResponse.json({ valid: false, error: result.error }, { status: 401 })
  }
}
