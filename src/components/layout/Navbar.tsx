'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, Lock, Loader2 } from 'lucide-react'

const NAV_LINKS = [
  { href: '/',          label: 'Home'      },
  { href: '/features',  label: 'Platform'  },
  { href: '/use-cases', label: 'Industries'},
  { href: '/about',     label: 'Our Story' },
  { href: '/demo',      label: 'Live Demo' },
  { href: '/contact',   label: 'Contact'   },
]

// Checks setup status then routes owner to correct portal
function useAdminEntry() {
  const router = useRouter()
  const [checking, setChecking] = useState(false)

  const enter = useCallback(async () => {
    setChecking(true)
    try {
      const res  = await fetch('/api/auth/setup')
      const data = await res.json()
      router.push(data.ownerExists ? '/auth/login' : '/auth/setup')
    } catch {
      router.push('/auth/login')
    } finally {
      setChecking(false)
    }
  }, [router])

  return { enter, checking }
}

export function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { enter, checking } = useAdminEntry()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050507]/90 backdrop-blur-2xl border-b border-[rgba(212,175,55,0.12)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-section">
          <div className="flex items-center justify-between h-18 py-4">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 40%, #F5D76E 100%)' }}>
                  <Zap className="w-4 h-4 text-[#050507]" strokeWidth={2.5} />
                </div>
                <div className="absolute inset-0 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #D4AF37, #F5D76E)' }} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-sm tracking-tight gradient-text-gold">BIG V'S</span>
                <span className="font-black text-sm tracking-tight gradient-text-silver" style={{ marginTop: '-1px' }}>BEST ROUTES</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'text-[#D4AF37] bg-[rgba(212,175,55,0.08)]'
                        : 'text-[#8A8A9A] hover:text-[#F0EDE8]'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>

            {/* Right: CTA + Admin */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/onboarding" className="btn-secondary text-sm px-5 py-2.5">
                Get Quote
              </Link>
              <Link href="/demo" className="btn-primary text-sm px-5 py-2.5">
                <Zap className="w-3.5 h-3.5" />
                Live Demo
              </Link>

              {/* ── Admin Portal Button ── */}
              <button
                onClick={enter}
                disabled={checking}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 disabled:opacity-60"
                style={{
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.28)',
                  color: '#D4AF37',
                  letterSpacing: '0.08em',
                  cursor: checking ? 'wait' : 'pointer',
                }}
                onMouseEnter={e => {
                  if (!checking) {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(212,175,55,0.16)'
                    el.style.boxShadow  = '0 0 18px rgba(212,175,55,0.22)'
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(212,175,55,0.08)'
                  el.style.boxShadow  = 'none'
                }}
              >
                {checking
                  ? <Loader2 className="w-3 h-3 animate-spin" />
                  : <Lock className="w-3 h-3" />
                }
                {checking ? 'Checking…' : 'Admin'}
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="lg:hidden p-2 rounded-lg text-[#8A8A9A] hover:text-[#D4AF37] transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {scrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />
        )}
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] inset-x-0 z-40 mx-4 rounded-2xl p-4 space-y-1"
            style={{
              background: 'rgba(10,10,16,0.97)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(212,175,55,0.15)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
            }}
          >
            {NAV_LINKS.map(({ href, label }) => {
              const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'text-[#D4AF37] bg-[rgba(212,175,55,0.08)]'
                      : 'text-[#8A8A9A] hover:text-[#F0EDE8]'
                  }`}
                >
                  {label}
                </Link>
              )
            })}

            <div className="pt-3 space-y-2" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
              {/* Mobile Admin button */}
              <button
                onClick={() => { setMobileOpen(false); enter() }}
                disabled={checking}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold tracking-widest uppercase transition-all disabled:opacity-60"
                style={{
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.22)',
                  color: '#D4AF37',
                  cursor: checking ? 'wait' : 'pointer',
                }}
              >
                {checking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                {checking ? 'Checking…' : 'Admin Portal'}
              </button>

              <Link href="/onboarding" className="btn-secondary text-sm text-center block">
                Get Quote
              </Link>
              <Link href="/demo" className="btn-primary text-sm justify-center flex">
                <Zap className="w-3.5 h-3.5" /> Launch Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
