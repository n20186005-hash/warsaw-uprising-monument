import { useTranslations, useMessages } from 'next-intl';

interface NearbyItem {
  name: string;
  alt: string;
  distance: string;
  desc: string;
  url: string;
}

export default function NearbySection() {
  const t = useTranslations('nearby');
  const messages = useMessages() as any;
  const items: NearbyItem[] = messages?.nearby?.items || [];

  return (
    <section id="nearby" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
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
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3
                  className="font-display text-lg font-semibold leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.name}
                </h3>
                <span
                  className="flex-shrink-0 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  {item.distance}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed mb-4 flex-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.alt}
              </p>
              <p
                className="text-sm leading-relaxed mb-4 flex-1"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.desc}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                {t('viewMap')}
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
