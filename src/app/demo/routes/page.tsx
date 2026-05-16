'use client'

import { motion } from 'framer-motion'
import { Route, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import { useFleetStore } from '@/store/fleet'
import { cn } from '@/lib/utils'

export default function RoutesPage() {
  const { state } = useFleetStore()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-brand-text">Routes</h1>
        <p className="text-brand-muted text-sm">{state.routes.length} active route plans</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active',    value: state.routes.filter(r => r.status === 'active').length,    color: 'cyan'  },
          { label: 'Completed', value: state.routes.filter(r => r.status === 'completed').length, color: 'green' },
          { label: 'Pending',   value: state.routes.filter(r => r.status === 'pending').length,   color: 'amber' },
        ].map(m => (
          <div key={m.label} className="glass-card p-4 text-center">
            <p className={`text-2xl font-black text-brand-${m.color}`}>{m.value}</p>
            <p className="text-brand-muted text-xs mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card divide-y divide-brand-border/30">
        {state.routes.map((route, i) => (
          <motion.div
            key={route.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-5 px-5 py-4 hover:bg-brand-surface/20 transition-colors"
          >
            <div className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
              route.status === 'active'    ? 'bg-brand-cyan/15 text-brand-cyan' :
              route.status === 'completed' ? 'bg-brand-green/15 text-brand-green' : 'bg-brand-subtle/20 text-brand-subtle'
            )}>
              {route.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> :
               route.status === 'active'    ? <Route className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-brand-text font-semibold text-sm">{route.name}</span>
                <span className={cn('badge text-xs',
                  route.onTimeStatus === 'on-time' ? 'badge-green' :
                  route.onTimeStatus === 'early'   ? 'badge-cyan' : 'badge-amber'
                )}>{route.onTimeStatus}</span>
              </div>
              <p className="text-brand-muted text-xs truncate">{route.origin} → {route.destination}</p>
              <div className="flex items-center gap-4 mt-1.5 text-brand-subtle text-xs">
                <span>{route.distance} km</span>
                <span>{route.estimatedDuration} min est.</span>
                <span>{route.completedStops}/{route.totalStops} stops</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <div className="w-28 h-1.5 bg-brand-border/50 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full', route.status === 'completed' ? 'bg-brand-green' : route.onTimeStatus === 'delayed' ? 'bg-brand-amber' : 'bg-brand-cyan')}
                  style={{ width: `${route.totalStops > 0 ? (route.completedStops / route.totalStops) * 100 : 0}%` }}
                />
              </div>
              {route.trafficData && route.trafficData.delayMinutes > 0 && (
                <div className="flex items-center gap-1 text-brand-amber text-xs">
                  <AlertTriangle className="w-3 h-3" />
                  +{route.trafficData.delayMinutes}m delay
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
