'use client'

import { motion } from 'framer-motion'
import { Users, Truck, MapPin } from 'lucide-react'
import { useFleetStore } from '@/store/fleet'
import { cn } from '@/lib/utils'

export default function DriversPage() {
  const { state } = useFleetStore()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-brand-text">Drivers</h1>
        <p className="text-brand-muted text-sm">{state.vehicles.filter(v => v.status !== 'idle').length} on duty · {state.vehicles.filter(v => v.status === 'idle').length} idle</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {state.vehicles.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="glass-card p-4 flex items-center gap-4"
          >
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm',
              v.status !== 'idle' ? 'bg-brand-cyan/15 text-brand-cyan' : 'bg-brand-subtle/20 text-brand-subtle'
            )}>
              {v.driverName.split(' ').map(n => n[0]).join('').slice(0,2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-brand-text text-sm font-semibold">{v.driverName}</span>
                <span className={cn('badge-cyan text-xs badge', v.status === 'idle' && 'opacity-40')}>{v.name}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-brand-muted mt-0.5">
                <span className={cn('flex items-center gap-1',
                  v.status === 'in-transit' ? 'text-brand-cyan' :
                  v.status === 'active'     ? 'text-brand-green' : 'text-brand-subtle'
                )}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', v.status !== 'idle' ? 'bg-brand-cyan animate-pulse' : 'bg-brand-subtle')} />
                  {v.status}
                </span>
                {v.status !== 'idle' && <span>{v.speed} km/h</span>}
                {v.status !== 'idle' && <span>ETA {v.eta}</span>}
              </div>
              {v.currentDelivery && (
                <p className="text-brand-subtle text-xs mt-1 truncate flex items-center gap-1">
                  <MapPin className="w-3 h-3" />{v.currentDelivery}
                </p>
              )}
              {v.status !== 'idle' && (
                <div className="mt-2 h-1 bg-brand-border/40 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-cyan rounded-full transition-all duration-700" style={{ width: `${v.progress}%` }} />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
