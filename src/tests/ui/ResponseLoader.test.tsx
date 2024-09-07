import { render, screen } from '@testing-library/react';

import ResponseLoader from '@/ui/ResponseLoader/ResponseLoader';

describe('ResponseLoader', () => {
  it('Should render loader', () => {
    render(<ResponseLoader />);

    expect(screen.getByTestId('response-loader')).toBeInTheDocument();
  });
});
