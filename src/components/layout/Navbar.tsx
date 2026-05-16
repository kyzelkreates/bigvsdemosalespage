'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, Lock } from 'lucide-react'

const NAV_LINKS = [
  { href: '/',          label: 'Home'      },
  { href: '/features',  label: 'Platform'  },
  { href: '/use-cases', label: 'Industries'},
  { href: '/about',     label: 'Our Story' },
  { href: '/demo',      label: 'Live Demo' },
  { href: '/contact',   label: 'Contact'   },
]

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active ? 'text-[#D4AF37]' : 'text-[#8A8A9A] hover:text-[#F0EDE8]'
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
              {/* ── Admin Button ─────────────────────────────── */}
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200"
                style={{
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.25)',
                  color: '#D4AF37',
                  letterSpacing: '0.08em',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(212,175,55,0.14)'
                  el.style.boxShadow = '0 0 16px rgba(212,175,55,0.2)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(212,175,55,0.08)'
                  el.style.boxShadow = 'none'
                }}
              >
                <Lock className="w-3 h-3" />
                Admin
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-[#8A8A9A] hover:text-[#D4AF37] transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {scrolled && <div className="gold-line" />}
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-40 mx-4 mt-2 rounded-2xl p-4 space-y-1"
            style={{
              background: 'rgba(13,13,20,0.97)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(212,175,55,0.15)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
            }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  pathname === href
                    ? 'text-[#D4AF37] bg-[rgba(212,175,55,0.06)]'
                    : 'text-[#8A8A9A] hover:text-[#F0EDE8]'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
              {/* Admin button in mobile */}
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold tracking-widest uppercase mt-1 mb-2 transition-all"
                style={{
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  color: '#D4AF37',
                }}
              >
                <Lock className="w-3.5 h-3.5" />
                Admin Portal
              </Link>
              <div className="flex flex-col gap-2">
                <Link href="/onboarding" className="btn-secondary text-sm text-center" onClick={() => setMobileOpen(false)}>Get Quote</Link>
                <Link href="/demo" className="btn-primary text-sm justify-center" onClick={() => setMobileOpen(false)}>
                  <Zap className="w-3.5 h-3.5" /> Launch Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
