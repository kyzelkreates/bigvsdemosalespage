// ══════════════════════════════════════════════════════════════
// BIG V'S BEST ROUTES — TEXTBEE SMS SYSTEM
// No Prisma. Uses KV-backed smsLogs store.
// ══════════════════════════════════════════════════════════════

import { smsLogs } from '@/lib/db'
import type { Lead } from '@/lib/db'

const TEXTBEE_API_URL = 'https://api.textbee.dev/api/v1'

export interface SmsPayload {
  recipient: string
  message:   string
  leadId?:   string
}

// ── CORE SENDER ─────────────────────────────────────────────────

export async function sendSms({ recipient, message, leadId }: SmsPayload) {
  const apiKey   = process.env.TEXTBEE_API_KEY
  const deviceId = process.env.TEXTBEE_DEVICE_ID

  const log = await smsLogs.create({
    leadId,
    recipient,
    message,
    status:   'pending',
    provider: 'textbee',
  })

  if (!apiKey || !deviceId) {
    console.warn('[SMS] TextBee credentials missing — SMS not sent.')
    await smsLogs.update(log.id, { status: 'failed', errorMessage: 'Missing credentials' })
    return { success: false, error: 'Missing TextBee credentials', logId: log.id }
  }

  try {
    const res  = await fetch(`${TEXTBEE_API_URL}/gateway/devices/${deviceId}/sendMessage`, {
      method:  'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key':    apiKey,
      },
      body: JSON.stringify({ receivers: [recipient], message }),
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data?.message ?? 'TextBee API error')

    await smsLogs.update(log.id, { status: 'sent' })
    return { success: true, logId: log.id }

  } catch (err: any) {
    await smsLogs.update(log.id, { status: 'failed', errorMessage: err.message })
    return { success: false, error: err.message, logId: log.id }
  }
}

// ── LEAD NOTIFICATION ────────────────────────────────────────────

export async function sendLeadNotification(lead: Lead, quoteMin?: number, quoteMax?: number) {
  const adminPhone = process.env.ADMIN_PHONE_NUMBER
  if (!adminPhone) return

  const priority = lead.fitScore >= 80 ? '🔴 HOT LEAD' : lead.fitScore >= 60 ? '🟡 WARM LEAD' : '🟢 NEW LEAD'

  const message = [
    `${priority} — Big V's Best Routes`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 ${lead.name}`,
    `🏢 ${lead.company}`,
    `📧 ${lead.email}`,
    lead.phone ? `📞 ${lead.phone}` : null,
    `🚛 Fleet: ${lead.fleetSize} (${lead.industry})`,
    lead.driverCount ? `👥 Drivers: ${lead.driverCount}` : null,
    lead.country ? `🌍 Region: ${lead.country}` : null,
    `⚡ Fit Score: ${lead.fitScore}/100`,
    quoteMin && quoteMax ? `💰 Quote: £${quoteMin.toLocaleString()}–£${quoteMax.toLocaleString()}` : null,
    `🕐 ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}`,
  ].filter(Boolean).join('\n')

  return sendSms({ recipient: adminPhone, message, leadId: lead.id })
}

// ── ONBOARDING COMPLETE NOTIFICATION ────────────────────────────

export async function sendOnboardingSummary(lead: Lead, summary: string) {
  const adminPhone = process.env.ADMIN_PHONE_NUMBER
  if (!adminPhone) return

  const message = [
    `✅ ONBOARDING COMPLETE — Big V's Best Routes`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 ${lead.name} @ ${lead.company}`,
    `📊 Fit Score: ${lead.fitScore}/100`,
    summary.slice(0, 300),
  ].join('\n')

  return sendSms({ recipient: adminPhone, message, leadId: lead.id })
}

// ── HIGH PRIORITY ALERT ──────────────────────────────────────────

export async function sendHighPriorityAlert(message: string) {
  const adminPhone = process.env.ADMIN_PHONE_NUMBER
  if (!adminPhone) return
  return sendSms({ recipient: adminPhone, message: `🚨 HIGH PRIORITY — BVR\n${message}` })
}
