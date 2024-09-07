/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { ToastContainer } from 'react-toastify';

import SignIn from '@/app/[locale]/sign-in/page';
import { signIn } from '@/firebase/auth';
import messages from '@/messages/en.json';
import type { SignInDto } from '@/validation/signInSchema';

jest.mock('@/navigation', () => ({
  useRouterIntl() {
    return {
      replace: jest.fn(),
      refresh: jest.fn(),
    };
  },
}));

jest.mock('@/firebase/auth', () => ({
  signIn: jest.fn(),
}));

describe('SignIn', () => {
  const renderComponent = () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <SignIn />
        <ToastContainer />
      </NextIntlClientProvider>,
    );

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByRole('textbox', { name: 'Password Password' });
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    const fill = async (formData: SignInDto) => {
      const user = userEvent.setup();

      if (formData.email) {
        await user.type(emailInput, formData.email);
      }
      if (formData.password) {
        await user.type(passwordInput, formData.password);
      }

      await user.click(submitButton);
    };

    const validData: SignInDto = {
      email: 'mail@mail.com',
      password: 'Qwerty123$',
    };

    return {
      form: {
        emailInput,
        passwordInput,
        submitButton,
        fill,
        validData,
      },
    };
  };

  it('should render the sign in form', () => {
    const { form } = renderComponent();

    expect(form.emailInput).toBeInTheDocument();
    expect(form.passwordInput).toBeInTheDocument();
    expect(form.submitButton).toBeInTheDocument();
  });

  it('should not display validation errors if valid data is entered', async () => {
    const { form } = renderComponent();

    await form.fill(form.validData);

    expect(form.emailInput).toBeValid();
    expect(form.passwordInput).toBeValid();
    expect(form.submitButton).toBeValid();
    expect(signIn).toHaveBeenCalledWith(form.validData);
  });

  it('should show an error if sign in request fails', async () => {
    (signIn as jest.Mock).mockRejectedValueOnce(new Error('Sign in request fails.'));

    const { form } = renderComponent();
    await form.fill(form.validData);

    expect(screen.getByText('Sign in request fails.')).toBeInTheDocument();
  });

  describe('Email input', () => {
    it.each([
      { scenario: 'is missing', email: '', errorMessage: /invalid email/i },
      { scenario: 'is not an valid email', email: 'mail@', errorMessage: /invalid email/i },
      { scenario: 'includes spaces', email: 'mail@ma il.com', errorMessage: /invalid email/i },
    ])('should display errors if email $scenario', async ({ email, errorMessage }) => {
      const { form } = renderComponent();

      await form.fill({
        ...form.validData,
        email,
      });

      expect(form.emailInput).not.toBeValid();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(signIn).not.toHaveBeenCalled();
    });
  });

  describe('Password input', () => {
    it.each([
      {
        scenario: 'is missing',
        password: '',
        errorMessage: /at least 8/i,
      },
      {
        scenario: 'shorter than 8 characters',
        password: 'a'.repeat(7),
        errorMessage: /at least 8/i,
      },
      {
        scenario: 'not contains special characters',
        password: 'a'.repeat(4) + '1'.repeat(4),
        errorMessage: /at least 1 special/i,
      },
      {
        scenario: 'not contains letters',
        password: '$'.repeat(4) + '1'.repeat(4),
        errorMessage: /at least 1 letter/i,
      },
      {
        scenario: 'not contains digits',
        password: 'a'.repeat(4) + '$'.repeat(4),
        errorMessage: /at least 1 digit/i,
      },
    ])('should display errors if password $scenario', async ({ password, errorMessage }) => {
      const { form } = renderComponent();

      await form.fill({
        ...form.validData,
        password,
      });

      expect(form.passwordInput).not.toBeValid();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(signIn).not.toHaveBeenCalled();
    });
  });
});
