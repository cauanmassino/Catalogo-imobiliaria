import { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, BedDouble, Bath, Ruler, MapPin, ArrowUpRight } from 'lucide-react';
import { optimizedImage } from '../lib/sanity';
import type { Property } from '../lib/sanity';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const coverImage = property.images?.[0]
    ? optimizedImage(property.images[0], 960, 760)
    : '/placeholder-imovel.jpg';

  const locationLabel = [property.neighborhood, property.city].filter(Boolean).join(' · ');
  const priceLabel = property.price.toLocaleString('pt-BR');

  return (
    <motion.a
      href={`/imovel/${property.slug.current}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.99 }}
      className="group block h-full overflow-hidden rounded-[1.6rem] sm:rounded-[1.85rem] border border-mist bg-paper shadow-[0_12px_32px_rgba(22,21,19,0.06)] transition-shadow duration-300 hover:shadow-[0_22px_48px_rgba(22,21,19,0.10)]"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-ink/5">
        {!imageLoaded && <div className="skeleton absolute inset-0" />}

        <img
          src={coverImage}
          alt={property.images?.[0]?.alt || property.title}
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-[1.03]`}
          loading="lazy"
          decoding="async"
          width="960"
          height="760"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,8,8,0.48),rgba(8,8,8,0.03))] opacity-95 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/92 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-ink backdrop-blur-md">
            <KeyRound size={12} />
            {property.type === 'venda' ? 'Venda' : 'Aluguel'}
          </span>

          {property.featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/92 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-ink backdrop-blur-md">
              Destaque
            </span>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-white/72">
            <MapPin size={11} />
            {locationLabel || 'Brasília · DF'}
          </p>
          <h3 className="max-w-2xl font-display text-[1.35rem] sm:text-[1.7rem] font-semibold leading-tight text-white">
            {property.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-3 text-sm text-slate sm:grid-cols-3">
          {property.bedrooms !== undefined && (
            <div className="rounded-[1.15rem] border border-mist bg-white/65 px-4 py-3">
              <BedDouble size={15} className="mb-2 text-brass-dark" />
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate">Quartos</p>
              <p className="mt-1 font-semibold text-ink">{property.bedrooms}</p>
            </div>
          )}

          {property.bathrooms !== undefined && (
            <div className="rounded-[1.15rem] border border-mist bg-white/65 px-4 py-3">
              <Bath size={15} className="mb-2 text-brass-dark" />
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate">Banheiros</p>
              <p className="mt-1 font-semibold text-ink">{property.bathrooms}</p>
            </div>
          )}

          {property.area !== undefined && (
            <div className="rounded-[1.15rem] border border-mist bg-white/65 px-4 py-3">
              <Ruler size={15} className="mb-2 text-brass-dark" />
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate">Área</p>
              <p className="mt-1 font-semibold text-ink">{property.area}m²</p>
            </div>
          )}
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-mist pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate mb-1">Preço</p>
            <p className="font-display text-2xl font-bold tracking-tight text-ink tabular-nums">
              R$ {priceLabel}
            </p>
          </div>

          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-mist bg-paper text-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </motion.a>
  );
}