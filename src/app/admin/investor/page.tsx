'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Zap, BarChart3 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const forecastData = [
  { month: 'Jan', arr: 0,        pipeline: 12000  },
  { month: 'Feb', arr: 8000,     pipeline: 28000  },
  { month: 'Mar', arr: 22000,    pipeline: 55000  },
  { month: 'Apr', arr: 48000,    pipeline: 95000  },
  { month: 'May', arr: 82000,    pipeline: 150000 },
  { month: 'Jun', arr: 135000,   pipeline: 220000 },
  { month: 'Jul', arr: 195000,   pipeline: 300000 },
  { month: 'Aug', arr: 260000,   pipeline: 390000 },
]

export default function InvestorPage() {
  const [metrics, setMetrics] = useState<any>(null)

  useEffect(() => {
    fetch('/api/admin/metrics').then(r => r.json()).then(d => setMetrics(d.data))
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-brand-text">Investor Intelligence</h1>
        <p className="text-brand-muted text-sm">Read-only KPI analytics &amp; growth forecast</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads',    value: metrics?.totalLeads ?? 0, icon: Users,      color: 'cyan'  },
          { label: 'Pipeline Low',   value: formatCurrency(metrics?.pipelineValueLow ?? 0), icon: TrendingUp, color: 'amber' },
          { label: 'Pipeline High',  value: formatCurrency(metrics?.pipelineValueHigh ?? 0), icon: TrendingUp, color: 'green' },
          { label: 'Avg Fit Score',  value: `${metrics?.avgFitScore ?? 0}/100`, icon: Zap, color: 'blue' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-brand-muted text-xs">{label}</p>
              <Icon className={`w-4 h-4 text-brand-${color}`} />
            </div>
            <p className={`text-xl font-black text-brand-${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-6">
        <h3 className="text-brand-text font-semibold mb-1">ARR Forecast</h3>
        <p className="text-brand-muted text-xs mb-5">Projected from current pipeline valuation — not guaranteed</p>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={forecastData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="arr" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#00D4FF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="pip" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#FFB800" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#FFB800" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,51,82,0.5)" />
            <XAxis dataKey="month" tick={{ fill: '#7B8AAB', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => `£${(v/1000).toFixed(0)}k`} tick={{ fill: '#7B8AAB', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ background:'#1A1F2E', border:'1px solid #2A3352', borderRadius:12 }} labelStyle={{ color:'#7B8AAB' }} />
            <Area type="monotone" dataKey="pipeline" stroke="#FFB800" fill="url(#pip)" strokeWidth={2} name="Pipeline" />
            <Area type="monotone" dataKey="arr"      stroke="#00D4FF" fill="url(#arr)" strokeWidth={2} name="ARR" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-brand-text font-semibold mb-4">Fleet Expansion Segments</h3>
        <div className="space-y-3">
          {[
            { segment: 'National Operations (500+ vehicles)', share: 35, color: 'cyan'  },
            { segment: 'Enterprise Fleet (101–500)',          share: 42, color: 'blue'  },
            { segment: 'Standard Fleet (21–100)',             share: 18, color: 'amber' },
            { segment: 'Light Fleet (1–20)',                  share: 5,  color: 'green' },
          ].map(({ segment, share, color }) => (
            <div key={segment}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-brand-muted">{segment}</span>
                <span className={`text-brand-${color} font-semibold`}>{share}%</span>
              </div>
              <div className="h-1.5 bg-brand-border/40 rounded-full overflow-hidden">
                <div className={`h-full bg-brand-${color} rounded-full`} style={{ width:`${share}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
