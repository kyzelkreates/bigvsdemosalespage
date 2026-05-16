// ══════════════════════════════════════════════════════════════
// BIG V'S BEST ROUTES — EVENT TRACKING ENGINE
// KV-backed. No Prisma. Non-blocking analytics.
// ══════════════════════════════════════════════════════════════

import { events } from '@/lib/db'
import type { EventType, EventSource } from '@/types'

interface TrackEventInput {
  type:      EventType
  source:    EventSource
  sessionId?: string
  leadId?:   string
  metadata?: Record<string, unknown>
}

export async function trackEvent(input: TrackEventInput) {
  try {
    return await events.create({
      type:      input.type,
      source:    input.source,
      sessionId: input.sessionId,
      leadId:    input.leadId,
      metadata:  input.metadata ?? {},
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
  return trackEvent({ type: 'page_view', source, sessionId, metadata: { path } })
}
