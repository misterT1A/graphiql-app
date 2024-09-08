import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import NotFound from '@/app/[locale]/not-found';
import messages from '@/messages/en.json';

describe('NotFound', () => {
  it('should render the not found page', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <NotFound />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('404'));
    expect(screen.getByText(/doesn't exist/i));
  });
});

