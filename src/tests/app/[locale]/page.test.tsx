/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import Home from '@/app/[locale]/page';
import type { User } from '@/context/AuthContext';
import { AuthProvider } from '@/context/AuthProvider';
import messages from '@/messages/en.json';

jest.mock('@/navigation', () => ({
  useRouterIntl() {
    return {
      replace: jest.fn(),
      refresh: jest.fn(),
    };
  },
}));

describe('Home', () => {
  const user: User = {
    displayName: 'Username',
  } as User;

  const renderComponent = (user: User | null = null) => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <AuthProvider user={user}>
          <Home />
        </AuthProvider>
      </NextIntlClientProvider>,
    );
  };

  it('should render sign in and sign up links if user is not authorized', () => {
    renderComponent();

    const welcome = screen.getByText(/welcome/i);
    const signInLink = screen.getByRole('link', { name: /sign in/i });
    const signUpLink = screen.getByRole('link', { name: /sign up/i });

    expect(welcome).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/sign-in');
    expect(signUpLink).toHaveAttribute('href', '/sign-up');
  });

  it('should render restfull, graphiql and history links if user is authorized', () => {
    renderComponent(user);

    const welcome = screen.getByText(/welcome back/i);
    const username = screen.getByText(new RegExp(user.displayName!));
    const restfullLink = screen.getByRole('link', { name: /rest/i });
    const graphiqlLink = screen.getByRole('link', { name: /graphiql/i });
    const historyLink = screen.getByRole('link', { name: /history/i });

    expect(welcome).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(restfullLink).toHaveAttribute('href', '/GET');
    expect(graphiqlLink).toHaveAttribute('href', '/GRAPHQL');
    expect(historyLink).toHaveAttribute('href', '/history');
  });
});
