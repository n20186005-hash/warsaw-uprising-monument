'use client';

import { useTranslations, useMessages } from 'next-intl';

interface SourceItem {
  name: string;
  url: string;
}

export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const items: SourceItem[] = messages?.sources?.items || [];

  return (
    <section id="sources" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-4 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mx-auto mb-6" style={{ background: 'var(--accent)' }} />
        <p
          className="text-center text-base leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('subtitle')}
        </p>

        <div className="rounded-xl p-7" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
          <ul className="space-y-4">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg
                  className="w-4 h-4 mt-1 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: 'var(--accent)' }}
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium hover:underline"
                  style={{ color: 'var(--accent)' }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
