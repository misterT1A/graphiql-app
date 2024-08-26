'use client';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import type { Key, ReactElement } from 'react';

import { locales, type Locale } from '@/i18n';
import { usePathnameIntl, useRouterIntl } from '@/navigation';

const LangDropdown = (): ReactElement => {
  const router = useRouterIntl();
  const pathname = usePathnameIntl();
  const locale = useLocale();

  const changeLocale = (locale: Key): void => {
    router.replace(pathname, { locale: locale as Locale });
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light">{locale.toUpperCase()}</Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={new Set([locale])}
        onAction={changeLocale}
      >
        {locales.map((locale) => (
          <DropdownItem key={locale}>{locale.toUpperCase()}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default LangDropdown;
