// ══════════════════════════════════════════════════════════════
// BIG V'S BEST ROUTES — EVENT TRACKING ENGINE
// ══════════════════════════════════════════════════════════════

import { db } from '@/lib/db'
import { BVR } from '@/lib/ids'
import type { EventType, EventSource } from '@/types'

interface TrackEventInput {
  type:       EventType
  source:     EventSource
  sessionId?: string
  leadId?:    string
  fleetId?:   string
  orgId?:     string
  metadata?:  Record<string, unknown>
}

export async function trackEvent(input: TrackEventInput) {
  try {
    return await db.event.create({
      data: {
        bvrId:     BVR.event(),
        type:      input.type,
        source:    input.source,
        sessionId: input.sessionId,
        leadId:    input.leadId,
        fleetId:   input.fleetId,
        orgId:     input.orgId,
        metadata:  input.metadata ?? {},
      },
    })
  } catch (err) {
    // Non-blocking — never throw on analytics failure
    console.error('[EventTracker] Failed to track event:', err)
    return null
  }
}

export async function trackPageView(
  path: string,
  source: EventSource = 'seo',
  sessionId?: string
) {
  return trackEvent({
    type:      'page_view',
    source,
    sessionId,
    metadata:  { path },
  })
}

export async function createSession(input: {
  source:      EventSource
  leadId?:     string
  installId?:  string
  userAgent?:  string
  ip?:         string
  country?:    string
  device?:     string
}) {
  const session = await db.session.create({
    data: {
      bvrId:     BVR.session(),
      source:    input.source,
      leadId:    input.leadId,
      installId: input.installId,
      userAgent: input.userAgent,
      ip:        input.ip,
      country:   input.country,
      device:    input.device,
    },
  })

  // Fire session_start event
  await trackEvent({
    type:      'session_start',
    source:    input.source,
    sessionId: session.id,
    leadId:    input.leadId,
    metadata:  { device: input.device, country: input.country },
  })

  return session
}

export async function endSession(sessionId: string) {
  const session = await db.session.update({
    where: { id: sessionId },
    data:  { endedAt: new Date() },
  })

  await trackEvent({
    type:      'session_end',
    source:    session.source as EventSource,
    sessionId: session.id,
    leadId:    session.leadId ?? undefined,
  })

  return session
}
