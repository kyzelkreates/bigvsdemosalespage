import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get('bvr_session')?.value
    if (!token) return NextResponse.redirect(new URL('/auth/login', req.url))

    const session = await verifySessionToken(token)
    if (!session) return NextResponse.redirect(new URL('/auth/login', req.url))

    // Investor can only access dashboard and investor page
    if (session.role === 'INVESTOR') {
      const allowed = ['/admin/dashboard', '/admin/investor']
      if (!allowed.some(p => pathname.startsWith(p))) {
        return NextResponse.redirect(new URL('/admin/investor', req.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
