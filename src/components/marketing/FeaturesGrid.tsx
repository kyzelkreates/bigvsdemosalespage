'use client'

import { motion } from 'framer-motion'
import {
  Route, Truck, Users, BarChart3, Zap, Shield,
  Radio, Brain, Navigation, Clock, MapPin, Activity
} from 'lucide-react'

const FEATURES = [
  {
    icon:  Route,
    title: 'AI Route Optimisation',
    desc:  'Multi-stop route planning with real-time traffic intelligence, fuel cost analysis, and dynamic re-routing to maximise delivery efficiency.',
    color: 'cyan',
    keywords: ['route optimisation', 'multi-stop routing'],
  },
  {
    icon:  Truck,
    title: 'Fleet Vehicle Tracking',
    desc:  'Live fleet visibility across all vehicles. Status, speed, location, and health indicators consolidated into a single operational view.',
    color: 'blue',
    keywords: ['fleet tracking', 'vehicle management'],
  },
  {
    icon:  Brain,
    title: 'Dispatch Intelligence',
    desc:  'AI-powered dispatch recommendations that match drivers, vehicles, and routes to operational demand — automatically, in real time.',
    color: 'amber',
    keywords: ['intelligent dispatch', 'automated scheduling'],
  },
  {
    icon:  BarChart3,
    title: 'Logistics Analytics',
    desc:  'Deep operational intelligence: delivery rates, fleet efficiency, fuel consumption trends, and driver performance — visualised instantly.',
    color: 'green',
    keywords: ['logistics analytics', 'fleet analytics'],
  },
  {
    icon:  Users,
    title: 'Driver Coordination',
    desc:  'Full driver roster management with real-time status tracking, task assignment, and performance monitoring across your fleet.',
    color: 'cyan',
    keywords: ['driver management', 'workforce coordination'],
  },
  {
    icon:  Activity,
    title: 'Real-time ETA Engine',
    desc:  'Dynamic ETA prediction using traffic data, driver behaviour patterns, and delivery complexity. Customers know exactly when to expect delivery.',
    color: 'blue',
    keywords: ['ETA prediction', 'delivery tracking'],
  },
  {
    icon:  Navigation,
    title: 'Traffic Intelligence',
    desc:  'Automated traffic condition monitoring with proactive delay detection and alternative route suggestions before delays impact delivery.',
    color: 'amber',
    keywords: ['traffic monitoring', 'route planning'],
  },
  {
    icon:  Clock,
    title: 'Delivery Timeline Control',
    desc:  'Complete delivery lifecycle visibility from dispatch to completion. Missed deliveries, delays, and exceptions managed in one view.',
    color: 'green',
    keywords: ['delivery management', 'order tracking'],
  },
  {
    icon:  Radio,
    title: 'SMS Alert System',
    desc:  'Automated SMS notifications for critical operational events — driver delays, route exceptions, fleet alerts, and lead notifications.',
    color: 'cyan',
    keywords: ['SMS alerts', 'fleet notifications'],
  },
  {
    icon:  MapPin,
    title: 'Geofence Management',
    desc:  'Define operational zones, depot boundaries, and customer delivery areas. Automatic alerts when vehicles enter or leave zones.',
    color: 'blue',
    keywords: ['geofencing', 'zone management'],
  },
  {
    icon:  Shield,
    title: 'Enterprise RBAC',
    desc:  'Role-based access control with Owner, Admin, and Investor tiers. Complete audit trails, session management, and secure single-owner setup.',
    color: 'amber',
    keywords: ['role-based access', 'enterprise security'],
  },
  {
    icon:  Zap,
    title: 'PWA Driver App',
    desc:  'Installable progressive web app for drivers and dispatchers. Works offline, push notifications, and optimised for mobile fleet operations.',
    color: 'green',
    keywords: ['PWA app', 'mobile fleet management'],
  },
]

const COLOR_MAP: Record<string, string> = {
  cyan:  'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20',
  blue:  'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
  amber: 'bg-brand-amber/10 text-brand-amber border-brand-amber/20',
  green: 'bg-brand-green/10 text-brand-green border-brand-green/20',
}

export function FeaturesGrid() {
  return (
    <section className="py-28 relative" id="features">
      <div className="container-section">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="badge-cyan inline-flex mb-4">
            <Zap className="w-3.5 h-3.5" />
            Platform Capabilities
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            <span className="text-brand-text">Enterprise-Grade</span>{' '}
            <span className="gradient-text">Fleet Intelligence</span>
          </h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Every feature purpose-built for serious logistics operations. No bloat, no compromise.
            Production-ready from day one.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass-card p-6 group hover:border-brand-cyan/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${COLOR_MAP[feature.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-brand-text font-semibold text-base mb-2">
                  {feature.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {feature.desc}
                </p>
                {/* Hidden SEO keywords */}
                <div className="sr-only" aria-hidden="true">
                  {feature.keywords.join(', ')}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
