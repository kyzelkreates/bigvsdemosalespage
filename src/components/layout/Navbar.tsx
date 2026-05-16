'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/',           label: 'Home'       },
  { href: '/features',   label: 'Features'   },
  { href: '/use-cases',  label: 'Use Cases'  },
  { href: '/demo',       label: 'Live Demo'  },
  { href: '/contact',    label: 'Contact'    },
]

export function Navbar() {
  const pathname   = usePathname()
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-brand-asphalt/90 backdrop-blur-xl border-b border-brand-border/50 shadow-card'
          : 'bg-transparent'
      )}
    >
      <div className="container-section">
        <nav className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-cyan-blue flex items-center justify-center shadow-glow-cyan">
              <Zap className="w-4 h-4 text-brand-asphalt" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xs font-semibold text-brand-cyan tracking-widest uppercase">Big V's</span>
              <span className="text-sm font-bold text-brand-text">Best Routes</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-brand-cyan bg-brand-cyan/10'
                    : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface/50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/contact" className="btn-secondary text-sm px-4 py-2">
              Get a Quote
            </Link>
            <Link href="/demo" className="btn-primary text-sm px-4 py-2">
              Live Demo
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-brand-muted hover:text-brand-text hover:bg-brand-surface/50 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-brand-border/50 bg-brand-asphalt/95 backdrop-blur-xl"
          >
            <div className="container-section py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                    pathname === link.href
                      ? 'text-brand-cyan bg-brand-cyan/10'
                      : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface/50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2">
                <Link href="/demo"    className="btn-primary  text-center justify-center">Live Demo</Link>
                <Link href="/contact" className="btn-secondary text-center justify-center">Get a Quote</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
