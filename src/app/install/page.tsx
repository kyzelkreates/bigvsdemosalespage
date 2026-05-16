'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Smartphone, Download, Wifi, Bell, Zap } from 'lucide-react'
import { PwaInstallButton } from '@/components/pwa/PwaInstallButton'

export default function InstallPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 min-h-screen">
        <div className="container-section py-20">
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-cyan-blue flex items-center justify-center mx-auto mb-8 shadow-glow-cyan">
              <Zap className="w-10 h-10 text-brand-asphalt" />
            </div>
            <h1 className="text-4xl font-black mb-4">
              <span className="text-brand-text">Install</span>{' '}
              <span className="gradient-text">BVR Fleet App</span>
            </h1>
            <p className="text-brand-muted text-lg mb-10">
              Add the Big V's Best Routes fleet app to your home screen for instant access.
              Works offline. Native app experience.
            </p>

            <PwaInstallButton />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
              {[
                { icon: Smartphone, label: 'Works on iOS & Android' },
                { icon: Wifi,       label: 'Offline capable'         },
                { icon: Bell,       label: 'Push notifications'      },
                { icon: Download,   label: 'No app store required'   },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="glass-card p-4 text-center">
                  <Icon className="w-6 h-6 text-brand-cyan mx-auto mb-2" />
                  <p className="text-brand-muted text-xs">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
