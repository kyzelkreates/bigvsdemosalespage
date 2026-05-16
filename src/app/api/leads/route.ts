import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { leads } from '@/lib/db'
import { computeFleetFitScore, classifyEngagement } from '@/lib/ai-valuation'
import { sendLeadNotification } from '@/lib/sms'

const LeadSchema = z.object({
  name:      z.string().min(1),
  email:     z.string().email(),
  phone:     z.string().optional().default(''),
  company:   z.string().min(1),
  industry:  z.string().default('other'),
  fleetSize: z.string().default('small'),
  driverCount: z.number().optional(),
  source:    z.string().optional().default('direct'),
})

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = LeadSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data

    // Compute fit score
    const fitScore = computeFleetFitScore({
      fleetSize:      data.fleetSize as any,
      driverCount:    data.driverCount ?? 5,
      deliveryVolume: 10,
      urgency:        'medium',
      industry:       data.industry as any,
    })

    const lead = await leads.create({
      ...data,
      fitScore,
      stage:   'new',
      urgency: classifyEngagement(fitScore, 'medium') === 'hot' ? 'high' : 'medium',
    })

    // Fire SMS notification
    sendLeadNotification(lead).catch(console.error)

    return NextResponse.json({ success: true, data: { id: lead.id, fitScore } })
  } catch (err) {
    console.error('[/api/leads POST]', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
