import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const baseUrl = 'https://warsawuprisingmonument.com';
  
  const languages: Record<string, string> = {
    'zh': `${baseUrl}/zh/cookie-settings`,
    'en': `${baseUrl}/en/cookie-settings`,
    'pl': `${baseUrl}/pl/cookie-settings`,
    'ru': `${baseUrl}/ru/cookie-settings`,
    'de': `${baseUrl}/de/cookie-settings`,
    'x-default': `${baseUrl}/cookie-settings`,
  };

  const { locale } = await params;
  const selfUrl = languages[locale] || languages['zh'];

  return {
    alternates: {
      canonical: selfUrl,
      languages,
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
