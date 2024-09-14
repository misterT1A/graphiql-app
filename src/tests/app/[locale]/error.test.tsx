import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import Error from '@/app/[locale]/error';
import messages from '@/messages/en.json';
import { useRouterIntl } from '@/navigation';

jest.mock('@/navigation', () => ({
  useRouterIntl: jest.fn(),
}));

describe('Error component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouterIntl as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render error message and button', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <Error />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });

  test('Should call router.push when button is clicked', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <Error />
      </NextIntlClientProvider>,
    );

    const button = screen.getByRole('button', { name: 'To main page' });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
