// ══════════════════════════════════════════════════════════════
// BIG V'S BEST ROUTES — TEXTBEE SMS SYSTEM
// Config read from KV vault first, env fallback second.
// ══════════════════════════════════════════════════════════════

import { smsLogs } from '@/lib/db'
import { getPlatformConfig } from '@/lib/platform-config'
import type { Lead } from '@/lib/db'

const TEXTBEE_API_URL = 'https://api.textbee.dev/api/v1'

// ── CORE SENDER ─────────────────────────────────────────────────

export interface SmsPayload {
  recipient?: string  // defaults to adminPhone from config
  message:    string
  leadId?:    string
}

export async function sendSmsWithConfig({ recipient, message, leadId }: SmsPayload) {
  const config = await getPlatformConfig()

  const to = recipient || config.adminPhone

  const log = await smsLogs.create({
    leadId,
    recipient: to || 'unset',
    message,
    status:   'pending',
    provider: 'textbee',
  })

  if (!config.textbeeApiKey || !config.textbeeDeviceId || !to) {
    const err = !config.textbeeApiKey || !config.textbeeDeviceId
      ? 'TextBee not configured. Visit Admin → SMS to set up.'
      : 'No recipient phone number configured.'
    await smsLogs.update(log.id, { status: 'failed', errorMessage: err })
    console.warn('[SMS]', err)
    return { success: false, error: err, logId: log.id }
  }

  try {
    const res = await fetch(
      `${TEXTBEE_API_URL}/gateway/devices/${config.textbeeDeviceId}/sendMessage`,
      {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':    config.textbeeApiKey,
        },
        body: JSON.stringify({ receivers: [to], message }),
      }
    )

    const data = await res.json()
    if (!res.ok) throw new Error(data?.message ?? `TextBee error ${res.status}`)

    await smsLogs.update(log.id, { status: 'sent' })
    return { success: true, logId: log.id }

  } catch (err: any) {
    await smsLogs.update(log.id, { status: 'failed', errorMessage: err.message })
    return { success: false, error: err.message, logId: log.id }
  }
}

// Keep legacy alias
export const sendSms = sendSmsWithConfig

// ── LEAD NOTIFICATION ────────────────────────────────────────────

export async function sendLeadNotification(lead: Lead, quoteMin?: number, quoteMax?: number) {
  const priority =
    lead.fitScore >= 80 ? '🔴 HOT LEAD'
    : lead.fitScore >= 60 ? '🟡 WARM LEAD'
    : '🟢 NEW LEAD'

  const lines = [
    `${priority} — Big V's Best Routes`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 ${lead.name}`,
    `🏢 ${lead.company}`,
    `📧 ${lead.email}`,
    lead.phone   ? `📞 ${lead.phone}`         : null,
    `🚛 Fleet: ${lead.fleetSize} · ${lead.industry}`,
    lead.driverCount ? `👥 Drivers: ${lead.driverCount}` : null,
    lead.country ? `🌍 Region: ${lead.country}` : null,
    `⚡ Fit Score: ${lead.fitScore}/100`,
    quoteMin && quoteMax
      ? `💰 Quote: £${quoteMin.toLocaleString()}–£${quoteMax.toLocaleString()}`
      : null,
    `🕐 ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}`,
  ].filter(Boolean).join('\n')

  return sendSmsWithConfig({ message: lines, leadId: lead.id })
}

// ── AI QUOTE NOTIFICATION ────────────────────────────────────────

export async function sendQuoteNotification(lead: Lead, valuation: {
  valueLow: number
  valueHigh: number
  deploymentScope: string
  scopeDescription: string
  roiFuelSavings: number
  roiTimeSavings: number
  roiCostReduction: number
  confidenceScore: number
}) {
  const totalRoi =
    valuation.roiFuelSavings + valuation.roiTimeSavings + valuation.roiCostReduction

  const lines = [
    `📊 AI QUOTE GENERATED — Big V's Best Routes`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 ${lead.name} @ ${lead.company}`,
    `🎯 Fit Score: ${lead.fitScore}/100`,
    ``,
    `💰 INVESTMENT RANGE`,
    `   £${valuation.valueLow.toLocaleString()} – £${valuation.valueHigh.toLocaleString()}`,
    `   ${valuation.deploymentScope}`,
    `   Confidence: ${valuation.confidenceScore}%`,
    ``,
    `📈 PROJECTED ANNUAL ROI`,
    `   Fuel savings:    £${valuation.roiFuelSavings.toLocaleString()}`,
    `   Time efficiency: £${valuation.roiTimeSavings.toLocaleString()}`,
    `   Cost reduction:  £${valuation.roiCostReduction.toLocaleString()}`,
    `   Total ROI:       £${totalRoi.toLocaleString()}/yr`,
    ``,
    `📋 SCOPE`,
    valuation.scopeDescription.slice(0, 250) +
      (valuation.scopeDescription.length > 250 ? '…' : ''),
    ``,
    `🕐 ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}`,
  ].join('\n')

  return sendSmsWithConfig({ message: lines, leadId: lead.id })
}

// ── ONBOARDING COMPLETE ──────────────────────────────────────────

export async function sendOnboardingSummary(lead: Lead, summary: string) {
  const lines = [
    `✅ ONBOARDING COMPLETE — Big V's Best Routes`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 ${lead.name} @ ${lead.company}`,
    `📊 Fit Score: ${lead.fitScore}/100`,
    ``,
    summary.slice(0, 400),
  ].join('\n')

  return sendSmsWithConfig({ message: lines, leadId: lead.id })
}

// ── HIGH PRIORITY ALERT ──────────────────────────────────────────

export async function sendHighPriorityAlert(message: string) {
  return sendSmsWithConfig({ message: `🚨 HIGH PRIORITY — BVR\n${message}` })
}
