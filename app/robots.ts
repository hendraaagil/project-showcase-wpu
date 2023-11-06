import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://project-showcase-wpu.vercel.app/sitemap.xml',
    host: 'https://project-showcase-wpu.vercel.app',
  }
}
