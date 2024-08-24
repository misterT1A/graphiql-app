'use client';

import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { type ReactElement } from 'react';

import { MoonIcon } from './MoonIcon';
import { SunIcon } from './SunIcon';

const ThemTogler = (): ReactElement | null => {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      defaultSelected={theme === 'light'}
      size="lg"
      color="secondary"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    ></Switch>
  );
};

export default ThemTogler;
