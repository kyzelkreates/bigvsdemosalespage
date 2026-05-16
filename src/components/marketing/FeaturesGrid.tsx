'use client'

import { motion } from 'framer-motion'
import {
  Route, Truck, Users, BarChart3, Zap, Shield,
  Radio, Brain, Navigation, Clock, MapPin, Activity
} from 'lucide-react'

const FEATURES = [
  { icon: Route,      title: 'AI Route Optimisation',    desc: 'Multi-stop route planning with real-time traffic intelligence, fuel cost analysis, and dynamic re-routing to maximise delivery efficiency.', tier: 'gold'   },
  { icon: Truck,      title: 'Fleet Vehicle Tracking',   desc: 'Live fleet visibility across all vehicles. Status, speed, location, and health indicators consolidated into a single operational view.',   tier: 'silver' },
  { icon: Brain,      title: 'Dispatch Intelligence',    desc: 'AI-powered dispatch recommendations that match drivers, vehicles, and routes to operational demand — automatically, in real time.',         tier: 'gold'   },
  { icon: BarChart3,  title: 'Logistics Analytics',      desc: 'Deep operational intelligence: delivery rates, fleet efficiency, fuel consumption trends, and driver performance — visualised instantly.',  tier: 'silver' },
  { icon: Users,      title: 'Driver Coordination',      desc: 'Full driver roster management with real-time status tracking, task assignment, and performance monitoring across your fleet.',              tier: 'gold'   },
  { icon: Activity,   title: 'Real-time ETA Engine',     desc: 'Dynamic ETA prediction using traffic data, driver behaviour patterns, and delivery complexity. Customers know exactly when to expect it.',   tier: 'silver' },
  { icon: Navigation, title: 'Traffic Intelligence',     desc: 'Automated traffic monitoring with proactive delay detection and alternative route suggestions before delays impact delivery outcomes.',       tier: 'gold'   },
  { icon: Clock,      title: 'Delivery Timeline Control',desc: 'Complete delivery lifecycle visibility from dispatch to completion. Missed deliveries, delays, and exceptions managed in one view.',          tier: 'silver' },
  { icon: Radio,      title: 'SMS Alert System',         desc: 'Automated SMS notifications for critical operational events — driver delays, route exceptions, fleet alerts, and lead notifications.',        tier: 'gold'   },
  { icon: MapPin,     title: 'Geofence Management',      desc: 'Define operational zones, depot boundaries, and customer delivery areas. Automatic alerts when vehicles enter or leave defined zones.',      tier: 'silver' },
  { icon: Shield,     title: 'Enterprise RBAC',          desc: 'Role-based access control with Owner, Admin, and Investor tiers. Complete audit trails, session management, and secure single-owner setup.',  tier: 'gold'   },
  { icon: Zap,        title: 'PWA Driver App',           desc: 'Installable progressive web app for drivers and dispatchers. Works offline, push notifications, optimised for mobile fleet operations.',       tier: 'silver' },
]

export function FeaturesGrid() {
  return (
    <section className="py-32 relative overflow-hidden" id="features">

      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 70%)' }} />

      <div className="container-section relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="badge-gold inline-flex mb-5">
            <Zap className="w-3 h-3" />
            Platform Capabilities
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-[-0.03em]">
            <span style={{ color: '#F0EDE8' }}>Enterprise-Grade</span>
            <br />
            <span className="shimmer-gold" style={{ backgroundSize: '300% 100%' }}>Fleet Intelligence</span>
          </h2>

          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#6A6A7A' }}>
            Every feature purpose-built for serious logistics operations.
            No bloat, no compromise. Production-ready from day one.
          </p>

          <div className="gold-line max-w-xs mx-auto mt-8" />
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            const isGold = feature.tier === 'gold'
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group relative p-6 rounded-2xl overflow-hidden cursor-default"
                style={{
                  background: 'linear-gradient(145deg, rgba(26,26,36,0.9) 0%, rgba(18,18,26,0.95) 100%)',
                  border: `1px solid ${isGold ? 'rgba(212,175,55,0.12)' : 'rgba(192,192,192,0.1)'}`,
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.25 },
                }}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: isGold
                      ? 'radial-gradient(at top right, rgba(212,175,55,0.08), transparent 70%)'
                      : 'radial-gradient(at top right, rgba(192,192,192,0.06), transparent 70%)',
                  }} />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: isGold
                      ? 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(184,134,11,0.06))'
                      : 'linear-gradient(135deg, rgba(192,192,192,0.1), rgba(128,128,128,0.05))',
                    border: `1px solid ${isGold ? 'rgba(212,175,55,0.2)' : 'rgba(192,192,192,0.15)'}`,
                  }}
                >
                  <Icon
                    className="w-5 h-5 transition-all duration-300"
                    style={{ color: isGold ? '#D4AF37' : '#C0C0C0' }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-bold text-base mb-2.5 transition-colors duration-200"
                  style={{ color: '#E8E5E0', letterSpacing: '-0.01em' }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: '#6A6A7A' }}>
                  {feature.desc}
                </p>

                {/* Bottom gold/silver line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: isGold
                      ? 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)'
                      : 'linear-gradient(90deg, transparent, rgba(192,192,192,0.4), transparent)',
                  }}
                />
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
