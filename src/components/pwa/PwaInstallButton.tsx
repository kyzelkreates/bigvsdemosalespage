'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle2 } from 'lucide-react'

export function PwaInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [installed,      setInstalled]      = useState(false)
  const [supported,      setSupported]      = useState(false)

  useEffect(() => {
    const handler = (e: any) => { e.preventDefault(); setDeferredPrompt(e); setSupported(true) }
    window.addEventListener('beforeinstallprompt', handler)

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) setInstalled(true)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setInstalled(true)
      // Track install event
      fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'install_event', source: 'pwa' }),
      })
    }
    setDeferredPrompt(null)
  }

  if (installed) return (
    <div className="flex items-center justify-center gap-2 text-brand-green">
      <CheckCircle2 className="w-6 h-6" />
      <span className="font-semibold">App installed — open from your home screen</span>
    </div>
  )

  return (
    <div className="space-y-4">
      {supported ? (
        <button onClick={handleInstall} className="btn-primary text-base px-10 py-4 shadow-glow-cyan mx-auto">
          <Download className="w-5 h-5" />
          Add to Home Screen
        </button>
      ) : (
        <div className="glass-card p-6 text-sm text-brand-muted max-w-md mx-auto">
          <p className="mb-2 font-semibold text-brand-text">Manual Install Instructions</p>
          <ul className="text-left space-y-1 text-xs">
            <li><span className="text-brand-cyan">iOS Safari:</span> Tap the Share icon → "Add to Home Screen"</li>
            <li><span className="text-brand-cyan">Android Chrome:</span> Tap menu → "Add to Home Screen"</li>
            <li><span className="text-brand-cyan">Desktop Chrome:</span> Click the install icon in the address bar</li>
          </ul>
        </div>
      )}
    </div>
  )
}
