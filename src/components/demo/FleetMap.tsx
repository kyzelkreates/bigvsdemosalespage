'use client'

// ══════════════════════════════════════════════════════════════
// FLEET MAP — real OpenStreetMap via Leaflet + react-leaflet
// SSR-safe: dynamically imported from FleetMapCanvas wrapper
// ══════════════════════════════════════════════════════════════

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'
import type { Map as LeafletMap, DivIcon } from 'leaflet'
import type { SimulatedVehicle } from '@/types'
import 'leaflet/dist/leaflet.css'

// ── Marker colours ─────────────────────────────────────────────
const STATUS_COLOUR: Record<string, string> = {
  'in-transit': '#D4AF37',   // gold — moving
  'active':     '#00FF88',   // green — just dispatched
  'idle':       '#4A4A6A',   // muted — parked
}

// Build a luxury SVG pin for each vehicle
function makeIcon(vehicle: SimulatedVehicle): DivIcon {
  // only runs client-side (inside dynamic import)
  const L = require('leaflet')
  const colour = STATUS_COLOUR[vehicle.status] ?? '#C0C0C0'
  const isMoving = vehicle.status === 'in-transit'

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">
      <defs>
        <filter id="glow-${vehicle.id}" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <!-- Drop shadow -->
      <ellipse cx="18" cy="42" rx="8" ry="2.5" fill="rgba(0,0,0,0.35)"/>
      <!-- Pin body -->
      <path d="M18 2 C10 2 4 8 4 16 C4 26 18 40 18 40 C18 40 32 26 32 16 C32 8 26 2 18 2Z"
        fill="${colour}" opacity="${isMoving ? 1 : 0.55}"
        filter="url(#glow-${vehicle.id})"/>
      <!-- Inner circle -->
      <circle cx="18" cy="16" r="7" fill="rgba(5,5,7,0.7)"/>
      <!-- Vehicle type initial -->
      <text x="18" y="20.5" text-anchor="middle"
        font-family="Inter,system-ui,sans-serif" font-size="9" font-weight="800"
        fill="${colour}">${vehicle.type === 'truck' ? 'T' : vehicle.type === 'van' ? 'V' : 'C'}</text>
      ${isMoving ? `
      <!-- Pulse ring -->
      <circle cx="18" cy="16" r="13" fill="none" stroke="${colour}" stroke-width="1.5" opacity="0.3">
        <animate attributeName="r" from="13" to="20" dur="1.8s" repeatCount="indefinite"/>
        <animate attributeName="opacity" from="0.4" to="0" dur="1.8s" repeatCount="indefinite"/>
      </circle>` : ''}
    </svg>`

  return L.divIcon({
    html: svg,
    iconSize:   [36, 44],
    iconAnchor: [18, 40],
    popupAnchor:[0, -42],
    className:  '',
  })
}

// ── Auto-fit bounds when vehicles change ───────────────────────
function BoundsFitter({ vehicles }: { vehicles: SimulatedVehicle[] }) {
  const map = useMap()
  const fitted = useRef(false)

  useEffect(() => {
    if (fitted.current || vehicles.length === 0) return
    const L = require('leaflet')
    const lats = vehicles.map(v => v.lat ?? 51.505)
    const lngs = vehicles.map(v => v.lng ?? -0.09)
    const bounds = L.latLngBounds(
      [Math.min(...lats) - 0.02, Math.min(...lngs) - 0.02],
      [Math.max(...lats) + 0.02, Math.max(...lngs) + 0.02],
    )
    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 12 })
    fitted.current = true
  }, [map, vehicles])

  return null
}

// ── Vehicle marker with popup ──────────────────────────────────
function VehicleMarker({ vehicle }: { vehicle: SimulatedVehicle }) {
  const colour = STATUS_COLOUR[vehicle.status] ?? '#C0C0C0'
  const icon   = makeIcon(vehicle)

  return (
    <Marker
      position={[vehicle.lat ?? 51.505, vehicle.lng ?? -0.09]}
      icon={icon}
    >
      <Popup
        closeButton={false}
        className="bvr-popup"
        minWidth={220}
      >
        <div style={{
          background: 'linear-gradient(145deg,rgba(22,22,34,0.98),rgba(14,14,22,1))',
          border: `1px solid ${colour}33`,
          borderRadius: 16,
          padding: '14px 16px',
          fontFamily: 'Inter,system-ui,sans-serif',
          minWidth: 220,
        }}>
          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
            <div style={{
              width:32, height:32, borderRadius:10,
              background:`${colour}18`, border:`1px solid ${colour}40`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:13, fontWeight:800, color: colour,
            }}>
              {vehicle.type === 'truck' ? '🚛' : '🚐'}
            </div>
            <div>
              <p style={{ margin:0, fontWeight:800, fontSize:13, color:'#F0EDE8' }}>{vehicle.name}</p>
              <p style={{ margin:0, fontSize:11, color:'#8A8A9A' }}>{vehicle.driverName}</p>
            </div>
            <div style={{
              marginLeft:'auto', fontSize:10, fontWeight:700, letterSpacing:'0.06em',
              textTransform:'uppercase', color: colour,
              background:`${colour}14`, padding:'3px 8px', borderRadius:6,
            }}>
              {vehicle.status.replace('-', ' ')}
            </div>
          </div>

          {/* Progress bar */}
          {vehicle.status !== 'idle' && (
            <div style={{ marginBottom:10 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ fontSize:10, color:'#6A6A7A' }}>Route Progress</span>
                <span style={{ fontSize:10, fontWeight:700, color: colour }}>{vehicle.progress}%</span>
              </div>
              <div style={{ height:4, borderRadius:4, background:'rgba(255,255,255,0.06)' }}>
                <div style={{
                  height:'100%', borderRadius:4,
                  width:`${vehicle.progress}%`,
                  background:`linear-gradient(90deg, ${colour}99, ${colour})`,
                  transition:'width 0.5s ease',
                }} />
              </div>
            </div>
          )}

          {/* Stats row */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
            {[
              { label:'ETA',   value: vehicle.eta },
              { label:'ID',    value: vehicle.bvrId?.slice(-6) ?? vehicle.id },
              { label:'Fuel',  value: vehicle.fuelLevel != null ? `${vehicle.fuelLevel}%` : '—' },
              { label:'Type',  value: vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1) },
            ].map(({ label, value }) => (
              <div key={label} style={{
                background:'rgba(255,255,255,0.03)', borderRadius:8,
                padding:'6px 8px', border:'1px solid rgba(255,255,255,0.05)',
              }}>
                <p style={{ margin:0, fontSize:9, color:'#4A4A6A', textTransform:'uppercase', letterSpacing:'0.06em' }}>{label}</p>
                <p style={{ margin:0, fontSize:12, fontWeight:700, color:'#E8E5E0', marginTop:2 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </Popup>

      {/* Accuracy ring for active vehicles */}
      {vehicle.status === 'in-transit' && (
        <Circle
          center={[vehicle.lat ?? 51.505, vehicle.lng ?? -0.09]}
          radius={600}
          pathOptions={{ color: colour, fillColor: colour, fillOpacity: 0.04, weight: 1, opacity: 0.2 }}
        />
      )}
    </Marker>
  )
}

// ── Main map component ─────────────────────────────────────────
interface Props { vehicles: SimulatedVehicle[] }

export default function FleetMap({ vehicles }: Props) {
  return (
    <>
      {/* Leaflet CSS overrides for dark luxury theme */}
      <style>{`
        .leaflet-container {
          background: #050507 !important;
          font-family: Inter, system-ui, sans-serif;
        }
        .leaflet-tile-pane { filter: brightness(0.75) saturate(0.5) hue-rotate(190deg) contrast(0.9); }
        .leaflet-control-zoom {
          border: 1px solid rgba(212,175,55,0.25) !important;
          border-radius: 12px !important;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.6) !important;
        }
        .leaflet-control-zoom a {
          background: rgba(18,18,28,0.95) !important;
          color: #D4AF37 !important;
          border-bottom: 1px solid rgba(212,175,55,0.15) !important;
          font-weight: 800;
          transition: background 0.2s;
        }
        .leaflet-control-zoom a:hover { background: rgba(212,175,55,0.12) !important; }
        .leaflet-control-attribution {
          background: rgba(5,5,7,0.7) !important;
          color: rgba(212,175,55,0.35) !important;
          font-size: 9px !important;
          border-radius: 8px 0 0 0 !important;
          backdrop-filter: blur(8px);
        }
        .leaflet-control-attribution a { color: rgba(212,175,55,0.5) !important; }
        .leaflet-popup-content-wrapper,
        .leaflet-popup-tip { display: none !important; }
        .leaflet-popup-content { margin: 0 !important; }
        .bvr-popup .leaflet-popup-content-wrapper { display: block !important; background: transparent !important; box-shadow: none !important; border: none !important; border-radius: 16px !important; padding: 0 !important; }
        .bvr-popup .leaflet-popup-tip-container { display: none !important; }
        .bvr-popup .leaflet-popup-content { margin: 0 !important; }
      `}</style>

      <MapContainer
        center={[51.505, -0.09]}
        zoom={10}
        style={{ width: '100%', height: '100%', minHeight: 340 }}
        zoomControl={true}
        scrollWheelZoom={true}
        attributionControl={true}
      >
        {/* Dark OpenStreetMap tile layer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
          maxZoom={19}
          subdomains="abcd"
        />

        {/* Auto-fit on load */}
        <BoundsFitter vehicles={vehicles} />

        {/* One marker per vehicle */}
        {vehicles.map(vehicle => (
          <VehicleMarker key={vehicle.id} vehicle={vehicle} />
        ))}
      </MapContainer>
    </>
  )
}
