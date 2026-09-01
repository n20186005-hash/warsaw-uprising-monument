'use client';

import { useTranslations, useMessages } from 'next-intl';

interface FacilityItem {
  icon: string;
  title: string;
  desc: string;
  hint: string;
}

const icons: Record<string, React.ReactNode> = {
  toilet: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21h4v-4h8v4h4" />
      <path d="M3 11l1.5-7h3L9 11" />
      <path d="M15 11l1.5-7h3L21 11" />
      <path d="M2 15h20v6H2z" />
    </svg>
  ),
  parking: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  ),
  food: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3v7a2 2 0 0 0 4 0V3" />
      <path d="M6 3v18" />
      <path d="M14 3c0 3 2 4 2 7s-2 4-2 7" />
      <path d="M18 3v18" />
    </svg>
  ),
  bed: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9v11" />
      <path d="M2 13h20v7" />
      <path d="M22 9v4H2v-4a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4z" />
      <path d="M6 11v2" />
      <path d="M18 11v2" />
    </svg>
  ),
  shop: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8l1-4h14l1 4" />
      <path d="M3 8h18v12H3z" />
      <path d="M9 8v3a3 3 0 0 0 6 0V8" />
    </svg>
  ),
  fuel: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v15" />
      <path d="M3 21h12" />
      <path d="M15 10h3a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V9l-3-3" />
      <path d="M6 7h5" />
    </svg>
  ),
};

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items: FacilityItem[] = messages?.facilities?.items || [];

  return (
    <section id="facilities" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-4 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mx-auto mb-6" style={{ background: 'var(--accent)' }} />
        <p
          className="text-center text-base leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6 flex flex-col"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  {icons[item.icon] || icons.shop}
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
                >
                  {item.hint}
                </span>
              </div>
              <h3
                className="font-display text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-10 rounded-xl p-5 text-sm leading-relaxed"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
        >
          <p style={{ color: 'var(--text-secondary)' }}>{t('note')}</p>
        </div>
      </div>
    </section>
  );
}
