import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';

import RootLayout from '@/app/layout';

describe('Layouts', () => {
  const TestComponent = (): ReactElement => <div>test</div>;
  it('Should render Root layout', () => {
    render(
      <RootLayout>
        <TestComponent />
      </RootLayout>,
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
