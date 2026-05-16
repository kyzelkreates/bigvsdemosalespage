'use client'

// ══════════════════════════════════════════════════════════════
// FleetMapCanvas — SSR-safe wrapper around the real Leaflet map
// Dynamically imported so Leaflet (browser-only) never runs
// on the server during Next.js static generation.
// ══════════════════════════════════════════════════════════════

import dynamic from 'next/dynamic'
import type { SimulatedVehicle } from '@/types'

const FleetMap = dynamic(() => import('./FleetMap'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: 340, background: 'rgba(8,8,14,0.8)' }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-10 h-10 rounded-full border-2 animate-spin"
          style={{ borderColor: 'rgba(212,175,55,0.2)', borderTopColor: '#D4AF37' }}
        />
        <p className="text-xs font-medium tracking-widest uppercase" style={{ color: '#6A6A7A' }}>
          Loading Map…
        </p>
      </div>
    </div>
  ),
})

interface Props { vehicles: SimulatedVehicle[] }

export function FleetMapCanvas({ vehicles }: Props) {
  return (
    <div className="w-full" style={{ height: 380 }}>
      <FleetMap vehicles={vehicles} />
    </div>
  )
}
