'use client';

import { useTranslations, useMessages } from 'next-intl';

interface StoryItem {
  kind: string;
  title: string;
  text: string;
}

const kindColors: Record<string, { bg: string; color: string }> = {
  documented: { bg: 'rgba(58, 122, 141, 0.14)', color: '#2d6375' },
  memory: { bg: 'rgba(212, 132, 61, 0.16)', color: '#a85520' },
  tradition: { bg: 'rgba(45, 90, 61, 0.14)', color: '#234830' },
};

export default function StoriesSection() {
  const t = useTranslations('stories');
  const messages = useMessages() as any;
  const items: StoryItem[] = messages?.stories?.items || [];

  return (
    <section id="stories" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
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

        <div className="space-y-8">
          {items.map((item, i) => {
            const palette = kindColors[item.kind] || kindColors.documented;
            return (
              <div
                key={i}
                className="rounded-xl p-7"
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={{ background: palette.bg, color: palette.color }}
                  >
                    {t(`kinds.${item.kind}`)}
                  </span>
                  <h3
                    className="font-display text-xl font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
