'use client'

import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Fuel, Clock } from 'lucide-react'
import { useFleetStore } from '@/store/fleet'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts'

const weekData = [
  { day: 'Mon', routes: 42, efficiency: 88, completed: 38 },
  { day: 'Tue', routes: 58, efficiency: 91, completed: 54 },
  { day: 'Wed', routes: 51, efficiency: 86, completed: 47 },
  { day: 'Thu', routes: 67, efficiency: 94, completed: 63 },
  { day: 'Fri', routes: 73, efficiency: 92, completed: 70 },
  { day: 'Sat', routes: 48, efficiency: 89, completed: 45 },
  { day: 'Sun', routes: 31, efficiency: 95, completed: 30 },
]

const hourData = Array.from({ length: 12 }, (_, i) => ({
  hour: `${(i * 2).toString().padStart(2,'0')}:00`,
  active: Math.round(Math.sin((i / 12) * Math.PI) * 18 + 6),
}))

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-xl px-3 py-2 text-xs">
      <p className="text-brand-muted mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const { state } = useFleetStore()
  const efficiency = 94.2
  const onTimeRate = 91.5

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-brand-text">Fleet Analytics</h1>
        <p className="text-brand-muted text-sm">Last 7 days — simulation data</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Route Efficiency',  value: `${efficiency}%`,  icon: TrendingUp, color: 'cyan',  delta: '+2.1% this week' },
          { label: 'On-Time Rate',      value: `${onTimeRate}%`,  icon: Clock,      color: 'green', delta: '↑ industry avg 76%' },
          { label: 'Fuel Efficiency',   value: '87.3%',           icon: Fuel,       color: 'amber', delta: '~£14,200 saved/mo' },
          { label: 'Deliveries Today',  value: state.completedToday, icon: BarChart3, color: 'blue', delta: `${state.activeDispatches} active` },
        ].map(({ label, value, icon: Icon, color, delta }) => (
          <div key={label} className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-brand-muted text-xs">{label}</p>
              <Icon className={`w-4 h-4 text-brand-${color}`} />
            </div>
            <p className={`text-2xl font-black text-brand-${color}`}>{value}</p>
            <p className="text-brand-subtle text-xs mt-1">{delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Routes per day */}
        <div className="glass-card p-5">
          <h3 className="text-brand-text font-semibold text-sm mb-4">Routes Completed (7 days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weekData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,51,82,0.5)" />
              <XAxis dataKey="day" tick={{ fill: '#7B8AAB', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#7B8AAB', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="completed" fill="#00D4FF" radius={[4,4,0,0]} opacity={0.85} name="Completed" />
              <Bar dataKey="routes"    fill="rgba(0,212,255,0.25)" radius={[4,4,0,0]} name="Planned" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Efficiency line */}
        <div className="glass-card p-5">
          <h3 className="text-brand-text font-semibold text-sm mb-4">Fleet Efficiency (%) — 7 days</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weekData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="eff" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#00FF88" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00FF88" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,51,82,0.5)" />
              <XAxis dataKey="day"        tick={{ fill: '#7B8AAB', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 100]}   tick={{ fill: '#7B8AAB', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="efficiency" stroke="#00FF88" fill="url(#eff)" strokeWidth={2} name="Efficiency %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly active vehicles */}
        <div className="glass-card p-5 lg:col-span-2">
          <h3 className="text-brand-text font-semibold text-sm mb-4">Active Vehicles — By Hour (today)</h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={hourData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="active" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0066FF" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,51,82,0.5)" />
              <XAxis dataKey="hour"  tick={{ fill: '#7B8AAB', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis                 tick={{ fill: '#7B8AAB', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="active" stroke="#0066FF" fill="url(#active)" strokeWidth={2} name="Active Vehicles" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
