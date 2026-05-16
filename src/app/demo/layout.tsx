'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Route, Users, Package,
  BarChart3, Settings, Zap, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFleetStore } from '@/store/fleet'

const NAV = [
  { href: '/demo',             icon: LayoutDashboard, label: 'Fleet Overview' },
  { href: '/demo/routes',      icon: Route,           label: 'Routes'         },
  { href: '/demo/drivers',     icon: Users,           label: 'Drivers'        },
  { href: '/demo/deliveries',  icon: Package,         label: 'Deliveries'     },
  { href: '/demo/analytics',   icon: BarChart3,       label: 'Analytics'      },
  { href: '/demo/settings',    icon: Settings,        label: 'Settings'       },
]

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { startSim, stopSim, running, state } = useFleetStore()

  useEffect(() => {
    startSim()
    return () => stopSim()
  }, [])

  return (
    <div className="flex h-screen bg-brand-asphalt overflow-hidden">

      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-brand-charcoal border-r border-brand-border/50 flex flex-col">
        {/* Logo */}
        <div className="p-5 border-b border-brand-border/50">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-cyan-blue flex items-center justify-center shadow-glow-cyan">
              <Zap className="w-4 h-4 text-brand-asphalt" />
            </div>
            <div>
              <p className="text-xs text-brand-cyan font-semibold tracking-widest uppercase">Big V's</p>
              <p className="text-sm font-bold text-brand-text">Best Routes</p>
            </div>
          </Link>
          <div className="mt-3 flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-brand-green/10 border border-brand-green/20">
            <span className="status-live" />
            <span className="text-brand-green text-xs font-medium">Fleet Simulation LIVE</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/20'
                    : 'text-brand-muted hover:text-brand-text hover:bg-brand-surface/50'
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            )
          })}
        </nav>

        {/* Quick stats */}
        <div className="p-4 border-t border-brand-border/50 space-y-2">
          <div className="glass-card p-3">
            <p className="text-brand-subtle text-xs mb-2">Fleet Status</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-brand-muted">Active</span>
                <span className="text-brand-cyan font-semibold">{state.activeDispatches}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-brand-muted">Completed</span>
                <span className="text-brand-green font-semibold">{state.completedToday}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-brand-muted">Pending</span>
                <span className="text-brand-amber font-semibold">{state.pendingDeliveries}</span>
              </div>
            </div>
          </div>
          <Link
            href="/contact"
            className="btn-primary w-full justify-center text-xs py-2.5"
          >
            Get Enterprise Quote
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
