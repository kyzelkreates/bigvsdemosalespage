'use client'
import { Settings, Info } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold text-brand-text">Settings</h1>
      <div className="glass-card p-8 text-center max-w-md mx-auto mt-12">
        <Settings className="w-12 h-12 text-brand-muted mx-auto mb-4" />
        <h2 className="text-brand-text font-bold text-lg mb-2">Demo Mode</h2>
        <p className="text-brand-muted text-sm mb-6">
          Settings are available in the full enterprise deployment.
          This simulation runs on read-only fleet data.
        </p>
        <Link href="/contact" className="btn-primary justify-center">Get Full Access</Link>
      </div>
    </div>
  )
}
