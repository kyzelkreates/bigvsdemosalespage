// ══════════════════════════════════════════════════════════════
// MIDDLEWARE — Edge-compatible. No bcryptjs. JWT only.
// ══════════════════════════════════════════════════════════════

import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'CHANGE_THIS_IN_PRODUCTION_MIN_32_CHARS_XXXX'
)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()

  const token = req.cookies.get('bvr_session')?.value
  if (!token) return NextResponse.redirect(new URL('/auth/login', req.url))

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const role = payload.role as string

    // Investor role — restrict to dashboard + investor page only
    if (role === 'INVESTOR') {
      const allowed = ['/admin/dashboard', '/admin/investor']
      if (!allowed.some(p => pathname.startsWith(p))) {
        return NextResponse.redirect(new URL('/admin/investor', req.url))
      }
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
