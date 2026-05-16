'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, Users, MessageSquare, Activity,
  TrendingUp, Zap, LogOut, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard',    roles: ['OWNER','ADMIN','INVESTOR'] },
  { href: '/admin/leads',     icon: Users,            label: 'Lead CRM',     roles: ['OWNER','ADMIN'] },
  { href: '/admin/sms',       icon: MessageSquare,    label: 'SMS Config',   roles: ['OWNER','ADMIN'] },
  { href: '/admin/system',    icon: Activity,         label: 'System Obs.',  roles: ['OWNER','ADMIN'] },
  { href: '/admin/investor',  icon: TrendingUp,       label: 'Investor View',roles: ['OWNER','INVESTOR'] },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const logout = async () => {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/auth/login')
  }

  return (
    <div className="flex h-screen bg-brand-asphalt overflow-hidden">
      <aside className="w-60 flex-shrink-0 bg-brand-charcoal border-r border-brand-border/50 flex flex-col">
        <div className="p-5 border-b border-brand-border/50">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-cyan-blue flex items-center justify-center shadow-glow-cyan">
              <Zap className="w-4 h-4 text-brand-asphalt" />
            </div>
            <div>
              <p className="text-xs text-brand-cyan font-semibold tracking-widest uppercase">Big V's</p>
              <p className="text-xs font-bold text-brand-text">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname.startsWith(href)
            return (
              <Link key={href} href={href} className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/20'
                  : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface/50'
              )}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-brand-border/50">
          <button onClick={logout} disabled={loggingOut} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-brand-muted hover:text-brand-red hover:bg-brand-red/10 transition-all duration-200">
            <LogOut className="w-4 h-4" />
            {loggingOut ? 'Signing out…' : 'Sign Out'}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
