'use client'

import { useMemo } from 'react'
import type { SimulatedVehicle } from '@/types'

interface Props { vehicles: SimulatedVehicle[] }

// Map London bounding box to SVG coords
const LAT_MIN = 51.3, LAT_MAX = 51.7
const LNG_MIN = -0.5, LNG_MAX = 0.3
const W = 600, H = 320

function toSvg(lat: number, lng: number) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * W
  const y = H - ((lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * H
  return { x, y }
}

export function FleetMapCanvas({ vehicles }: Props) {
  const dots = useMemo(() => vehicles.map(v => ({
    ...v,
    ...toSvg(v.lat ?? 51.5, v.lng ?? -0.1),
  })), [vehicles])

  return (
    <div className="relative w-full" style={{ paddingBottom: '53.33%' }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 w-full h-full bg-brand-charcoal/60"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,212,255,0.04)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#grid)" />

        {/* Simulated road lines */}
        {[
          'M 50 160 Q 200 80 350 160 Q 450 220 560 140',
          'M 0 200 Q 150 140 300 200 Q 420 240 600 180',
          'M 100 280 Q 250 200 380 240 Q 480 260 600 220',
          'M 300 0 Q 320 80 300 160 Q 280 240 300 320',
          'M 0 80 Q 120 100 240 80 Q 360 60 480 80',
        ].map((d, i) => (
          <path key={i} d={d} stroke="rgba(0,212,255,0.06)" strokeWidth="8" fill="none" strokeLinecap="round" />
        ))}
        {[
          'M 50 160 Q 200 80 350 160 Q 450 220 560 140',
          'M 0 200 Q 150 140 300 200 Q 420 240 600 180',
        ].map((d, i) => (
          <path key={`hl-${i}`} d={d} stroke="rgba(0,212,255,0.12)" strokeWidth="2" fill="none" strokeDasharray="8 6" />
        ))}

        {/* Vehicle dots */}
        {dots.map((v) => {
          const isActive = v.status !== 'idle'
          const color = isActive ? '#00D4FF' : '#4A5578'
          return (
            <g key={v.id}>
              {isActive && (
                <circle cx={v.x} cy={v.y} r="14" fill={color} opacity="0.08">
                  <animate attributeName="r" from="8" to="18" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.12" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={v.x} cy={v.y} r="5" fill={color} opacity={isActive ? 1 : 0.5} />
              <title>{v.name} — {v.driverName} ({v.status})</title>
            </g>
          )
        })}

        {/* Legend */}
        <text x="12" y="20" fill="rgba(0,212,255,0.5)" fontSize="10" fontFamily="monospace">FLEET MAP — LONDON REGION (SIMULATED)</text>
      </svg>
    </div>
  )
}
