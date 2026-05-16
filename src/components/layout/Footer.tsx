'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Zap } from 'lucide-react'

export function Footer() {
  const router   = useRouter()
  const [taps,   setTaps]   = useState(0)
  const [flash,  setFlash]  = useState(false)

  // 5-tap easter egg on the logo to reach admin
  const handleLogoTap = useCallback(async () => {
    const next = taps + 1
    setTaps(next)

    if (next >= 5) {
      setTaps(0)
      setFlash(true)
      setTimeout(() => setFlash(false), 400)

      // Check if owner is set up
      const res  = await fetch('/api/auth/setup')
      const json = await res.json()
      router.push(json.ownerExists ? '/auth/login' : '/auth/setup')
    }
  }, [taps, router])

  return (
    <footer className="border-t border-white/5 bg-brand-asphalt/80 backdrop-blur-sm">
      <div className="container-section py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo — 5-tap secret */}
          <button
            onClick={handleLogoTap}
            className={`flex items-center gap-2 transition-all select-none outline-none ${flash ? 'opacity-50 scale-95' : 'opacity-100'}`}
            aria-label="Big V's Best Routes"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-cyan-blue flex items-center justify-center">
              <Zap className="w-4 h-4 text-brand-asphalt" />
            </div>
            <span className="text-brand-text font-bold text-sm">Big V's Best Routes</span>
          </button>

          {/* Nav links */}
          <nav className="flex items-center gap-6 text-sm text-brand-muted">
            <a href="/features"  className="hover:text-brand-text transition-colors">Features</a>
            <a href="/use-cases" className="hover:text-brand-text transition-colors">Use Cases</a>
            <a href="/demo"      className="hover:text-brand-text transition-colors">Live Demo</a>
            <a href="/contact"   className="hover:text-brand-text transition-colors">Contact</a>
          </nav>

          {/* Copyright */}
          <p className="text-brand-muted text-xs">
            © {new Date().getFullYear()} Big V's Best Routes. All rights reserved.
          </p>
        </div>

        {/* Tap counter hint (invisible until you start tapping) */}
        {taps > 0 && taps < 5 && (
          <p className="text-center text-brand-muted/30 text-xs mt-4 select-none">
            {5 - taps} more…
          </p>
        )}
      </div>
    </footer>
  )
}
