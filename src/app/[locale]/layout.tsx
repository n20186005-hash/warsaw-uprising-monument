import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = 'https://warsawuprisingmonument.com';

  const languages: Record<string, string> = {
    'zh': `${baseUrl}/zh`,
    'en': `${baseUrl}/en`,
    'pl': `${baseUrl}/pl`,
    'ru': `${baseUrl}/ru`,
    'de': `${baseUrl}/de`,
    'x-default': `${baseUrl}/`,
  };

  const selfUrl = languages[locale] || languages['zh'];

  let localeCode = 'en_US';
  if (locale === 'zh') localeCode = 'zh_CN';
  else if (locale === 'pl') localeCode = 'pl_PL';
  else if (locale === 'ru') localeCode = 'ru_RU';
  else if (locale === 'de') localeCode = 'de_DE';

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: "Warsaw Uprising Monument",
      locale: localeCode,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  let htmlLang = 'en';
  if (locale === 'zh') htmlLang = 'zh-CN';
  else if (locale === 'pl') htmlLang = 'pl';
  else if (locale === 'ru') htmlLang = 'ru';
  else if (locale === 'de') htmlLang = 'de';

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
