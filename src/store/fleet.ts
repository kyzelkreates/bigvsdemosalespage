// ══════════════════════════════════════════════════════════════
// FLEET SIMULATION STORE — Zustand
// ══════════════════════════════════════════════════════════════

import { create } from 'zustand'
import { generateFleetState } from '@/lib/simulation'
import type { FleetSimState } from '@/types'

interface FleetStore {
  state:       FleetSimState
  tick:        number
  running:     boolean
  startSim:    () => void
  stopSim:     () => void
  tickForward: () => void
}

let interval: ReturnType<typeof setInterval> | null = null

export const useFleetStore = create<FleetStore>((set, get) => ({
  state:   generateFleetState(0),
  tick:    0,
  running: false,

  startSim: () => {
    if (interval) return
    set({ running: true })
    interval = setInterval(() => {
      const tick = get().tick + 1
      set({ tick, state: generateFleetState(tick) })
    }, 2000)
  },

  stopSim: () => {
    if (interval) { clearInterval(interval); interval = null }
    set({ running: false })
  },

  tickForward: () => {
    const tick = get().tick + 1
    set({ tick, state: generateFleetState(tick) })
  },
}))
