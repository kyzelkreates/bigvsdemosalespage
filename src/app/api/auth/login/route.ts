import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyOwnerLogin, setSessionCookie } from '@/lib/auth'
import { ownerVault } from '@/lib/db'

const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = LoginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 400 })
    }

    const { username, password } = parsed.data
    const valid = await verifyOwnerLogin(username, password)

    if (!valid) {
      return NextResponse.json({ success: false, error: 'Invalid username or password' }, { status: 401 })
    }

    await setSessionCookie({
      userId:    'owner',
      username,
      role:      'OWNER',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    })

    return NextResponse.json({ success: true, message: 'Logged in.' })
  } catch (err) {
    console.error('[/api/auth/login]', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
