/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import Footer from '@/components/Footer/Footer';
import messages from '@/messages/en.json';

describe('Footer', () => {
  it('should render Header component', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <Footer />
      </NextIntlClientProvider>,
    );

    const developer1GithubLink = screen.getByRole('link', { name: messages.Home.team.developer1.name });
    const developer2GithubLink = screen.getByRole('link', { name: messages.Home.team.developer2.name });
    const developer3GithubLink = screen.getByRole('link', { name: messages.Home.team.developer3.name });
    const year = screen.getByText('2024');
    const allLinks = screen.getAllByRole('link');

    expect(developer1GithubLink).toHaveAttribute('href', expect.stringMatching(/^https:\/\/github.com/i));
    expect(developer2GithubLink).toHaveAttribute('href', expect.stringMatching(/^https:\/\/github.com/i));
    expect(developer3GithubLink).toHaveAttribute('href', expect.stringMatching(/^https:\/\/github.com/i));
    expect(year).toBeInTheDocument();
    expect(allLinks.some((link) => link.getAttribute('href') === 'https://rs.school/courses/reactjs')).toBeTruthy();
  });
});

