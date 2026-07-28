import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

// Cliente do Sanity usado no front-end público
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(sanityClient)

// Builder encadeável para casos em que você queira fazer:
// urlFor(image).width(1200).height(800).url()
export function urlFor(source: any) {
  return builder.image(source)
}

// Atalho para retornar a URL pronta já otimizada
export function optimizedImage(source: any, width: number, height?: number) {
  if (!source) return '/placeholder-imovel.jpg'

  let img = builder.image(source).auto('format').quality(80).width(width)

  if (height) {
    img = img.height(height)
  }

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