/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { ToastContainer } from 'react-toastify';

import SignUp from '@/app/[locale]/sign-up/page';
import { signUp } from '@/firebase/auth';
import messages from '@/messages/en.json';
import type { SignUpDto } from '@/validation/signUpSchema';

jest.mock('@/navigation', () => ({
  useRouterIntl() {
    return {
      replace: jest.fn(),
      refresh: jest.fn(),
    };
  },
}));

jest.mock('@/firebase/auth', () => ({
  signUp: jest.fn(),
  FirebaseError: jest.fn(),
}));

describe('SignUp', () => {
  const renderComponent = () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <SignUp />
        <ToastContainer />
      </NextIntlClientProvider>,
    );

    const usernameInput = screen.getByRole('textbox', { name: /username/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByRole('textbox', { name: 'Password Password' });
    const confirmInput = screen.getByRole('textbox', { name: /confirm/i });
    const submitButton = screen.getByRole('button', { name: /up/i });

    const fill = async (formData: SignUpDto) => {
      const user = userEvent.setup();

      if (formData.username) {
        await user.type(usernameInput, formData.username);
      }
      if (formData.email) {
        await user.type(emailInput, formData.email);
      }
      if (formData.password) {
        await user.type(passwordInput, formData.password);
      }
      if (formData.confirm) {
        await user.type(confirmInput, formData.confirm);
      }

      await user.click(submitButton);
    };

    const validData: SignUpDto = {
      username: 'User',
      email: 'mail@mail.com',
      password: 'Qwerty123$',
      confirm: 'Qwerty123$',
    };

    return {
      form: {
        usernameInput,
        emailInput,
        passwordInput,
        confirmInput,
        submitButton,
        fill,
        validData,
      },
    };
  };

  it('should render the sign up form', () => {
    const { form } = renderComponent();

    expect(form.usernameInput).toBeInTheDocument();
    expect(form.emailInput).toBeInTheDocument();
    expect(form.passwordInput).toBeInTheDocument();
    expect(form.confirmInput).toBeInTheDocument();
    expect(form.submitButton).toBeInTheDocument();
  });

  it('should not display validation errors if valid data is entered', async () => {
    const { form } = renderComponent();

    await form.fill(form.validData);

    expect(form.usernameInput).toBeValid();
    expect(form.emailInput).toBeValid();
    expect(form.passwordInput).toBeValid();
    expect(form.confirmInput).toBeValid();
    expect(form.submitButton).toBeValid();
    expect(signUp).toHaveBeenCalledWith(form.validData);
  });

  it('should show an error if sign up request fails', async () => {
    (signUp as jest.Mock).mockRejectedValueOnce(new Error('Sign up request fails.'));

    const { form } = renderComponent();
    await form.fill(form.validData);

    expect(screen.getByText('Sign up request fails.')).toBeInTheDocument();
  });

  describe('Username input', () => {
    it.each([
      {
        scenario: 'is missing',
        username: '',
        errorMessage: /required/i,
      },
    ])('should display errors if username $scenario', async ({ username, errorMessage }) => {
      const { form } = renderComponent();

      await form.fill({
        ...form.validData,
        username,
      });

      expect(form.usernameInput).not.toBeValid();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(signUp).not.toHaveBeenCalled();
    });
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
      expect(signUp).not.toHaveBeenCalled();
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
      expect(signUp).not.toHaveBeenCalled();
    });
  });

  describe('Confirm input', () => {
    it.each([
      {
        scenario: "don't match",
        password: 'Qwerty123$',
        confirm: 'Qwerty321$',
        errorMessage: /don't match/i,
      },
    ])('should display errors if passwords $scenario', async ({ password, confirm, errorMessage }) => {
      const { form } = renderComponent();

      await form.fill({
        ...form.validData,
        password,
        confirm,
      });

      expect(form.confirmInput).not.toBeValid();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(signUp).not.toHaveBeenCalled();
    });
  });
});
