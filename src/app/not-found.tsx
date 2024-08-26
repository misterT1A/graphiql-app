import '@/styles/_normalize.scss';
import { Inter } from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';
import type { ReactElement } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function NotFound(): ReactElement {
  const t = useTranslations('NotFound');
  const locale = useLocale();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <div>{t('message')}</div>
      </body>
    </html>
  );
}
