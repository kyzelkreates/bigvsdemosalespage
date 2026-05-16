// ══════════════════════════════════════════════════════════════
// FLEET SIMULATION ENGINE — deterministic, no external deps
// ══════════════════════════════════════════════════════════════

import type { SimulatedVehicle, SimulatedRoute, FleetSimState } from '@/types'

const DRIVER_NAMES = [
  'Marcus Clarke','Sophie Patel','Ryan Johnson','Lisa Barnes',
  'James Okafor','Emma Walsh','Danny Chen','Priya Sharma',
  'Tom Harrison','Aisha Mohammed','Carlos Rivera','Helen White',
  'Kwame Asante','Nina Kowalski','Brett Sullivan','Zara Ahmed',
  'Luke Parsons','Fiona Reeves','Adam Goldstein','Tanya Brooks',
  'Sam Osei','Rachel Kim','Paul Mensah','Diana Cruz',
]

const ORIGINS = [
  'Depot A — North Hub','Depot B — South Gate','Warehouse C — East Terminal',
  'Distribution Centre D','Central Sorting Hub','Regional Depot E',
]

const DESTINATIONS = [
  'Customer Zone 1 — City Centre','Industrial Estate B','Retail Park C',
  'Airport Cargo Terminal','Residential Zone D — North','Business Park E',
  'Hospital Logistics Gate','Stadium District','Tech Campus F','Port Facility G',
]

const VEHICLE_TYPES = ['VAN','TRK','CAR','VAN','VAN','TRK']

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

// London area bounding box
const LAT_MIN = 51.3, LAT_MAX = 51.7
const LNG_MIN = -0.5, LNG_MAX = 0.3

export function generateFleetState(tick: number): FleetSimState {
  const vehicles: SimulatedVehicle[] = Array.from({ length: 24 }, (_, i) => {
    const seed    = i * 137 + tick * 0.05
    const rand    = (offset = 0) => seededRandom(seed + offset)
    const isActive= rand(1) > 0.15
    const progress= isActive ? ((tick * (0.3 + rand(2) * 0.5) + i * 17) % 100) : 0
    const type    = VEHICLE_TYPES[i % VEHICLE_TYPES.length]
    const num     = String(i + 1).padStart(2, '0')

    return {
      id:              `v-${i}`,
      bvrId:           `BVR-2025-VEH-${num}`,
      fleetId:         'demo-fleet',
      name:            `${type}-${num}`,
      type:            type === 'TRK' ? 'truck' : type === 'CAR' ? 'car' : 'van',
      driverName:      DRIVER_NAMES[i] ?? `Driver ${i + 1}`,
      status:          isActive ? (progress > 5 ? 'in-transit' : 'active') : 'idle',
      progress:        Math.round(progress),
      lat:             lerp(LAT_MIN, LAT_MAX, rand(3)),
      lng:             lerp(LNG_MIN, LNG_MAX, rand(4)),
      speed:           isActive ? Math.round(rand(5) * 60 + 15) : 0,
      heading:         Math.round(rand(6) * 360),
      eta:             isActive ? `${Math.round((100 - progress) * 0.8 + 5)} min` : '—',
      currentDelivery: isActive ? DESTINATIONS[i % DESTINATIONS.length] : undefined,
      fuelLevel:       Math.round(rand(7) * 50 + 30),
      batteryLevel:    undefined,
    }
  })

  const routes: SimulatedRoute[] = Array.from({ length: 12 }, (_, i) => {
    const seed    = i * 89 + tick * 0.02
    const rand    = (o = 0) => seededRandom(seed + o)
    const status  = rand(1) > 0.2 ? 'active' : (rand(2) > 0.5 ? 'completed' : 'pending')
    const total   = Math.round(rand(3) * 8 + 3)
    const done    = status === 'completed' ? total : Math.round(rand(4) * total)
    const delay   = rand(5) > 0.8 ? Math.round(rand(6) * 15 + 5) : 0

    return {
      id:               `r-${i}`,
      bvrId:            `BVR-2025-RTE-${String(i + 1).padStart(2, '0')}`,
      fleetId:          'demo-fleet',
      name:             `Route ${String.fromCharCode(65 + i)}`,
      origin:           ORIGINS[i % ORIGINS.length],
      destination:      DESTINATIONS[(i * 3) % DESTINATIONS.length],
      status,
      distance:         Math.round(rand(7) * 80 + 10),
      estimatedDuration:Math.round(rand(8) * 90 + 20),
      completedStops:   done,
      totalStops:       total,
      onTimeStatus:     delay > 0 ? 'delayed' : rand(9) > 0.9 ? 'early' : 'on-time',
      trafficData: {
        level:        delay > 10 ? 'high' : delay > 0 ? 'moderate' : 'low',
        delayMinutes: delay,
        incidents:    delay > 0 ? 1 : 0,
      },
    }
  })

  const activeVehicles   = vehicles.filter(v => v.status !== 'idle').length
  const completedToday   = Math.round(tick * 0.8 + 89) % 200 + 80
  const pendingDeliveries= routes.filter(r => r.status !== 'completed').reduce((a, r) => a + (r.totalStops - r.completedStops), 0)

  return {
    vehicles,
    routes,
    activeDispatches:   activeVehicles,
    completedToday,
    pendingDeliveries,
    systemHealth:       97,
    lastUpdated:        new Date(),
  }
}

export function getSystemHealth(state: FleetSimState) {
  return {
    apiHealth:     98.7,
    simEngine:     100,
    smsService:    94.2,
    database:      99.9,
    uptime:        '99.97%',
    lastCheck:     state.lastUpdated,
  }
}
