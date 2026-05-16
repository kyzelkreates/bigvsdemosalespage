import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import { smsLogs } from '@/lib/db'
import { sendSms } from '@/lib/sms'
import { z } from 'zod'

const SendSchema = z.object({
  message: z.string().min(1).max(1600),
})

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const logs = await smsLogs.list()
  const sorted = [...logs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return NextResponse.json({ success: true, data: sorted })
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body   = await req.json()
    const parsed = SendSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ success: false, error: 'Invalid message' }, { status: 400 })

    const adminPhone = process.env.ADMIN_PHONE_NUMBER
    if (!adminPhone) return NextResponse.json({ success: false, error: 'ADMIN_PHONE_NUMBER not configured' }, { status: 500 })

    const result = await sendSms({ recipient: adminPhone, message: parsed.data.message })
    return NextResponse.json({ success: result.success, data: result })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
