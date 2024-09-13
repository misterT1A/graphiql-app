/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import Header from '@/components/Header/Header';
import messages from '@/messages/en.json';

jest.mock('@/navigation', () => ({
  useRouterIntl() {
    return {
      replace: jest.fn(),
      refresh: jest.fn(),
    };
  },
  usePathnameIntl() {
    return '';
  },
}));

jest.mock('@/components/AuthenticationButtons/AuthenticationButtons', () => ({
  AuthenticationButtons: () => <div>AuthenticationButtons</div>,
}));

describe('Header', () => {
  it('should render Header component', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <Header />
      </NextIntlClientProvider>,
    );

    const logo = screen.getByRole('link');
    const menuListItems = screen.getAllByRole('listitem');
    const langButtons = screen.getAllByRole('button', { name: /en/i });

    expect(logo).toHaveAttribute('href', '/');
    expect(menuListItems).toHaveLength(3);
    expect(langButtons).toHaveLength(2);
  });
});

