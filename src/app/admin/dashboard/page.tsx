'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, TrendingUp, MessageSquare, Activity, Zap, Clock,
  Smartphone, LayoutDashboard, Truck, Route, Target, Star,
  RefreshCw, ArrowUpRight, Radio
} from 'lucide-react'

interface Metrics {
  totalLeads: number
  leadsThisWeek: number
  conversionRate: number
  avgFitScore: number
  smsDeliveryRate: number
  pwaInstalls: number
  pwaThisWeek: number
  pipelineValueLow: number
  pipelineValueHigh: number
  recentLeads: any[]
  leadsByStage: Record<string, number>
  demoViews: number
  quoteGenerated: number
  pageViews: number
  dashboardCount: number
  fleetCount: number
  vehicleCount: number
  routeVolume: number
}

const STAGE_COLORS: Record<string, string> = {
  new: 'text-brand-cyan',
  contacted: 'text-blue-400',
  demo: 'text-brand-amber',
  qualified: 'text-green-400',
  converted: 'text-green-500',
}

const STAGE_BG: Record<string, string> = {
  new: 'bg-brand-cyan/10',
  contacted: 'bg-blue-400/10',
  demo: 'bg-brand-amber/10',
  qualified: 'bg-green-400/10',
  converted: 'bg-green-500/10',
}

function StatCard({
  icon: Icon, label, value, sub, color = 'cyan', delay = 0
}: {
  icon: any, label: string, value: string | number, sub?: string,
  color?: 'cyan' | 'amber' | 'blue' | 'green', delay?: number
}) {
  const colors = {
    cyan:  'text-brand-cyan shadow-glow-cyan/20',
    amber: 'text-brand-amber',
    blue:  'text-blue-400',
    green: 'text-green-400',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-brand-asphalt border border-white/5 flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <ArrowUpRight className="w-4 h-4 text-brand-muted opacity-40" />
      </div>
      <p className="text-brand-muted text-xs mb-1">{label}</p>
      <p className="text-2xl font-black text-brand-text">{value}</p>
      {sub && <p className="text-brand-muted text-xs mt-1">{sub}</p>}
    </motion.div>
  )
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const fetchMetrics = () => {
    setLoading(true)
    fetch('/api/admin/metrics')
      .then(r => r.json())
      .then(d => { setMetrics(d.data); setLastRefresh(new Date()) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchMetrics()
    const interval = setInterval(fetchMetrics, 30_000)
    return () => clearInterval(interval)
  }, [])

  if (loading && !metrics) return (
    <div className="p-6 space-y-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass-card h-24 animate-pulse" />
      ))}
    </div>
  )

  if (!metrics) return (
    <div className="p-6 text-center text-brand-muted py-20">
      <p>Could not load metrics. <a href="/auth/login" className="text-brand-cyan underline">Re-login</a></p>
    </div>
  )

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-brand-text">Intelligence Dashboard</h1>
          <p className="text-brand-muted text-sm mt-0.5">Real-time platform analytics & lead pipeline</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-brand-muted text-xs">
            Updated {lastRefresh.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
          <button onClick={fetchMetrics} className="p-2 glass rounded-xl text-brand-cyan hover:bg-brand-cyan/10 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1.5 text-green-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live
          </div>
        </div>
      </div>

      {/* ── LEAD METRICS ───────────────────────────────────────── */}
      <section>
        <p className="text-brand-muted text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
          <Users className="w-3.5 h-3.5" /> Lead Pipeline
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users}      label="Total Leads"     value={metrics.totalLeads}     sub={`+${metrics.leadsThisWeek} this week`} color="cyan"  delay={0.0} />
          <StatCard icon={Target}     label="Avg Fit Score"   value={`${metrics.avgFitScore}%`} sub="Fleet qualification"                 color="amber" delay={0.05} />
          <StatCard icon={TrendingUp} label="Conversion Rate" value={`${metrics.conversionRate}%`} sub="New → Converted"                color="green" delay={0.1} />
          <StatCard icon={Star}       label="Pipeline Value"  value={`£${Math.round(metrics.pipelineValueLow / 1000)}k–£${Math.round(metrics.pipelineValueHigh / 1000)}k`} sub="Active pipeline estimate" color="blue" delay={0.15} />
        </div>
      </section>

      {/* ── PWA & PLATFORM METRICS ──────────────────────────────── */}
      <section>
        <p className="text-brand-muted text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
          <Smartphone className="w-3.5 h-3.5" /> PWA & Platform
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Smartphone}      label="PWA Installs"      value={metrics.pwaInstalls}   sub={`+${metrics.pwaThisWeek} this week`} color="cyan"  delay={0.0} />
          <StatCard icon={LayoutDashboard} label="Dashboards"         value={metrics.dashboardCount} sub="Deployed instances"                  color="amber" delay={0.05} />
          <StatCard icon={Truck}           label="Fleets Configured"  value={metrics.fleetCount}    sub="Active fleet setups"                  color="blue"  delay={0.1} />
          <StatCard icon={Route}           label="Routes Processed"   value={metrics.routeVolume}   sub="Total route operations"               color="green" delay={0.15} />
        </div>
      </section>

      {/* ── ENGAGEMENT METRICS ───────────────────────────────────── */}
      <section>
        <p className="text-brand-muted text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" /> Engagement
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Activity}      label="Demo Interactions"  value={metrics.demoViews}      sub="Fleet demo engagements" color="cyan"  delay={0.0} />
          <StatCard icon={Zap}           label="Quotes Generated"   value={metrics.quoteGenerated} sub="AI quote completions"   color="amber" delay={0.05} />
          <StatCard icon={Radio}         label="Page Views"         value={metrics.pageViews}      sub="Total site events"      color="blue"  delay={0.1} />
          <StatCard icon={MessageSquare} label="SMS Delivery Rate"  value={`${metrics.smsDeliveryRate}%`} sub="TextBee delivery success" color="green" delay={0.15} />
        </div>
      </section>

      {/* ── PIPELINE STAGE BREAKDOWN ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <h3 className="text-brand-text font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-cyan" /> Pipeline Stages
          </h3>
          <div className="space-y-3">
            {Object.entries(metrics.leadsByStage).map(([stage, count]) => {
              const total = metrics.totalLeads || 1
              const pct   = Math.round((count / total) * 100)
              return (
                <div key={stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-semibold capitalize ${STAGE_COLORS[stage] ?? 'text-brand-muted'}`}>{stage}</span>
                    <span className="text-brand-text text-sm font-bold">{count} <span className="text-brand-muted font-normal text-xs">({pct}%)</span></span>
                  </div>
                  <div className="h-1.5 bg-brand-asphalt rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${STAGE_BG[stage] ?? 'bg-brand-muted'} border-r-2 ${STAGE_COLORS[stage]?.replace('text-', 'border-') ?? ''}`}
                      style={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    />
                  </div>
                </div>
              )
            })}
            {Object.keys(metrics.leadsByStage).length === 0 && (
              <p className="text-brand-muted text-sm text-center py-4">No leads yet</p>
            )}
          </div>
        </motion.div>

        {/* ── RECENT LEADS ───────────────────────────────────────── */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.25 }} className="glass-card p-6">
          <h3 className="text-brand-text font-bold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-cyan" /> Recent Leads
          </h3>
          <div className="space-y-3">
            {metrics.recentLeads.slice(0, 6).map((lead: any) => (
              <div key={lead.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="min-w-0">
                  <p className="text-brand-text text-sm font-semibold truncate">{lead.name}</p>
                  <p className="text-brand-muted text-xs truncate">{lead.company} · {lead.industry}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${STAGE_BG[lead.stage] ?? 'bg-white/5'} ${STAGE_COLORS[lead.stage] ?? 'text-brand-muted'}`}>
                    {lead.stage}
                  </span>
                  <span className="text-brand-text text-xs font-bold">{lead.fitScore}</span>
                </div>
              </div>
            ))}
            {metrics.recentLeads.length === 0 && (
              <p className="text-brand-muted text-sm text-center py-4">No leads yet</p>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
