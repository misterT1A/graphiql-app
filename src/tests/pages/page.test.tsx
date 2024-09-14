import { render } from '@testing-library/react';
import { redirect } from 'next/navigation';

import RootPage from '@/app/page';
import { defaultLocale } from '@/i18n';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('RootPage', () => {
  it('should redirect to the default locale', () => {
    const mockRedirect = redirect as jest.MockedFunction<typeof redirect>;

    render(<RootPage />);
    expect(mockRedirect).toHaveBeenCalledWith(defaultLocale);
  });
});
