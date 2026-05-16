'use client'
import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

export function LiveClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex items-center gap-1.5 text-brand-muted text-sm font-mono">
      <Clock className="w-3.5 h-3.5" />
      {time}
    </div>
  )
}
