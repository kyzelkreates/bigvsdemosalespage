import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { events, pwaInstalls, counters } from '@/lib/db'

const EventSchema = z.object({
  type:      z.string(),
  source:    z.string().optional().default('direct'),
  sessionId: z.string().optional(),
  leadId:    z.string().optional(),
  metadata:  z.record(z.unknown()).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = EventSchema.safeParse(body)
    if (!parsed.success) return NextResponse.json({ success: false }, { status: 400 })

    const ev = parsed.data

    // Track PWA install separately
    if (ev.type === 'install_event') {
      const ua = req.headers.get('user-agent') ?? ''
      await pwaInstalls.create({
        deviceType:     /mobile/i.test(ua) ? 'mobile' : 'desktop',
        platform:       /iPhone|iPad/.test(ua) ? 'ios' : /Android/.test(ua) ? 'android' : 'desktop',
        firstLaunchAt:  new Date().toISOString(),
        lastSeenAt:     new Date().toISOString(),
      })
      await counters.increment('pwa_installs')
    }

    await events.create({
      type:      ev.type,
      source:    ev.source as any,
      sessionId: ev.sessionId,
      leadId:    ev.leadId,
      metadata:  ev.metadata,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/events]', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
