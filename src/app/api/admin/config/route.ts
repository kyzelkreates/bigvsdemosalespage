// ══════════════════════════════════════════════════════════════
// API: /api/admin/config — TextBee + platform config vault
// Read & write SMS config without redeploying
// ══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import { ownerVault } from '@/lib/db'

// We store TextBee config alongside the owner vault in KV
// Key: bvr:platform_config

async function getConfigRaw(): Promise<Record<string, string>> {
  // Try KV
  const KV_URL   = process.env.KV_REST_API_URL
  const KV_TOKEN = process.env.KV_REST_API_TOKEN

  if (KV_URL && KV_TOKEN) {
    const res  = await fetch(`${KV_URL}/get/${encodeURIComponent('bvr:platform_config')}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: 'no-store',
    })
    const json = await res.json()
    if (json.result) {
      try { return JSON.parse(json.result) } catch { return {} }
    }
    return {}
  }

  // Dev fallback — return env values so dashboard shows something
  return {
    textbeeApiKey:   process.env.TEXTBEE_API_KEY    ?? '',
    textbeeDeviceId: process.env.TEXTBEE_DEVICE_ID  ?? '',
    adminPhone:      process.env.ADMIN_PHONE_NUMBER ?? '',
  }
}

async function setConfigRaw(config: Record<string, string>): Promise<void> {
  const KV_URL   = process.env.KV_REST_API_URL
  const KV_TOKEN = process.env.KV_REST_API_TOKEN

  if (KV_URL && KV_TOKEN) {
    await fetch(`${KV_URL}/set/${encodeURIComponent('bvr:platform_config')}`, {
      method: 'POST',
      headers: {
        Authorization:  `Bearer ${KV_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: JSON.stringify(config) }),
    })
  }
}

// GET — return config (mask secrets)
export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const config = await getConfigRaw()

  return NextResponse.json({
    success: true,
    data: {
      textbeeApiKey:   config.textbeeApiKey   ? '••••' + config.textbeeApiKey.slice(-4)   : '',
      textbeeDeviceId: config.textbeeDeviceId ? '••••' + config.textbeeDeviceId.slice(-4) : '',
      adminPhone:      config.adminPhone ?? '',
      configured:      !!(config.textbeeApiKey && config.textbeeDeviceId && config.adminPhone),
    },
  })
}

// POST — save config
export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const existing = await getConfigRaw()

    const updated: Record<string, string> = {
      ...existing,
      ...(body.textbeeApiKey   && body.textbeeApiKey   !== '••••' + (existing.textbeeApiKey ?? '').slice(-4)   ? { textbeeApiKey:   body.textbeeApiKey   } : {}),
      ...(body.textbeeDeviceId && body.textbeeDeviceId !== '••••' + (existing.textbeeDeviceId ?? '').slice(-4) ? { textbeeDeviceId: body.textbeeDeviceId } : {}),
      ...(body.adminPhone ? { adminPhone: body.adminPhone } : {}),
    }

    await setConfigRaw(updated)
    return NextResponse.json({ success: true, message: 'Config saved.' })
  } catch (err) {
    console.error('[/api/admin/config POST]', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

// Export getter for use in SMS lib
export { getConfigRaw as getPlatformConfig }
