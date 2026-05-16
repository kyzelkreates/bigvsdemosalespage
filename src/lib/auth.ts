// ══════════════════════════════════════════════════════════════
// BIG V'S BEST ROUTES — AUTH SYSTEM
// Single owner. No Supabase. KV-backed vault + JWT sessions.
// ══════════════════════════════════════════════════════════════

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { ownerVault } from '@/lib/db'
import type { AuthSession } from '@/types'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'CHANGE_THIS_IN_PRODUCTION_MIN_32_CHARS_XXXX'
)

const COOKIE_NAME = 'bvr_session'
const COOKIE_OPTS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path:     '/',
  maxAge:   60 * 60 * 24 * 30, // 30 days persistent login
}

// ── PASSWORD ────────────────────────────────────────────────────

export async function hashPassword(pw: string): Promise<string> {
  return bcrypt.hash(pw, 12)
}

export async function verifyPassword(pw: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pw, hash)
}

// ── JWT ─────────────────────────────────────────────────────────

export async function createSessionToken(session: AuthSession): Promise<string> {
  return new SignJWT({ userId: session.userId, username: session.username, role: session.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(JWT_SECRET)
}

export async function verifySessionToken(token: string): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return {
      userId:    payload.userId as string,
      username:  payload.username as string,
      role:      payload.role as any,
      expiresAt: new Date((payload.exp ?? 0) * 1000),
    }
  } catch {
    return null
  }
}

// ── COOKIE SESSION ──────────────────────────────────────────────

export async function setSessionCookie(session: AuthSession): Promise<void> {
  const token       = await createSessionToken(session)
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, COOKIE_OPTS)
}

export async function getSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies()
  const token       = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifySessionToken(token)
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

// ── OWNER VAULT ─────────────────────────────────────────────────

export async function hasOwner(): Promise<boolean> {
  return ownerVault.exists()
}

export async function createOwner(username: string, password: string) {
  if (await hasOwner()) {
    throw new Error('OWNER_EXISTS')
  }
  const passwordHash = await hashPassword(password)
  await ownerVault.set(username, passwordHash)
  return { username, role: 'OWNER' }
}

export async function verifyOwnerLogin(username: string, password: string): Promise<boolean> {
  const vault = await ownerVault.get()
  if (!vault) return false
  if (vault.username !== username) return false
  return verifyPassword(password, vault.passwordHash)
}

// ── REQUEST SESSION (middleware) ─────────────────────────────────

export async function getSessionFromRequest(req: Request): Promise<AuthSession | null> {
  const cookieHeader = req.headers.get('cookie') ?? ''
  const match        = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`))
  if (!match) return null
  return verifySessionToken(match[1])
}
