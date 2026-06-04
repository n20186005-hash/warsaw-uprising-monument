'use client';

import { useTranslations } from 'next-intl';
import { useState, useCallback } from 'react';

const photos = [
  { src: '/gallery/image-1.jpg', alt: '华沙起义纪念碑全景' },
  { src: '/gallery/image-2.jpg', alt: '战斗反抗雕塑群' },
  { src: '/gallery/image-3.jpg', alt: '废墟求生雕塑群' },
  { src: '/gallery/image-4.jpg', alt: '纪念广场全貌' },
  { src: '/gallery/image-5.jpg', alt: '雕塑细节特写' },
  { src: '/gallery/image-6.jpg', alt: '暮色氛围' },
  { src: '/gallery/image-7.jpg', alt: '历史纪念区域' },
  { src: '/gallery/image-8.jpg', alt: '华沙城市天际线' },
  { src: '/gallery/image-9.jpg', alt: '华沙起义纪念碑全景' },
  { src: '/gallery/image-10.jpg', alt: '战斗反抗雕塑群' },
  { src: '/gallery/image-11.jpg', alt: '废墟求生雕塑群' },
  { src: '/gallery/image-12.jpg', alt: '纪念广场全貌' },
  { src: '/gallery/image-13.jpg', alt: '雕塑细节特写' },
  { src: '/gallery/image-14.jpg', alt: '暮色氛围' },
];

export default function Gallery() {
  const t = useTranslations('gallery');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayedPhotos = showAll ? photos : photos.slice(0, 8);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, []);

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  return (
    <>
      <section id="gallery" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <p className="mb-8" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
          <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {displayedPhotos.map((photo, i) => (
                <div
                  key={i}
                  className={`gallery-item relative group cursor-pointer ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                  onClick={() => {
                    setCurrentIndex(i);
                    openLightbox();
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ minHeight: i === 0 ? '400px' : '180px' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors rounded-lg flex items-end">
                    <p className="text-white text-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {photo.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
              aria-label="Previous photo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-colors"
              aria-label="Next photo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="flex justify-center mt-6 gap-4 items-center">
              {photos.length > 8 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-sm font-medium px-6 py-2.5 rounded-full transition-colors"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {showAll ? t('hidePhotos') : t('showAllPhotos')}
                </button>
              )}
              <a
                href="https://maps.app.goo.gl/o1op4p1Fq98DU4WF9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                {t('viewAll')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <img
            src={photos[currentIndex].src}
            alt={photos[currentIndex].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next photo"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
