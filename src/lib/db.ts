// ══════════════════════════════════════════════════════════════
// BIG V'S BEST ROUTES — LIGHTWEIGHT KV STORE
// No Supabase. No external DB. Vercel KV (Redis) backed.
// Falls back to in-memory store for local dev.
// ══════════════════════════════════════════════════════════════

import { nanoid } from 'nanoid'

// ── TYPE DEFINITIONS ────────────────────────────────────────────

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  industry: string
  fleetSize: string
  driverCount?: number
  vehicleTypes?: string[]
  routeRequirements?: string
  complianceNeeds?: string[]
  country?: string
  safetyFeatures?: string[]
  cameraNeeds?: string
  trackingNeeds?: string
  dispatchNeeds?: string
  whiteLabel?: boolean
  integrations?: string[]
  stage: string
  fitScore: number
  urgency: string
  source: string
  quoteMin?: number
  quoteMax?: number
  quoteScope?: string
  quoteSummary?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface SmsLog {
  id: string
  leadId?: string
  recipient: string
  message: string
  status: string
  provider: string
  errorMessage?: string
  createdAt: string
}

export interface Event {
  id: string
  type: string
  source: string
  sessionId?: string
  leadId?: string
  metadata?: Record<string, unknown>
  createdAt: string
}

export interface PwaInstall {
  id: string
  deviceType: string
  platform?: string
  firstLaunchAt: string
  lastSeenAt: string
}

// ── KV ADAPTER ─────────────────────────────────────────────────
// Uses Vercel KV in production, in-memory Map in dev

let _kv: Map<string, string> | null = null

async function kvGet(key: string): Promise<string | null> {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const res = await fetch(`${process.env.KV_REST_API_URL}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
      cache: 'no-store',
    })
    const json = await res.json()
    return json.result ?? null
  }
  _kv = _kv ?? new Map()
  return _kv.get(key) ?? null
}

async function kvSet(key: string, value: string): Promise<void> {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    await fetch(`${process.env.KV_REST_API_URL}/set/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    })
    return
  }
  _kv = _kv ?? new Map()
  _kv.set(key, value)
}

async function kvDel(key: string): Promise<void> {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    await fetch(`${process.env.KV_REST_API_URL}/del/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
    })
    return
  }
  _kv = _kv ?? new Map()
  _kv.delete(key)
}

// ── GENERIC LIST HELPERS ────────────────────────────────────────

async function listGet<T>(key: string): Promise<T[]> {
  const raw = await kvGet(key)
  if (!raw) return []
  try { return JSON.parse(raw) } catch { return [] }
}

async function listPush<T>(key: string, item: T): Promise<void> {
  const list = await listGet<T>(key)
  list.push(item)
  await kvSet(key, JSON.stringify(list))
}

async function listUpdate<T extends { id: string }>(
  key: string,
  id: string,
  patch: Partial<T>
): Promise<T | null> {
  const list = await listGet<T>(key)
  const idx  = list.findIndex((x: any) => x.id === id)
  if (idx === -1) return null
  list[idx] = { ...list[idx], ...patch }
  await kvSet(key, JSON.stringify(list))
  return list[idx]
}

// ── LEADS ───────────────────────────────────────────────────────

const LEADS_KEY = 'bvr:leads'

export const leads = {
  async create(data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
    const lead: Lead = {
      ...data,
      id:        nanoid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    await listPush<Lead>(LEADS_KEY, lead)
    return lead
  },

  async list(): Promise<Lead[]> {
    return listGet<Lead>(LEADS_KEY)
  },

  async get(id: string): Promise<Lead | null> {
    const all = await listGet<Lead>(LEADS_KEY)
    return all.find(l => l.id === id) ?? null
  },

  async update(id: string, patch: Partial<Lead>): Promise<Lead | null> {
    return listUpdate<Lead>(LEADS_KEY, id, { ...patch, updatedAt: new Date().toISOString() })
  },

  async delete(id: string): Promise<void> {
    const all = await listGet<Lead>(LEADS_KEY)
    await kvSet(LEADS_KEY, JSON.stringify(all.filter(l => l.id !== id)))
  },

  async count(): Promise<number> {
    return (await listGet<Lead>(LEADS_KEY)).length
  },
}

// ── SMS LOGS ────────────────────────────────────────────────────

const SMS_KEY = 'bvr:sms_logs'

export const smsLogs = {
  async create(data: Omit<SmsLog, 'id' | 'createdAt'>): Promise<SmsLog> {
    const log: SmsLog = { ...data, id: nanoid(), createdAt: new Date().toISOString() }
    await listPush<SmsLog>(SMS_KEY, log)
    return log
  },

  async list(): Promise<SmsLog[]> {
    return listGet<SmsLog>(SMS_KEY)
  },

  async update(id: string, patch: Partial<SmsLog>): Promise<void> {
    await listUpdate<SmsLog>(SMS_KEY, id, patch)
  },
}

// ── EVENTS ──────────────────────────────────────────────────────

const EVENTS_KEY = 'bvr:events'

export const events = {
  async create(data: Omit<Event, 'id' | 'createdAt'>): Promise<Event> {
    const ev: Event = { ...data, id: nanoid(), createdAt: new Date().toISOString() }
    await listPush<Event>(EVENTS_KEY, ev)
    return ev
  },

  async list(): Promise<Event[]> {
    return listGet<Event>(EVENTS_KEY)
  },

  async countByType(type: string): Promise<number> {
    const all = await listGet<Event>(EVENTS_KEY)
    return all.filter(e => e.type === type).length
  },
}

// ── PWA INSTALLS ────────────────────────────────────────────────

const PWA_KEY = 'bvr:pwa_installs'

export const pwaInstalls = {
  async create(data: Omit<PwaInstall, 'id'>): Promise<PwaInstall> {
    const install: PwaInstall = { ...data, id: nanoid() }
    await listPush<PwaInstall>(PWA_KEY, install)
    return install
  },

  async list(): Promise<PwaInstall[]> {
    return listGet<PwaInstall>(PWA_KEY)
  },

  async count(): Promise<number> {
    return (await listGet<PwaInstall>(PWA_KEY)).length
  },
}

// ── METRICS COUNTER (lightweight atomic-ish counter) ────────────

export const counters = {
  async increment(key: string): Promise<number> {
    const raw = await kvGet(`bvr:counter:${key}`)
    const val = (parseInt(raw ?? '0', 10) || 0) + 1
    await kvSet(`bvr:counter:${key}`, String(val))
    return val
  },

  async get(key: string): Promise<number> {
    const raw = await kvGet(`bvr:counter:${key}`)
    return parseInt(raw ?? '0', 10) || 0
  },

  async set(key: string, val: number): Promise<void> {
    await kvSet(`bvr:counter:${key}`, String(val))
  },
}

// ── OWNER VAULT ─────────────────────────────────────────────────

const OWNER_KEY = 'bvr:owner_vault'

export const ownerVault = {
  async get(): Promise<{ username: string; passwordHash: string } | null> {
    const raw = await kvGet(OWNER_KEY)
    if (!raw) return null
    try { return JSON.parse(raw) } catch { return null }
  },

  async set(username: string, passwordHash: string): Promise<void> {
    await kvSet(OWNER_KEY, JSON.stringify({ username, passwordHash }))
  },

  async exists(): Promise<boolean> {
    return !!(await kvGet(OWNER_KEY))
  },

  async clear(): Promise<void> {
    await kvDel(OWNER_KEY)
  },
}
