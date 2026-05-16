import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── DESIGN TOKENS ──────────────────────────────────────
        brand: {
          // Primary: highway neon blue / transport cyan
          cyan:    '#00D4FF',
          blue:    '#0066FF',
          // Secondary: road-sign amber
          amber:   '#FFB800',
          gold:    '#FF8C00',
          // Backgrounds
          asphalt: '#0A0C10',
          charcoal:'#12151C',
          surface: '#1A1F2E',
          panel:   '#1E2436',
          card:    '#242B40',
          border:  '#2A3352',
          // Status glows
          green:   '#00FF88',
          warning: '#FFB800',
          red:     '#FF3B3B',
          // Text
          text:    '#E8EDF5',
          muted:   '#7B8AAB',
          subtle:  '#4A5578',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Cal Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      boxShadow: {
        'glow-cyan':    '0 0 20px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1)',
        'glow-blue':    '0 0 20px rgba(0, 102, 255, 0.3), 0 0 60px rgba(0, 102, 255, 0.1)',
        'glow-amber':   '0 0 20px rgba(255, 184, 0, 0.3),  0 0 60px rgba(255, 184, 0, 0.1)',
        'glow-green':   '0 0 20px rgba(0, 255, 136, 0.3),  0 0 60px rgba(0, 255, 136, 0.1)',
        'glow-red':     '0 0 20px rgba(255, 59, 59, 0.3),   0 0 60px rgba(255, 59, 59, 0.1)',
        'glass':        '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card':         '0 4px 24px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-cyan-blue':  'linear-gradient(135deg, #00D4FF 0%, #0066FF 100%)',
        'gradient-amber':      'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)',
        'gradient-green':      'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
        'gradient-hero':       'radial-gradient(ellipse at top, rgba(0, 212, 255, 0.15) 0%, rgba(0, 102, 255, 0.05) 50%, transparent 100%)',
        'gradient-surface':    'linear-gradient(135deg, rgba(26, 31, 46, 0.9) 0%, rgba(30, 36, 54, 0.8) 100%)',
        'grid-pattern':        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300D4FF' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-glow':   'pulse-glow 2s ease-in-out infinite',
        'slide-up':     'slide-up 0.5s ease-out',
        'slide-right':  'slide-right 0.5s ease-out',
        'fade-in':      'fade-in 0.4s ease-out',
        'ping-slow':    'ping 3s cubic-bezier(0,0,0.2,1) infinite',
        'float':        'float 6s ease-in-out infinite',
        'shimmer':      'shimmer 2s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.5' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-right': {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}

export default config
