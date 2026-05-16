'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare, CheckCircle2, XCircle, Clock, Send,
  Settings, Eye, EyeOff, Loader2, AlertTriangle, Zap
} from 'lucide-react'

function timeAgo(d: string) {
  const diff = Date.now() - new Date(d).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

interface Config {
  textbeeApiKey: string
  textbeeDeviceId: string
  adminPhone: string
  configured: boolean
}

export default function SmsAdminPage() {
  const [logs,       setLogs]       = useState<any[]>([])
  const [config,     setConfig]     = useState<Config | null>(null)
  const [form,       setForm]       = useState({ textbeeApiKey: '', textbeeDeviceId: '', adminPhone: '' })
  const [showKey,    setShowKey]    = useState(false)
  const [showDevice, setShowDevice] = useState(false)
  const [saving,     setSaving]     = useState(false)
  const [testing,    setTesting]    = useState(false)
  const [saveMsg,    setSaveMsg]    = useState<string | null>(null)
  const [testResult, setTestResult] = useState<{ success: boolean; error?: string } | null>(null)
  const [logsLoading,setLogsLoading]= useState(true)

  const fetchAll = async () => {
    const [configRes, logsRes] = await Promise.all([
      fetch('/api/admin/config').then(r => r.json()),
      fetch('/api/admin/sms').then(r => r.json()),
    ])
    if (configRes.success) {
      setConfig(configRes.data)
      setForm({
        textbeeApiKey:   configRes.data.textbeeApiKey   ?? '',
        textbeeDeviceId: configRes.data.textbeeDeviceId ?? '',
        adminPhone:      configRes.data.adminPhone       ?? '',
      })
    }
    if (logsRes.success) setLogs(logsRes.data ?? [])
    setLogsLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  const handleSave = async () => {
    setSaving(true); setSaveMsg(null)
    try {
      const res  = await fetch('/api/admin/config', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      const json = await res.json()
      setSaveMsg(json.success ? '✅ Config saved successfully.' : `❌ ${json.error}`)
      if (json.success) fetchAll()
    } catch { setSaveMsg('❌ Network error') }
    finally { setSaving(false) }
  }

  const handleTest = async () => {
    setTesting(true); setTestResult(null)
    try {
      const res  = await fetch('/api/admin/sms/test', { method: 'POST' })
      const json = await res.json()
      setTestResult({ success: json.success, error: json.error })
      if (json.success) fetchAll()
    } catch { setTestResult({ success: false, error: 'Network error' }) }
    finally { setTesting(false) }
  }

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-brand-text flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-cyan" /> SMS Configuration
        </h1>
        <p className="text-brand-muted text-sm mt-0.5">Configure TextBee — required to receive lead & quote notifications</p>
      </div>

      {/* Status banner */}
      {config && (
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-3 p-4 rounded-xl border ${
            config.configured
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-brand-amber/10 border-brand-amber/30'
          }`}
        >
          {config.configured
            ? <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
            : <AlertTriangle className="w-5 h-5 text-brand-amber flex-shrink-0" />
          }
          <p className={`text-sm font-semibold ${config.configured ? 'text-green-400' : 'text-brand-amber'}`}>
            {config.configured
              ? 'TextBee is configured and active. You will receive SMS notifications for new leads and AI quotes.'
              : 'TextBee is NOT configured. Fill in the fields below to start receiving SMS notifications.'
            }
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── CONFIG EDITOR ─────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-5">
          <h3 className="text-brand-text font-bold flex items-center gap-2">
            <Settings className="w-4 h-4 text-brand-cyan" /> TextBee Credentials
          </h3>

          <p className="text-brand-muted text-xs">
            Get these from{' '}
            <a href="https://app.textbee.dev" target="_blank" rel="noreferrer" className="text-brand-cyan underline">
              app.textbee.dev
            </a>
            {' '}→ API Keys &amp; Devices. These are stored securely in your KV vault — not in code.
          </p>

          {/* API Key */}
          <div>
            <label className="text-brand-text text-sm font-semibold block mb-2">TextBee API Key</label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={form.textbeeApiKey}
                onChange={e => setForm(f => ({ ...f, textbeeApiKey: e.target.value }))}
                placeholder={config?.textbeeApiKey ? 'Leave blank to keep current' : 'Paste your API key…'}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-brand-text placeholder-brand-muted/40 focus:border-brand-cyan focus:outline-none font-mono text-sm"
              />
              <button type="button" onClick={() => setShowKey(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text transition-colors">
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {config?.textbeeApiKey && (
              <p className="text-brand-muted text-xs mt-1">Current: {config.textbeeApiKey}</p>
            )}
          </div>

          {/* Device ID */}
          <div>
            <label className="text-brand-text text-sm font-semibold block mb-2">TextBee Device ID</label>
            <div className="relative">
              <input
                type={showDevice ? 'text' : 'password'}
                value={form.textbeeDeviceId}
                onChange={e => setForm(f => ({ ...f, textbeeDeviceId: e.target.value }))}
                placeholder={config?.textbeeDeviceId ? 'Leave blank to keep current' : 'Paste your Device ID…'}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-brand-text placeholder-brand-muted/40 focus:border-brand-cyan focus:outline-none font-mono text-sm"
              />
              <button type="button" onClick={() => setShowDevice(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-text transition-colors">
                {showDevice ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {config?.textbeeDeviceId && (
              <p className="text-brand-muted text-xs mt-1">Current: {config.textbeeDeviceId}</p>
            )}
          </div>

          {/* Admin Phone */}
          <div>
            <label className="text-brand-text text-sm font-semibold block mb-2">Your Phone Number</label>
            <input
              type="tel"
              value={form.adminPhone}
              onChange={e => setForm(f => ({ ...f, adminPhone: e.target.value }))}
              placeholder="+447000000000"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-brand-text placeholder-brand-muted/40 focus:border-brand-cyan focus:outline-none font-mono text-sm"
            />
            <p className="text-brand-muted text-xs mt-1">All lead & quote SMS notifications are sent to this number.</p>
          </div>

          {saveMsg && (
            <p className={`text-sm font-medium ${saveMsg.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>
              {saveMsg}
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2 flex-1 justify-center disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
              {saving ? 'Saving…' : 'Save Config'}
            </button>

            <button
              onClick={handleTest}
              disabled={testing || !config?.configured}
              title={!config?.configured ? 'Save config first' : 'Send test SMS'}
              className="btn-secondary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {testing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              {testing ? 'Sending…' : 'Test'}
            </button>
          </div>

          {testResult && (
            <div className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
              testResult.success ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
            }`}>
              {testResult.success
                ? <><CheckCircle2 className="w-4 h-4" /> Test SMS sent to your phone!</>
                : <><XCircle className="w-4 h-4" /> {testResult.error}</>
              }
            </div>
          )}
        </motion.div>

        {/* ── SMS TRIGGERS INFO ──────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card p-6 space-y-4">
          <h3 className="text-brand-text font-bold flex items-center gap-2">
            <Send className="w-4 h-4 text-brand-cyan" /> Automatic SMS Triggers
          </h3>
          <p className="text-brand-muted text-xs">These are sent automatically whenever the trigger fires — no action needed.</p>

          <div className="space-y-3">
            {[
              { label: 'New lead captured',              desc: 'Name, company, email, fleet size, fit score',   always: true  },
              { label: 'AI quote generated',             desc: 'Full investment range, ROI breakdown, scope',   always: true  },
              { label: 'Onboarding questionnaire done',  desc: 'Summary of all 14 data fields collected',       always: true  },
              { label: 'Hot lead (fit score ≥ 80)',      desc: 'Priority alert with 🔴 flag',                   always: true  },
              { label: 'Critical urgency lead',          desc: 'Immediate alert — ASAP deployment intent',      always: true  },
            ].map(({ label, desc, always }) => (
              <div key={label} className="flex items-start gap-3 p-3 bg-white/3 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-brand-text text-sm font-semibold">{label}</p>
                  <p className="text-brand-muted text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── SMS LOG ───────────────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-brand-text font-bold text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-cyan" /> Delivery Log
          </h3>
          <span className="text-brand-muted text-xs">{logs.length} messages</span>
        </div>
        <div className="divide-y divide-white/5">
          {logsLoading && (
            <div className="px-6 py-10 flex justify-center">
              <Loader2 className="w-5 h-5 text-brand-cyan animate-spin" />
            </div>
          )}
          {!logsLoading && logs.length === 0 && (
            <div className="px-6 py-12 text-center text-brand-muted text-sm">
              No SMS messages yet. Configure TextBee above to start receiving notifications.
            </div>
          )}
          {logs.map((log: any, i: number) => (
            <motion.div key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              className="flex items-start gap-4 px-6 py-4">
              <div className={`mt-0.5 flex-shrink-0 ${
                log.status === 'sent' || log.status === 'delivered' ? 'text-green-400'
                : log.status === 'failed' ? 'text-red-400'
                : 'text-brand-muted'
              }`}>
                {log.status === 'failed'
                  ? <XCircle className="w-4 h-4" />
                  : log.status === 'sent' || log.status === 'delivered'
                    ? <CheckCircle2 className="w-4 h-4" />
                    : <Clock className="w-4 h-4" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-brand-text text-sm font-mono">{log.recipient}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      log.status === 'sent' || log.status === 'delivered' ? 'bg-green-500/10 text-green-400'
                      : log.status === 'failed' ? 'bg-red-500/10 text-red-400'
                      : 'bg-white/5 text-brand-muted'
                    }`}>{log.status}</span>
                    <span className="text-brand-muted text-xs">{log.createdAt ? timeAgo(log.createdAt) : '—'}</span>
                  </div>
                </div>
                <pre className="text-brand-muted text-xs leading-relaxed bg-brand-asphalt/60 rounded-lg px-3 py-2 whitespace-pre-wrap font-mono overflow-x-auto">
                  {log.message}
                </pre>
                {log.errorMessage && (
                  <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> {log.errorMessage}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
