/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest:        'public',
  register:    true,
  skipWaiting: true,
  disable:     process.env.NODE_ENV === 'development',
  runtimeCaching: [
    // ── Never cache tile servers or Leaflet assets ─────────────
    {
      urlPattern: /\.(basemaps\.cartocdn\.com|tile\.openstreetmap\.org|unpkg\.com\/leaflet)/,
      handler:    'NetworkOnly',
    },
    // ── App shell + pages ──────────────────────────────────────
    {
      urlPattern: /^https?.*/,
      handler:    'NetworkFirst',
      options: {
        cacheName:            'bvr-runtime-cache',
        expiration:           { maxEntries: 200, maxAgeSeconds: 86400 },
        networkTimeoutSeconds: 10,
      },
    },
  ],
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify:       true,
  poweredByHeader: false,
  compress:        true,

  // Ensure Leaflet is transpiled for Next.js (ESM compat)
  transpilePackages: ['leaflet', 'react-leaflet'],

  experimental: {
    serverActions: { allowedOrigins: ['*'] },
  },

  images: {
    domains: ['bigvsbestroutes.com'],
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',        value: 'DENY'                          },
          { key: 'X-Content-Type-Options',  value: 'nosniff'                       },
          { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',      value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      { source: '/admin', destination: '/admin/dashboard', permanent: false },
    ]
  },
}

module.exports = withPWA(nextConfig)
