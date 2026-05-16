'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Truck, MapPin, Activity, Clock, Zap,
  TrendingUp, AlertTriangle, CheckCircle2, ChevronRight
} from 'lucide-react'
import { useFleetStore } from '@/store/fleet'
import { LeadGateModal } from '@/components/demo/LeadGateModal'
import { LiveClock } from '@/components/demo/LiveClock'
import { FleetMapCanvas } from '@/components/demo/FleetMapCanvas'
import { cn } from '@/lib/utils'

export default function DemoOverviewPage() {
  const { state } = useFleetStore()
  const [gated, setGated] = useState(true)

  return (
    <>
      {gated && <LeadGateModal onComplete={() => setGated(false)} />}

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-brand-text">Fleet Overview</h1>
            <p className="text-brand-muted text-sm">Live simulation — 24 vehicles, 12 active routes</p>
          </div>
          <div className="flex items-center gap-4">
            <LiveClock />
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-green/10 border border-brand-green/20">
              <span className="status-live" />
              <span className="text-brand-green text-xs font-semibold">LIVE</span>
            </div>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Vehicles',   value: state.activeDispatches, icon: Truck,        color: 'cyan',  delta: '+3 vs yesterday'  },
            { label: 'Completed Today',   value: state.completedToday,   icon: CheckCircle2, color: 'green', delta: '↑ 18% efficiency'  },
            { label: 'Pending Drops',     value: state.pendingDeliveries,icon: Clock,        color: 'amber', delta: 'Across 12 routes'  },
            { label: 'System Health',     value: `${state.systemHealth}%`,icon: Activity,    color: 'blue',  delta: 'All systems normal' },
          ].map(({ label, value, icon: Icon, color, delta }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass-card p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-brand-muted text-xs font-medium">{label}</p>
                <div className={`w-8 h-8 rounded-lg bg-brand-${color}/10 flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 text-brand-${color}`} />
                </div>
              </div>
              <p className={`text-2xl font-black text-brand-${color} mb-1`}>{value}</p>
              <p className="text-brand-subtle text-xs">{delta}</p>
            </motion.div>
          ))}
        </div>

        {/* Map + Vehicle List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Map */}
          <div className="lg:col-span-2 glass-card p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-brand-border/40">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-cyan" />
                <span className="text-brand-text text-sm font-semibold">Live Fleet Map</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-brand-muted">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-cyan inline-block" />In Transit</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-amber inline-block" />Idle</span>
              </div>
            </div>
            <FleetMapCanvas vehicles={state.vehicles} />
          </div>

          {/* Vehicle List */}
          <div className="glass-card flex flex-col">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-brand-border/40">
              <Truck className="w-4 h-4 text-brand-cyan" />
              <span className="text-brand-text text-sm font-semibold">Vehicle Status</span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-brand-border/30">
              {state.vehicles.slice(0, 12).map((v) => (
                <div key={v.id} className="flex items-center gap-3 px-5 py-3 hover:bg-brand-surface/20 transition-colors">
                  <div className={cn(
                    'w-2 h-2 rounded-full flex-shrink-0',
                    v.status === 'in-transit' ? 'bg-brand-cyan animate-pulse' :
                    v.status === 'active'     ? 'bg-brand-green' : 'bg-brand-subtle'
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-brand-text text-xs font-semibold">{v.name}</span>
                      <span className="text-brand-muted text-xs">{v.eta}</span>
                    </div>
                    <p className="text-brand-subtle text-xs truncate">{v.driverName}</p>
                    {v.status !== 'idle' && (
                      <div className="mt-1 h-1 bg-brand-border/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-cyan rounded-full transition-all duration-1000"
                          style={{ width: `${v.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                  <span className="text-brand-muted text-xs font-mono">{v.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Routes */}
        <div className="glass-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border/40">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-amber" />
              <span className="text-brand-text font-semibold text-sm">Active Routes</span>
            </div>
            <a href="/demo/routes" className="text-brand-cyan text-xs flex items-center gap-1 hover:underline">
              View all <ChevronRight className="w-3 h-3" />
            </a>
          </div>
          <div className="divide-y divide-brand-border/30">
            {state.routes.filter(r => r.status === 'active').slice(0, 5).map((route) => (
              <div key={route.id} className="flex items-center gap-4 px-5 py-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-brand-text text-sm font-semibold">{route.name}</span>
                    <span className={cn(
                      'badge text-xs',
                      route.onTimeStatus === 'on-time' ? 'badge-green' :
                      route.onTimeStatus === 'early'   ? 'badge-cyan'  : 'badge-amber'
                    )}>
                      {route.onTimeStatus}
                    </span>
                  </div>
                  <p className="text-brand-muted text-xs truncate">{route.origin} → {route.destination}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-brand-text text-sm font-semibold">{route.completedStops}/{route.totalStops}</p>
                  <p className="text-brand-subtle text-xs">stops</p>
                </div>
                <div className="w-24">
                  <div className="h-1.5 bg-brand-border/50 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        route.onTimeStatus === 'delayed' ? 'bg-brand-amber' : 'bg-brand-green'
                      )}
                      style={{ width: `${(route.completedStops / route.totalStops) * 100}%` }}
                    />
                  </div>
                </div>
                {route.trafficData && route.trafficData.delayMinutes > 0 && (
                  <div className="flex items-center gap-1 text-brand-amber text-xs">
                    <AlertTriangle className="w-3 h-3" />
                    +{route.trafficData.delayMinutes}m
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
