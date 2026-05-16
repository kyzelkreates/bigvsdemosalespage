'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, CheckCircle2, XCircle, Clock, Send } from 'lucide-react'
import { timeAgo } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function SmsConfigPage() {
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/admin/sms').then(r => r.json()).then(d => setLogs(d.data?.logs ?? []))
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold text-brand-text">SMS Configuration & Logs</h1>

      {/* Config panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-card p-6">
          <h3 className="text-brand-text font-semibold mb-4 flex items-center gap-2"><Send className="w-4 h-4 text-brand-cyan" />TextBee Config</h3>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Provider',   value: 'TextBee API' },
              { label: 'API Key',    value: process.env.NEXT_PUBLIC_TEXTBEE_CONFIGURED === 'true' ? '••••••••••••' : 'Not configured' },
              { label: 'Device',     value: 'Configured via ENV' },
              { label: 'Admin Phone',value: 'Configured via ENV' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between border-b border-brand-border/30 pb-2">
                <span className="text-brand-muted">{label}</span>
                <span className="text-brand-text font-mono text-xs">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-brand-text font-semibold mb-4">SMS Triggers</h3>
          <div className="space-y-2">
            {[
              { label: 'Fleet Score ≥ 80',         active: true  },
              { label: 'Enterprise Fleet Lead',    active: true  },
              { label: 'National Fleet Lead',      active: true  },
              { label: 'Critical Urgency Level',   active: true  },
              { label: 'Manual Admin Trigger',     active: false },
            ].map(({ label, active }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-brand-border/20">
                <span className="text-brand-muted text-sm">{label}</span>
                <span className={cn('badge text-xs', active ? 'badge-green' : 'badge-amber')}>
                  {active ? 'Active' : 'Manual'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SMS Logs */}
      <div className="glass-card">
        <div className="px-6 py-4 border-b border-brand-border/40">
          <h3 className="text-brand-text font-semibold text-sm">SMS Delivery Log</h3>
        </div>
        <div className="divide-y divide-brand-border/30">
          {logs.length === 0 && (
            <div className="px-6 py-10 text-center text-brand-muted text-sm">No SMS logs yet</div>
          )}
          {logs.map((log: any, i: number) => (
            <motion.div key={log.id} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: i*0.04 }}
              className="flex items-start gap-4 px-6 py-4">
              <div className={cn('mt-0.5 flex-shrink-0',
                log.status === 'delivered' ? 'text-brand-green' :
                log.status === 'sent'      ? 'text-brand-cyan'  :
                log.status === 'failed'    ? 'text-brand-red'   : 'text-brand-muted'
              )}>
                {log.status === 'failed' ? <XCircle className="w-4 h-4" /> :
                 log.status === 'delivered' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-brand-text text-sm font-semibold font-mono">{log.recipient}</span>
                  <span className="text-brand-subtle text-xs">{log.createdAt ? timeAgo(log.createdAt) : '—'}</span>
                </div>
                <p className="text-brand-muted text-xs leading-relaxed font-mono bg-brand-surface/30 rounded-lg px-3 py-2 mt-1 whitespace-pre-line">{log.message}</p>
                {log.errorMessage && <p className="text-brand-red text-xs mt-1">{log.errorMessage}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
