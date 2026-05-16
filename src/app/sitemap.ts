import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bigvsbestroutes.com'
  return [
    { url: base,                changeFrequency: 'weekly', priority: 1.0  },
    { url: `${base}/features`,  changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/use-cases`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/demo`,      changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/contact`,   changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/install`,   changeFrequency: 'monthly', priority: 0.7 },
  ]
}
