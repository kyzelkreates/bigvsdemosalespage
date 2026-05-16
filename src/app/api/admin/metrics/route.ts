import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import { leads, smsLogs, events, pwaInstalls, counters } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const [allLeads, allSms, allEvents, allInstalls] = await Promise.all([
      leads.list(),
      smsLogs.list(),
      events.list(),
      pwaInstalls.list(),
    ])

    // ── Lead metrics ────────────────────────────────────────────
    const now        = new Date()
    const weekAgo    = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const leadsThisWeek = allLeads.filter(l => new Date(l.createdAt) > weekAgo).length

    const converted     = allLeads.filter(l => l.stage === 'converted').length
    const conversionRate = allLeads.length > 0 ? Math.round((converted / allLeads.length) * 100) : 0

    const avgFitScore = allLeads.length > 0
      ? Math.round(allLeads.reduce((s, l) => s + l.fitScore, 0) / allLeads.length)
      : 0

    const pipelineLeads = allLeads.filter(l => !['converted', 'new'].includes(l.stage))
    const pipelineValueLow  = pipelineLeads.reduce((s, l) => s + (l.quoteMin ?? 0), 0)
    const pipelineValueHigh = pipelineLeads.reduce((s, l) => s + (l.quoteMax ?? 0), 0)

    const leadsByStage: Record<string, number> = {}
    for (const l of allLeads) {
      leadsByStage[l.stage] = (leadsByStage[l.stage] ?? 0) + 1
    }

    const recentLeads = [...allLeads]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)

    // ── SMS metrics ─────────────────────────────────────────────
    const smsSent      = allSms.filter(s => s.status === 'sent' || s.status === 'delivered').length
    const smsDeliveryRate = allSms.length > 0 ? Math.round((smsSent / allSms.length) * 100) : 0

    // ── PWA metrics ─────────────────────────────────────────────
    const pwaCount       = allInstalls.length
    const pwaThisWeek    = allInstalls.filter(i => new Date(i.firstLaunchAt) > weekAgo).length

    // ── Event metrics ────────────────────────────────────────────
    const demoViews      = allEvents.filter(e => e.type === 'route_view' || e.type === 'fleet_interaction').length
    const quoteGenerated = allEvents.filter(e => e.type === 'quote_generated').length
    const pageViews      = allEvents.filter(e => e.type === 'page_view').length

    // ── Dashboard/Fleet metrics from counters ────────────────────
    const [dashboardCount, fleetCount, vehicleCount, routeVolume] = await Promise.all([
      counters.get('dashboards_deployed'),
      counters.get('fleets_configured'),
      counters.get('vehicles_tracked'),
      counters.get('routes_processed'),
    ])

    return NextResponse.json({
      success: true,
      data: {
        // Leads
        totalLeads:      allLeads.length,
        leadsThisWeek,
        conversionRate,
        avgFitScore,
        pipelineValueLow,
        pipelineValueHigh,
        leadsByStage,
        recentLeads,

        // SMS
        smsTotal:      allSms.length,
        smsSent,
        smsDeliveryRate,

        // PWA
        pwaInstalls:    pwaCount,
        pwaThisWeek,

        // Events
        demoViews,
        quoteGenerated,
        pageViews,

        // Platform counters
        dashboardCount,
        fleetCount,
        vehicleCount,
        routeVolume,
      },
    })
  } catch (err) {
    console.error('[/api/admin/metrics]', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
