'use client'

import { motion } from 'framer-motion'
import { Package, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'
import { useFleetStore } from '@/store/fleet'
import { cn } from '@/lib/utils'

export default function DeliveriesPage() {
  const { state } = useFleetStore()

  // Build delivery list from vehicles
  const deliveries = state.vehicles
    .filter(v => v.currentDelivery)
    .map((v, i) => ({
      id:         `del-${i}`,
      vehicle:    v.name,
      driver:     v.driverName,
      destination:v.currentDelivery!,
      progress:   v.progress,
      eta:        v.eta,
      status:     v.progress > 90 ? 'arriving' : v.progress > 10 ? 'in-transit' : 'dispatched',
    }))

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-brand-text">Deliveries</h1>
        <p className="text-brand-muted text-sm">{deliveries.length} active · {state.completedToday} completed today</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'In Transit', value: deliveries.filter(d => d.status === 'in-transit').length, color: 'cyan',  icon: Package      },
          { label: 'Arriving',   value: deliveries.filter(d => d.status === 'arriving').length,   color: 'green', icon: CheckCircle2 },
          { label: 'Dispatched', value: deliveries.filter(d => d.status === 'dispatched').length, color: 'amber', icon: Clock        },
        ].map(({ label, value, color, icon: Icon }) => (
          <div key={label} className="glass-card p-4">
            <div className={`w-8 h-8 rounded-lg bg-brand-${color}/10 flex items-center justify-center mb-2`}>
              <Icon className={`w-4 h-4 text-brand-${color}`} />
            </div>
            <p className={`text-2xl font-black text-brand-${color}`}>{value}</p>
            <p className="text-brand-muted text-xs">{label}</p>
          </div>
        ))}
      </div>

      <div className="glass-card divide-y divide-brand-border/30">
        {deliveries.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-4 px-5 py-4"
          >
            <div className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
              d.status === 'arriving'   ? 'bg-brand-green/15 text-brand-green' :
              d.status === 'in-transit' ? 'bg-brand-cyan/15 text-brand-cyan'  : 'bg-brand-amber/15 text-brand-amber'
            )}>
              <Package className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-brand-text text-sm font-semibold truncate">{d.destination}</p>
              <p className="text-brand-muted text-xs">{d.vehicle} · {d.driver}</p>
              <div className="mt-1.5 h-1 bg-brand-border/40 rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-700',
                    d.status === 'arriving' ? 'bg-brand-green' : 'bg-brand-cyan')}
                  style={{ width: `${d.progress}%` }}
                />
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-brand-text text-sm font-semibold">{d.progress}%</p>
              <p className="text-brand-muted text-xs">ETA {d.eta}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
