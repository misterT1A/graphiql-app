import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export type Locale = 'en' | 'ru';

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = [defaultLocale, 'ru'];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) {
    return notFound();
  }

  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
