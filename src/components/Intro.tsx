import { useTranslations, useMessages, useLocale } from 'next-intl';

// Per-locale Wikipedia article for entity disambiguation.
// Titles verified to exist (de falls back to the canonical EN article).
const wikiUrls: Record<string, string> = {
  en: 'https://en.wikipedia.org/wiki/Warsaw_Uprising_Monument',
  zh: 'https://zh.wikipedia.org/wiki/华沙起义纪念碑',
  pl: 'https://pl.wikipedia.org/wiki/Pomnik_Powstania_Warszawskiego',
  ru: 'https://ru.wikipedia.org/wiki/Памятник_участникам_Варшавского_восстания',
  de: 'https://en.wikipedia.org/wiki/Warsaw_Uprising_Monument',
};

const museumUrls: Record<string, string> = {
  pl: 'https://www.1944.pl/',
  en: 'https://www.1944.pl/en/',
  zh: 'https://www.1944.pl/en/',
  ru: 'https://www.1944.pl/en/',
  de: 'https://www.1944.pl/en/',
};

export default function Intro() {
  const t = useTranslations('intro');
  const tOff = useTranslations('officialManagement');
  const messages = useMessages() as any;
  const locale = useLocale();
  const items: string[] = messages?.intro?.visitGuide?.items || [];
  const alsoKnownAsItems: string[] = messages?.intro?.alsoKnownAs?.items || [];
  const description: string = messages?.intro?.description || '';
  const paragraphs: string[] = description.split('\n\n').filter((p: string) => p.trim().length > 0);
  const wikiUrl = wikiUrls[locale] || wikiUrls.en;
  const museumUrl = museumUrls[locale] || museumUrls.en;

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {/* Entity-rich first paragraph: name, Polish name, year, exact address */}
        <p
          className="text-lg leading-relaxed mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('lead')}
        </p>

        {/* Outbound authoritative links for entity disambiguation */}
        <div
          className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8 text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          <span>{t('learnMoreLabel')}</span>
          <a
            href={wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            Wikipedia
          </a>
          <span>·</span>
          <a
            href={museumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: 'var(--accent)' }}
          >
            {t('linkMuseum')}
          </a>
        </div>

        {paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="text-lg leading-relaxed mb-6"
            style={{ color: 'var(--text-secondary)' }}
          >
            {paragraph}
          </p>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('visitGuide.title')}
            </h3>
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('alsoKnownAs.title')}
            </h3>
            <ul className="space-y-3">
              {alsoKnownAsItems.map((keyword, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 sm:p-8 rounded-xl border border-[var(--accent)]" style={{ background: 'var(--bg-tertiary)' }}>
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {tOff('title')}
          </h2>
          <div className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
            {tOff('text')}
          </div>
        </div>
      </div>
    </section>
  );
}
