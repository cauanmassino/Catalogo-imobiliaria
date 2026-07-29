import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const SWIPE_THRESHOLD = 60;

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const total = safeImages.length;

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + total) % total);
    setOpenIndex((i) => (i === null ? null : (i - 1 + total) % total));
  }, [total]);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % total);
    setOpenIndex((i) => (i === null ? null : (i + 1) % total));
  }, [total]);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setOpenIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setOpenIndex(null);
  }, []);

  const selectImage = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.x > SWIPE_THRESHOLD) showPrev();
    else if (info.offset.x < -SWIPE_THRESHOLD) showNext();
  }

  useEffect(() => {
    if (openIndex === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [openIndex, closeLightbox, showPrev, showNext]);

  if (!total) return null;

  const currentImage = safeImages[activeIndex];

  return (
    <>
      <section className="mb-10">
        <div className="relative overflow-hidden rounded-[28px] bg-mist">
          <motion.button
            type="button"
            onClick={() => openLightbox(activeIndex)}
            className="group relative block w-full cursor-zoom-in"
            whileTap={{ scale: 0.995 }}
          >
            <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] overflow-hidden bg-mist">
              <motion.img
                key={currentImage}
                src={currentImage}
                alt={`${alt} - foto ${activeIndex + 1}`}
                className="h-full w-full object-cover"
                initial={{ opacity: 0.92, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-100 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
              {activeIndex + 1} / {total}
            </div>

            <div className="absolute bottom-4 right-4 hidden items-center gap-2 rounded-full bg-white/88 px-3 py-2 text-sm font-medium text-ink shadow-lg backdrop-blur sm:flex">
              <Expand size={16} />
              Ver fotos
            </div>
          </motion.button>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-ink shadow-md backdrop-blur transition hover:bg-white"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Próxima foto"
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-ink shadow-md backdrop-blur transition hover:bg-white"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>

        {total > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
            {safeImages.map((url, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${url}-${index}`}
                  type="button"
                  onClick={() => selectImage(index)}
                  className={`relative shrink-0 snap-start overflow-hidden rounded-2xl border transition ${
                    isActive
                      ? 'border-gold shadow-md ring-2 ring-gold/30'
                      : 'border-sand/70 opacity-85 hover:opacity-100'
                  }`}
                  aria-label={`Abrir foto ${index + 1}`}
                  aria-pressed={isActive}
                >
                  <img
                    src={url}
                    alt={`${alt} - miniatura ${index + 1}`}
                    className="h-20 w-28 object-cover sm:h-24 sm:w-36"
                    loading="lazy"
                    decoding="async"
                  />

                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-gold" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
            aria-label="Galeria de fotos do imóvel"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Fechar galeria"
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X size={22} />
            </button>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Foto anterior"
                  className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:flex"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  aria-label="Próxima foto"
                  className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:flex"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <motion.div
              className="relative flex w-full max-w-6xl items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={safeImages[openIndex]}
                src={safeImages[openIndex]}
                alt={`${alt} - foto ampliada ${openIndex + 1}`}
                className="max-h-[85vh] w-auto max-w-full select-none rounded-2xl object-contain touch-pan-y"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </motion.div>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur">
              {openIndex + 1} / {total}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}