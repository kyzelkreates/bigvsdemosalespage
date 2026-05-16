'use client'

import { useState, useEffect } from 'react'
import { Activity, CheckCircle2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getSystemHealth } from '@/lib/simulation'
import { generateFleetState } from '@/lib/simulation'

const services = [
  { name: 'API Gateway',       health: 98.7, status: 'operational' },
  { name: 'Database (PostgreSQL)', health: 99.9, status: 'operational' },
  { name: 'Simulation Engine', health: 100,  status: 'operational' },
  { name: 'TextBee SMS',       health: 94.2, status: 'degraded'    },
  { name: 'Auth Service',      health: 100,  status: 'operational' },
  { name: 'Event Pipeline',    health: 99.1, status: 'operational' },
  { name: 'PWA Service Worker',health: 100,  status: 'operational' },
]

export default function SystemPage() {
  const [uptime] = useState('99.97%')
  const [now,    setNow] = useState('')
  useEffect(() => {
    const t = setInterval(() => setNow(new Date().toUTCString()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-brand-text">System Observability</h1>
        <p className="text-brand-muted text-sm font-mono">{now}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Uptime',         value: uptime,   color: 'green' },
          { label: 'Healthy Services', value: `${services.filter(s => s.status === 'operational').length}/${services.length}`, color: 'cyan' },
          { label: 'Incidents',      value: services.filter(s => s.status !== 'operational').length, color: 'amber' },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass-card p-4 text-center">
            <p className={`text-2xl font-black text-brand-${color}`}>{value}</p>
            <p className="text-brand-muted text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card divide-y divide-brand-border/30">
        {services.map((svc, i) => (
          <div key={svc.name} className="flex items-center gap-4 px-6 py-4">
            <div className={cn('flex-shrink-0', svc.status === 'operational' ? 'text-brand-green' : 'text-brand-amber')}>
              {svc.status === 'operational' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="text-brand-text text-sm font-semibold">{svc.name}</p>
              <div className="mt-1.5 h-1 bg-brand-border/40 rounded-full overflow-hidden w-full max-w-xs">
                <div className={cn('h-full rounded-full', svc.health > 98 ? 'bg-brand-green' : svc.health > 90 ? 'bg-brand-amber' : 'bg-brand-red')}
                  style={{ width: `${svc.health}%` }} />
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className={cn('text-sm font-bold', svc.health > 98 ? 'text-brand-green' : 'text-brand-amber')}>{svc.health}%</p>
              <p className="text-brand-subtle text-xs capitalize">{svc.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
