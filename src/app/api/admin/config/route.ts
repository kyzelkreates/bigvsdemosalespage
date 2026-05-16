// ══════════════════════════════════════════════════════════════
// API: /api/admin/config — TextBee + platform config vault
// ══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { getSessionFromRequest } from '@/lib/auth'
import { getPlatformConfig, setPlatformConfig } from '@/lib/platform-config'

// GET — return config (mask secrets)
export async function GET(req: NextRequest) {
  const session = await getSessionFromRequest(req)
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const config = await getPlatformConfig()

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
    const body    = await req.json()
    const existing = await getPlatformConfig()

    const updated: Record<string, string> = { ...existing }

    // Only overwrite if a real new value (not the masked display value)
    if (body.textbeeApiKey && !body.textbeeApiKey.startsWith('••••')) {
      updated.textbeeApiKey = body.textbeeApiKey
    }
    if (body.textbeeDeviceId && !body.textbeeDeviceId.startsWith('••••')) {
      updated.textbeeDeviceId = body.textbeeDeviceId
    }
    if (body.adminPhone) {
      updated.adminPhone = body.adminPhone
    }

    await setPlatformConfig(updated)
    return NextResponse.json({ success: true, message: 'Config saved.' })
  } catch (err) {
    console.error('[/api/admin/config POST]', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
