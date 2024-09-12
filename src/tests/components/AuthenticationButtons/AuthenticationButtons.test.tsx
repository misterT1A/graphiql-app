/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';

import { AuthenticationButtons } from '@/components/AuthenticationButtons/AuthenticationButtons';
import type { User } from '@/context/AuthContext';
import { AuthProvider } from '@/context/AuthProvider';
import { signOut } from '@/firebase/auth';
import messages from '@/messages/en.json';

jest.mock('@/navigation', () => ({
  useRouterIntl() {
    return {
      replace: jest.fn(),
      refresh: jest.fn(),
    };
  },
}));

jest.mock('@/firebase/auth', () => ({
  signOut: jest.fn(),
}));

describe('AuthenticationButtons', () => {
  const signedInUser = { email: 'user@mail.com', displayName: 'User' };

  const renderComponent = (user: Partial<User> | null = null) => {
    render(
      <AuthProvider user={user as User}>
        <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
          <AuthenticationButtons />
        </NextIntlClientProvider>
      </AuthProvider>,
    );
  };

  it('should render "Sign In" and "Sign Up" buttons if user is not authenticated', () => {
    renderComponent();

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    const signUpButton = screen.getByRole('button', { name: /sign up/i });

    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  it('should render the "Sign Out" button if user is authenticated', () => {
    renderComponent(signedInUser);

    const signOutButton = screen.getByRole('button', { name: /sign out/i });

    expect(signOutButton).toBeInTheDocument();
  });

  it('should log out when the "Sign Out" button is clicked', async () => {
    renderComponent(signedInUser);

    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    const user = userEvent.setup();
    await user.click(signOutButton);

    expect(signOut).toHaveBeenCalled();
  });
});
