import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/static'
import sanity from '@sanity/astro'
import { loadEnv } from 'vite'

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '')

export default defineConfig({
  output: 'static',
  adapter: vercel(),
  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2026-03-01',
      useCdn: false,
    }),
    react(),
    tailwind(),
  ],
})