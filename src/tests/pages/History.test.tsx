import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import HistoryPage from '@/app/[locale]/history/page';
import messages from '@/messages/en.json';

describe('HistoryPage', () => {
  it('Should render page', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <HistoryPage />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText('History requests')).toBeInTheDocument();
  });
});
