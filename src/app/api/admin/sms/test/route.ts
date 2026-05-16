// API: /api/admin/sms/test — Send a test SMS using saved config
import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import { sendSmsWithConfig } from '@/lib/sms'

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const result = await sendSmsWithConfig({
    message: `✅ TextBee test — Big V's Best Routes admin panel is connected and working. ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}`,
  })

  return NextResponse.json(result)
}
