import { getLocale, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

// plac Krasińskich, Warsaw — monument coordinates
const LAT = 52.249386;
const LON = 21.0059007;
const TIME_ZONE = 'Europe/Warsaw';

interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  precipitation: number;
  is_day: number;
}

interface DailyForecast {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

interface WeatherPayload {
  current?: CurrentWeather;
  daily?: DailyForecast;
}

// WMO weather interpretation codes → display category
function weatherCategory(code: number): string {
  if (code === 0) return 'clear';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code === 61 || code === 63 || code === 65 || code === 66 || code === 67) return 'rain';
  if (code === 71 || code === 73 || code === 75 || code === 77) return 'snow';
  if (code >= 80 && code <= 82) return 'rain';
  if (code === 85 || code === 86) return 'snow';
  if (code >= 95) return 'thunder';
  return 'clear';
}

const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const weatherIcons: Record<string, (isDay: boolean) => ReactNode> = {
  clear: (isDay) =>
    isDay ? (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    ) : (
      <svg {...iconProps}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    ),
  partly: () => (
    <svg {...iconProps}>
      <path d="M12 2v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="M20 12h2" />
      <path d="m19.07 19.07 1.41 1.41" />
      <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
      <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
    </svg>
  ),
  overcast: () => (
    <svg {...iconProps}>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
  fog: () => (
    <svg {...iconProps}>
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M16 17H7" />
      <path d="M17 21H9" />
    </svg>
  ),
  drizzle: () => (
    <svg {...iconProps}>
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M8 19v1" />
      <path d="M8 14v1" />
      <path d="M16 19v1" />
      <path d="M16 14v1" />
      <path d="M12 21v1" />
      <path d="M12 16v1" />
    </svg>
  ),
  rain: () => (
    <svg {...iconProps}>
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M16 14v6" />
      <path d="M8 14v6" />
      <path d="M12 16v6" />
    </svg>
  ),
  snow: () => (
    <svg {...iconProps}>
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M8 15h.01" />
      <path d="M8 19h.01" />
      <path d="M12 17h.01" />
      <path d="M12 21h.01" />
      <path d="M16 15h.01" />
      <path d="M16 19h.01" />
    </svg>
  ),
  thunder: () => (
    <svg {...iconProps}>
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  ),
};

async function fetchWeather(): Promise<WeatherPayload | null> {
  try {
    const params = new URLSearchParams({
      latitude: String(LAT),
      longitude: String(LON),
      current:
        'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,is_day',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      timezone: TIME_ZONE,
      forecast_days: '5',
    });
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
      // Server-side cache: refresh at most every 30 minutes
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    return (await res.json()) as WeatherPayload;
  } catch {
    return null;
  }
}

function parseDay(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export default async function WeatherSection() {
  const t = await getTranslations('weather');
  const locale = await getLocale();
  const data = await fetchWeather();

  if (!data?.current || !data?.daily) return null;

  const current = data.current;
  const daily = data.daily;
  const currentCat = weatherCategory(current.weather_code);
  const uiLocale = locale === 'zh' ? 'zh-CN' : locale;
  const dayFormatter = new Intl.DateTimeFormat(uiLocale, { weekday: 'short', timeZone: 'UTC' });

  const metrics = [
    { label: t('humidity'), value: `${current.relative_humidity_2m}%` },
    { label: t('wind'), value: `${Math.round(current.wind_speed_10m)} km/h` },
    {
      label: t('precipitation'),
      value: current.precipitation > 0 ? `${current.precipitation.toFixed(1)} mm` : '0 mm',
    },
  ];

  return (
    <section id="weather" className="section-padding">
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

        <div
          className="rounded-2xl p-6 sm:p-8 mb-6"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex items-center gap-5">
              <div
                className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                {weatherIcons[currentCat](current.is_day === 1)}
              </div>
              <div>
                <div
                  className="text-4xl sm:text-5xl font-semibold leading-none"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {Math.round(current.temperature_2m)}°C
                </div>
                <div className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                  {t(`codes.${currentCat}`)} · {t('feelsLike')} {Math.round(current.apparent_temperature)}°C
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 flex-1 lg:ml-auto lg:max-w-md">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl px-3 py-4 text-center"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                >
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {m.value}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h3
          className="font-display text-xl font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('forecast')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {daily.time.map((date, i) => {
            const cat = weatherCategory(daily.weather_code[i]);
            const isToday = i === 0;
            const precip = daily.precipitation_probability_max[i];
            return (
              <div
                key={date}
                className="rounded-xl p-4 text-center"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
              >
                <div
                  className="text-sm font-semibold mb-3"
                  style={{ color: isToday ? 'var(--accent)' : 'var(--text-secondary)' }}
                >
                  {isToday ? t('today') : dayFormatter.format(parseDay(date))}
                </div>
                <div className="flex justify-center mb-3" style={{ color: 'var(--accent)' }}>
                  {weatherIcons[cat](true)}
                </div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {Math.round(daily.temperature_2m_max[i])}° / {Math.round(daily.temperature_2m_min[i])}°
                </div>
                {precip != null && (
                  <div className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
                    {t('precipProb')} {precip}%
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          <span>
            {t('sourceNote')} · {t('updated')} {current.time}
          </span>
          <span>{t('updatedSoon')}</span>
        </div>
      </div>
    </section>
  );
}
