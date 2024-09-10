import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import HistoryView from '@/components/HistoryView/HistoryView';
import messages from '@/messages/en.json';

describe('HistoryView', () => {
  it('Should render component', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <HistoryView />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText('Rest Client')).toBeInTheDocument();
  });
});
