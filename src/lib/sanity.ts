import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Preencha com os dados do seu projeto Sanity (painel sanity.io/manage)
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // true = respostas mais rápidas e em cache (ideal para o site público)
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Atalho para imagens otimizadas: pede ao CDN do Sanity para servir o melhor
// formato moderno suportado pelo navegador (AVIF/WebP) automaticamente,
// com qualidade ajustada — sem precisar gerar/hospedar variantes manualmente.
export function optimizedImage(source: any, width: number, height?: number) {
  let img = builder.image(source).auto('format').quality(80).width(width)
  if (height) img = img.height(height)
  return img.url()
}

// Tipagem central usada em todo o front-end
export interface Amenity {
  icon: string
  label: string
}

export interface NearbyPlace {
  icon: string
  label: string
  minutes: number
}

export interface Property {
  _id: string
  title: string
  slug: { current: string }
  city: string
  neighborhood?: string
  type: 'venda' | 'aluguel'
  price: number
  description?: string
  featured: boolean
  bedrooms?: number
  bathrooms?: number
  parkingSpots?: number
  area?: number
  images: any[]
  status?: 'lancamento' | 'em_construcao' | 'pronto'
  videoUrl?: string
  amenities?: Amenity[]
  nearbyPlaces?: NearbyPlace[]
}
