'use client'

// ══════════════════════════════════════════════════════════════
// FleetMapCanvas — SSR-safe wrapper around the real Leaflet map
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
    <div className="w-full flex flex-col" style={{ height: 410 }}>

      {/* Real map */}
      <div className="flex-1 relative" style={{ minHeight: 0 }}>
        <FleetMap vehicles={vehicles} />
      </div>

      {/* OSM attribution footer */}
      <div
        className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{
          background: 'rgba(5,5,7,0.95)',
          borderTop: '1px solid rgba(212,175,55,0.1)',
        }}
      >
        {/* Left: data source */}
        <div className="flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"
              stroke="#D4AF37" strokeWidth="1.5" opacity="0.6"/>
          </svg>
          <span style={{ fontSize: 10, color: '#4A4A6A', letterSpacing: '0.04em' }}>
            Map data ©{' '}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(212,175,55,0.5)', textDecoration: 'none', fontWeight: 600 }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = '#D4AF37')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(212,175,55,0.5)')}
            >
              OpenStreetMap
            </a>
            {' '}contributors · Tiles ©{' '}
            <a
              href="https://carto.com/attributions"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(212,175,55,0.5)', textDecoration: 'none', fontWeight: 600 }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = '#D4AF37')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(212,175,55,0.5)')}
            >
              CARTO
            </a>
          </span>
        </div>

        {/* Right: simulation notice */}
        <span style={{ fontSize: 10, color: '#2A2A3A', letterSpacing: '0.04em' }}>
          Vehicle positions are simulated
        </span>
      </div>

    </div>
  )
}
