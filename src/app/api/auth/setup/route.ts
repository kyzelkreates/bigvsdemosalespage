import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createOwner, hasOwner } from '@/lib/auth'

const SetupSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(12, 'Password must be at least 12 characters'),
})

// ── GET: Check whether owner account exists ─────────────────────
// { ownerExists: true }  → route to /auth/login
// { ownerExists: false } → route to /auth/setup (first-time wizard)
export async function GET() {
  try {
    const ownerExists = await hasOwner()
    return NextResponse.json(
      { ownerExists: ownerExists === true },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate', 'Pragma': 'no-cache' } }
    )
  } catch (err) {
    console.error('[/api/auth/setup GET]', err)
    // KV unreachable — show setup wizard so owner can initialise
    return NextResponse.json(
      { ownerExists: false },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  }
}

// ── POST: Create owner account (one-time only) ──────────────────
export async function POST(req: NextRequest) {
  try {
    const ownerExists = await hasOwner()
    if (ownerExists) {
      return NextResponse.json(
        { success: false, error: 'Owner account already exists. Setup is permanently locked.' },
        { status: 403 }
      )
    }
    const body   = await req.json()
    const parsed = SetupSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }
    const { username, password } = parsed.data
    await createOwner(username, password)
    return NextResponse.json({ success: true, message: 'Owner account created. Setup is now permanently locked.' })
  } catch (err: any) {
    if (err?.message === 'OWNER_EXISTS') {
      return NextResponse.json({ success: false, error: 'Owner already exists' }, { status: 403 })
    }
    console.error('[/api/auth/setup POST]', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
