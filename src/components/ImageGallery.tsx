import { useState, useCallback } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Grid2x2, Expand } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const SWIPE_THRESHOLD = 60;

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.x > SWIPE_THRESHOLD) showPrev();
    else if (info.offset.x < -SWIPE_THRESHOLD) showNext();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  }

  if (!images?.length) return null;

  return (
    <>
      <div className="property-gallery">
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="property-gallery__hero group"
          aria-label="Abrir galeria de imagens"
        >
          <img
            src={images[0]}
            alt={alt}
            className="property-gallery__image"
            loading="eager"
            decoding="async"
          />

          <div className="property-gallery__overlay" />

          <div className="property-gallery__hero-top">
            <span className="property-gallery__pill">
              <Expand size={14} />
              Ver em tela cheia
            </span>
          </div>

          <div className="property-gallery__hero-bottom">
            <span className="property-gallery__count">
              <Grid2x2 size={14} />
              {images.length} fotos
            </span>
          </div>
        </button>

        {images.slice(1, 5).map((url, i) => (
          <button
            type="button"
            key={url}
            onClick={() => setOpenIndex(i + 1)}
            className="property-gallery__thumb group hidden sm:block"
            aria-label={`Abrir imagem ${i + 2}`}
          >
            <img
              src={url}
              alt={`${alt} ${i + 2}`}
              className="property-gallery__image"
              loading="lazy"
              decoding="async"
            />

            <div className="property-gallery__overlay property-gallery__overlay--soft" />

            {i === 3 && images.length > 5 && (
              <span className="property-gallery__more">
                +{images.length - 5} fotos
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            className="property-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="property-lightbox__dialog"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleKeyDown}
              tabIndex={-1}
            >
              <div className="property-lightbox__topbar">
                <span className="property-lightbox__index">
                  {openIndex + 1} / {images.length}
                </span>

                <button
                  type="button"
                  onClick={close}
                  className="property-lightbox__icon"
                  aria-label="Fechar galeria"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="property-lightbox__stage">
                <button
                  type="button"
                  onClick={showPrev}
                  className="property-lightbox__nav property-lightbox__nav--left"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft size={22} />
                </button>

                <motion.img
                  key={images[openIndex]}
                  src={images[openIndex]}
                  alt={`${alt} ${openIndex + 1}`}
                  className="property-lightbox__image"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                />

                <button
                  type="button"
                  onClick={showNext}
                  className="property-lightbox__nav property-lightbox__nav--right"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              <div className="property-lightbox__thumbs">
                {images.map((url, i) => (
                  <button
                    type="button"
                    key={url}
                    onClick={() => setOpenIndex(i)}
                    className={`property-lightbox__thumb ${
                      i === openIndex ? 'is-active' : ''
                    }`}
                    aria-label={`Abrir imagem ${i + 1}`}
                  >
                    <img src={url} alt={`${alt} miniatura ${i + 1}`} />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}