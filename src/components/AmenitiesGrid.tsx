import { motion } from 'framer-motion';
import { amenityIcons } from '../lib/icons';
import type { Amenity } from '../lib/sanity';

interface AmenitiesGridProps {
  amenities: Amenity[];
}

export default function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {amenities.map((item, i) => {
        const Icon = amenityIcons[item.icon];
        return (
          <motion.div
            key={`${item.icon}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
            className="flex flex-col items-center gap-2 bg-white border border-mist rounded-2xl p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <div className="w-11 h-11 rounded-full bg-brass-soft flex items-center justify-center">
              {Icon ? <Icon size={20} className="text-brass-dark" /> : null}
            </div>
            <p className="text-sm font-medium text-ink">{item.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
