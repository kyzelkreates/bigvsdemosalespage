'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, MapPin, Mail, Lock } from 'lucide-react'

const LINKS = {
  Platform: [
    { label: 'Features',    href: '/features'   },
    { label: 'Industries',  href: '/use-cases'  },
    { label: 'Live Demo',   href: '/demo'       },
    { label: 'Install App', href: '/install'    },
  ],
  Company: [
    { label: 'Our Story',   href: '/about'      },
    { label: 'Contact Us',  href: '/contact'    },
    { label: 'Get a Quote', href: '/onboarding' },
  ],
}

export function Footer() {
  const [tapCount, setTapCount] = useState(0)
  const router = useRouter()

  const handleLogoTap = () => {
    const next = tapCount + 1
    setTapCount(next)
    if (next >= 5) { setTapCount(0); router.push('/auth/login') }
    setTimeout(() => setTapCount(0), 2000)
  }

  return (
    <footer className="relative overflow-hidden pt-20 pb-8">

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,5,7,0.8) 30%, #050507 100%)' }} />
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)' }} />

      <div className="container-section relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <button onClick={handleLogoTap} className="group flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 40%, #F5D76E 100%)' }}>
                  <Zap className="w-5 h-5 text-[#050507]" strokeWidth={2.5} />
                </div>
                <div className="absolute inset-0 rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity"
                  style={{ background: '#D4AF37' }} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-base tracking-tight gradient-text-gold">BIG V'S</span>
                <span className="font-black text-base tracking-tight gradient-text-silver" style={{ marginTop: '-1px' }}>BEST ROUTES</span>
              </div>
            </button>

            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: '#6A6A7A' }}>
              The only fleet navigation platform built with driver safety and legal compliance as its primary architectural foundation. 5 years. 16,000+ hours. No shortcuts.
            </p>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm" style={{ color: '#6A6A7A' }}>
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#D4AF37', opacity: 0.7 }} />
                United Kingdom
              </div>
              <div className="flex items-center gap-2.5 text-sm" style={{ color: '#6A6A7A' }}>
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#D4AF37', opacity: 0.7 }} />
                enterprise@bigvsbestroutes.com
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section} className="lg:col-span-1">
              <h4 className="font-bold text-xs uppercase tracking-widest mb-5" style={{ color: '#D4AF37' }}>
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm transition-colors duration-200 hover:text-[#D4AF37]"
                      style={{ color: '#6A6A7A' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA card */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-widest mb-5" style={{ color: '#D4AF37' }}>
              Get Started
            </h4>
            <div className="p-5 rounded-2xl"
              style={{ background: 'linear-gradient(145deg, rgba(22,22,34,0.9), rgba(14,14,22,0.95))', border: '1px solid rgba(212,175,55,0.15)' }}>
              <p className="text-sm mb-4" style={{ color: '#8A8A9A' }}>
                Ready to make your fleet legally compliant and safety-first? Get a custom scoped quote.
              </p>
              <Link href="/onboarding" className="btn-primary text-sm w-full justify-center">
                <Zap className="w-4 h-4" /> Start AI Onboarding
              </Link>
              <Link href="/demo" className="btn-secondary text-sm w-full justify-center mt-2.5">
                View Live Demo
              </Link>
            </div>
          </div>
        </div>

        <div className="gold-line mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: '#4A4A6A' }}>
            © {new Date().getFullYear()} Big V's Best Routes. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="status-live" />
              <span className="text-xs" style={{ color: '#4A4A6A' }}>All systems operational</span>
            </div>
            {/* Subtle admin link */}
            <Link href="/admin/dashboard"
              className="flex items-center gap-1 text-xs transition-colors"
              style={{ color: '#2A2A3A' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = '#D4AF37' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = '#2A2A3A' }}
            >
              <Lock className="w-3 h-3" />
              Admin
            </Link>
          </div>
          <p className="text-xs" style={{ color: '#4A4A6A' }}>
            Safety-First Fleet Navigation Platform
          </p>
        </div>
      </div>
    </footer>
  )
}
