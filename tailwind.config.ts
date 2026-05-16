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
        brand: {
          // Luxury gold spectrum
          gold:       '#D4AF37',
          'gold-light':'#F5D76E',
          'gold-deep': '#B8860B',
          'gold-pale': '#FAF0C8',
          // Metallic silver spectrum
          silver:     '#C0C0C0',
          'silver-light':'#E8E8E8',
          'silver-deep': '#808080',
          platinum:   '#E5E4E2',
          // Obsidian / depth blacks
          obsidian:   '#050507',
          void:       '#08080C',
          deep:       '#0D0D14',
          dark:       '#121219',
          surface:    '#1A1A24',
          card:       '#1E1E2E',
          panel:      '#22223A',
          border:     '#2A2A42',
          // Accent colours
          cyan:       '#00D4FF',
          blue:       '#0066FF',
          amber:      '#FFB800',
          green:      '#00FF88',
          red:        '#FF3B3B',
          // Text
          text:       '#F0EDE8',
          muted:      '#8A8A9A',
          subtle:     '#4A4A6A',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '28px',
      },
      boxShadow: {
        'gold':         '0 0 30px rgba(212,175,55,0.25), 0 0 80px rgba(212,175,55,0.08)',
        'gold-sm':      '0 0 12px rgba(212,175,55,0.3)',
        'gold-inner':   'inset 0 1px 0 rgba(245,215,110,0.3)',
        'silver':       '0 0 30px rgba(192,192,192,0.2), 0 0 80px rgba(192,192,192,0.06)',
        'silver-sm':    '0 0 12px rgba(192,192,192,0.25)',
        'glow-cyan':    '0 0 20px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.1)',
        'glow-amber':   '0 0 20px rgba(255,184,0,0.3), 0 0 60px rgba(255,184,0,0.1)',
        'glow-green':   '0 0 20px rgba(0,255,136,0.3), 0 0 60px rgba(0,255,136,0.1)',
        'glow-red':     '0 0 20px rgba(255,59,59,0.3)',
        'luxury':       '0 32px 80px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
        'luxury-hover': '0 40px 100px rgba(0,0,0,0.9), 0 12px 32px rgba(212,175,55,0.1)',
        'card':         '0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
        'glass':        '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
      },
      backgroundImage: {
        // Metallic gradients
        'gradient-gold':    'linear-gradient(135deg, #B8860B 0%, #D4AF37 30%, #F5D76E 50%, #D4AF37 70%, #B8860B 100%)',
        'gradient-gold-v':  'linear-gradient(180deg, #F5D76E 0%, #D4AF37 50%, #9A7520 100%)',
        'gradient-silver':  'linear-gradient(135deg, #707070 0%, #C0C0C0 30%, #E8E8E8 50%, #C0C0C0 70%, #707070 100%)',
        'gradient-platinum':'linear-gradient(135deg, #9A9A9A 0%, #E5E4E2 40%, #F8F8F8 55%, #E5E4E2 70%, #9A9A9A 100%)',
        // Hero
        'gradient-hero':    'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(212,175,55,0.12) 0%, rgba(192,192,192,0.04) 40%, transparent 70%)',
        'gradient-hero-2':  'radial-gradient(ellipse at bottom right, rgba(212,175,55,0.06) 0%, transparent 60%)',
        // Surface
        'gradient-surface': 'linear-gradient(135deg, rgba(26,26,36,0.95) 0%, rgba(30,30,46,0.9) 100%)',
        'gradient-card':    'linear-gradient(145deg, rgba(30,30,46,0.8) 0%, rgba(22,22,34,0.9) 100%)',
        // Text
        'gradient-text-gold':   'linear-gradient(135deg, #D4AF37 0%, #F5D76E 50%, #D4AF37 100%)',
        'gradient-text-silver': 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #C0C0C0 100%)',
        'gradient-text-luxury': 'linear-gradient(135deg, #D4AF37 0%, #F5D76E 40%, #E8E8E8 60%, #C0C0C0 100%)',
        // Patterns
        'grid-luxury': "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.025'%3E%3Cpath d='M40 40h-2v-2h2v2zm0-40h-2V0h2v-2h2v2h-2v38zm40 40h-2v-2h2v2zm0-40h-2V0h2v-2h2v2h-2v38zM0 40h-2v-2h2v2zm0-40h-2V0h2v-2h2v2h-2v38z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      backdropBlur: { xs: '2px' },
      animation: {
        'shimmer-gold': 'shimmer-gold 3s linear infinite',
        'shimmer-silver':'shimmer-silver 3s linear infinite',
        'pulse-gold':   'pulse-gold 2.5s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'fade-in':      'fade-in 0.5s ease-out',
        'slide-up':     'slide-up 0.5s ease-out',
        'ping-slow':    'ping 3s cubic-bezier(0,0,0.2,1) infinite',
        'glow-pulse':   'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'shimmer-gold': {
          '0%':   { backgroundPosition: '-300% 0' },
          '100%': { backgroundPosition: '300% 0' },
        },
        'shimmer-silver': {
          '0%':   { backgroundPosition: '-300% 0' },
          '100%': { backgroundPosition: '300% 0' },
        },
        'pulse-gold': {
          '0%,100%': { opacity:'1', boxShadow: '0 0 20px rgba(212,175,55,0.3)' },
          '50%':     { opacity:'0.7', boxShadow: '0 0 40px rgba(212,175,55,0.5)' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%,100%': { opacity: '0.4' },
          '50%':     { opacity: '0.8' },
        },
      },
      spacing: {
        '18':'4.5rem','22':'5.5rem','88':'22rem',
        '100':'25rem','112':'28rem','128':'32rem',
      },
    },
  },
  plugins: [],
}

export default config
