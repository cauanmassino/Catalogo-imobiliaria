import { motion } from 'framer-motion';
import { nearbyIcons } from '../lib/icons';
import type { NearbyPlace } from '../lib/sanity';

interface NearbyPlacesProps {
  places: NearbyPlace[];
}

export default function NearbyPlaces({ places }: NearbyPlacesProps) {
  if (!places || places.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {places.map((place, i) => {
        const Icon = nearbyIcons[place.icon];
        return (
          <motion.div
            key={`${place.icon}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
            className="flex items-center gap-3 bg-white border border-mist rounded-2xl p-4"
          >
            <div className="w-10 h-10 shrink-0 rounded-full bg-ink/5 flex items-center justify-center">
              {Icon ? <Icon size={18} className="text-ink" /> : null}
            </div>
            <div>
              <p className="text-sm font-medium text-ink">{place.label}</p>
              <p className="text-xs font-mono text-slate">{place.minutes} min</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
