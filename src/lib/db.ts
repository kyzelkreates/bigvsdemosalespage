// ══════════════════════════════════════════════════════════════
// BIG V'S BEST ROUTES — KV STORE
// Uses @vercel/kv in production, in-memory Map in local dev.
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
// @vercel/kv in production · in-memory Map in local dev

let _mem: Map<string, string> | null = null

function mem(): Map<string, string> {
  if (!_mem) _mem = new Map()
  return _mem
}

function isVercelKv(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

async function kvGet(key: string): Promise<string | null> {
  if (isVercelKv()) {
    try {
      const { kv } = await import('@vercel/kv')
      const val = await kv.get<string>(key)
      return val ?? null
    } catch (err) {
      console.error('[kvGet]', key, err)
      return null
    }
  }
  return mem().get(key) ?? null
}

async function kvSet(key: string, value: string): Promise<void> {
  if (isVercelKv()) {
    try {
      const { kv } = await import('@vercel/kv')
      await kv.set(key, value)
    } catch (err) {
      console.error('[kvSet]', key, err)
    }
    return
  }
  mem().set(key, value)
}

async function kvDel(key: string): Promise<void> {
  if (isVercelKv()) {
    try {
      const { kv } = await import('@vercel/kv')
      await kv.del(key)
    } catch (err) {
      console.error('[kvDel]', key, err)
    }
    return
  }
  mem().delete(key)
}

// ── LIST HELPERS ────────────────────────────────────────────────

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

  async list(): Promise<Lead[]> { return listGet<Lead>(LEADS_KEY) },

  async get(id: string): Promise<Lead | null> {
    return (await listGet<Lead>(LEADS_KEY)).find(l => l.id === id) ?? null
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
  async list(): Promise<SmsLog[]>  { return listGet<SmsLog>(SMS_KEY) },
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
  async list(): Promise<Event[]> { return listGet<Event>(EVENTS_KEY) },
  async countByType(type: string): Promise<number> {
    return (await listGet<Event>(EVENTS_KEY)).filter(e => e.type === type).length
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
  async list(): Promise<PwaInstall[]> { return listGet<PwaInstall>(PWA_KEY) },
  async count(): Promise<number>      { return (await listGet<PwaInstall>(PWA_KEY)).length },
}

// ── COUNTERS ────────────────────────────────────────────────────

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

// ── PLATFORM CONFIG ─────────────────────────────────────────────

const CONFIG_KEY = 'bvr:platform_config'

export const platformConfig = {
  async get(): Promise<Record<string, any>> {
    const raw = await kvGet(CONFIG_KEY)
    if (!raw) return {}
    try { return JSON.parse(raw) } catch { return {} }
  },
  async set(config: Record<string, any>): Promise<void> {
    await kvSet(CONFIG_KEY, JSON.stringify(config))
  },
  async patch(patch: Record<string, any>): Promise<void> {
    const current = await platformConfig.get()
    await kvSet(CONFIG_KEY, JSON.stringify({ ...current, ...patch }))
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
    const val = await kvGet(OWNER_KEY)
    return val !== null && val !== undefined && val !== ''
  },

  async clear(): Promise<void> {
    await kvDel(OWNER_KEY)
  },
}
