import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { leads } from '@/lib/db'
import { computeFleetFitScore, computeValuation, classifyEngagement } from '@/lib/ai-valuation'
import { sendLeadNotification, sendOnboardingSummary } from '@/lib/sms'

const QuizSchema = z.object({
  // Contact
  name:      z.string().min(1),
  email:     z.string().email(),
  phone:     z.string().optional().default(''),
  company:   z.string().min(1),

  // Fleet profile
  industry:      z.string(),
  fleetSize:     z.string(),
  driverCount:   z.number(),
  vehicleTypes:  z.array(z.string()).optional().default([]),

  // Operational needs
  deliveryVolume:     z.number().optional().default(10),
  routeRequirements:  z.string().optional().default(''),
  complianceNeeds:    z.array(z.string()).optional().default([]),
  country:            z.string().optional().default('UK'),
  urgency:            z.string().optional().default('medium'),

  // Features
  safetyFeatures:  z.array(z.string()).optional().default([]),
  cameraNeeds:     z.string().optional().default(''),
  trackingNeeds:   z.string().optional().default(''),
  dispatchNeeds:   z.string().optional().default(''),
  whiteLabel:      z.boolean().optional().default(false),
  integrations:    z.array(z.string()).optional().default([]),

  // Optional pre-existing lead ID (update rather than create)
  leadId: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body   = await req.json()
    const parsed = QuizSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data

    // Compute scores
    const fitScore = computeFleetFitScore({
      fleetSize:      data.fleetSize as any,
      driverCount:    data.driverCount,
      deliveryVolume: data.deliveryVolume,
      urgency:        data.urgency as any,
      industry:       data.industry as any,
    })

    const valuation = computeValuation({
      fleetSize:   data.fleetSize as any,
      driverCount: data.driverCount,
      routeVolume: data.deliveryVolume,
      fitScore,
      urgency:     data.urgency as any,
      industry:    data.industry as any,
    })

    const engagement = classifyEngagement(fitScore, data.urgency as any)

    let lead
    if (data.leadId) {
      lead = await leads.update(data.leadId, {
        ...data,
        fitScore,
        quoteMin:     valuation.valueLow,
        quoteMax:     valuation.valueHigh,
        quoteScope:   valuation.deploymentScope,
        quoteSummary: valuation.scopeDescription,
        urgency:      data.urgency,
        stage:        fitScore >= 70 ? 'qualified' : 'new',
      })
    } else {
      lead = await leads.create({
        name:         data.name,
        email:        data.email,
        phone:        data.phone,
        company:      data.company,
        industry:     data.industry,
        fleetSize:    data.fleetSize,
        driverCount:  data.driverCount,
        vehicleTypes: data.vehicleTypes,
        routeRequirements: data.routeRequirements,
        complianceNeeds:   data.complianceNeeds,
        country:      data.country,
        safetyFeatures: data.safetyFeatures,
        cameraNeeds:  data.cameraNeeds,
        trackingNeeds: data.trackingNeeds,
        dispatchNeeds: data.dispatchNeeds,
        whiteLabel:   data.whiteLabel,
        integrations: data.integrations,
        fitScore,
        urgency:      data.urgency,
        stage:        fitScore >= 70 ? 'qualified' : 'new',
        source:       'demo',
        quoteMin:     valuation.valueLow,
        quoteMax:     valuation.valueHigh,
        quoteScope:   valuation.deploymentScope,
        quoteSummary: valuation.scopeDescription,
      })
    }

    if (!lead) {
      return NextResponse.json({ success: false, error: 'Failed to save lead' }, { status: 500 })
    }

    // SMS: send onboarding summary + quote
    sendLeadNotification(lead, valuation.valueLow, valuation.valueHigh).catch(console.error)
    sendOnboardingSummary(lead, valuation.scopeDescription).catch(console.error)

    return NextResponse.json({
      success: true,
      data: {
        leadId:     lead.id,
        fitScore,
        engagement,
        valuation,
      },
    })
  } catch (err) {
    console.error('[/api/quiz POST]', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
