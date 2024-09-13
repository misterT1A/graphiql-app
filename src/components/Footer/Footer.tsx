'use client';

import { Link } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import type { ReactElement } from 'react';

import GithubOutlineIcon from './GithubOutlineIcon';
import RssLogo from './RssLogo';

const githubLinks = (t: ReturnType<typeof useTranslations<'Home.team'>>): { href: string; label: string }[] => [
  {
    href: 'https://github.com/mistert1a',
    label: t('developer1.name'),
  },
  {
    href: 'https://github.com/pahanchickt',
    label: t('developer2.name'),
  },
  {
    href: 'https://github.com/ru-ab',
    label: t('developer3.name'),
  },
];

export const Footer = (): ReactElement => {
  const { theme } = useTheme();
  const t = useTranslations('Home.team');

  return (
    <footer className="flex-grow-0 mt-4 p-4 flex border-t-1 border-t-default-400">
      <div className="flex-1 flex flex-wrap gap-1">
        {githubLinks(t).map((link) => (
          <Link key={link.href} href={link.href} target="_blank" className="flex gap-1 text-small">
            <span className="flex-shrink-0">
              <GithubOutlineIcon fill={theme === 'light' ? '#000' : '#fff'} />
            </span>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex-1 max-w-8 flex justify-center items-center">
        <span className="text-small text-default-500">2024</span>
      </div>
      <div className="flex-1 flex justify-end">
        <Link href="https://rs.school/courses/reactjs" target="_blank">
          <RssLogo />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

