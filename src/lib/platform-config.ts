// ══════════════════════════════════════════════════════════════
// BIG V'S BEST ROUTES — PLATFORM CONFIG VAULT
// Read/write TextBee config from KV. Used by both SMS lib
// and the admin config API route.
// ══════════════════════════════════════════════════════════════

export async function getPlatformConfig(): Promise<Record<string, string>> {
  const KV_URL   = process.env.KV_REST_API_URL
  const KV_TOKEN = process.env.KV_REST_API_TOKEN

  if (KV_URL && KV_TOKEN) {
    try {
      const res  = await fetch(`${KV_URL}/get/${encodeURIComponent('bvr:platform_config')}`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
        cache: 'no-store',
      })
      const json = await res.json()
      if (json.result) return JSON.parse(json.result)
    } catch {}
  }

  // Dev fallback — return env values
  return {
    textbeeApiKey:   process.env.TEXTBEE_API_KEY    ?? '',
    textbeeDeviceId: process.env.TEXTBEE_DEVICE_ID  ?? '',
    adminPhone:      process.env.ADMIN_PHONE_NUMBER ?? '',
  }
}

export async function setPlatformConfig(config: Record<string, string>): Promise<void> {
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
