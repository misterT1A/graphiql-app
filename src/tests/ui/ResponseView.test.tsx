import { render, screen } from '@testing-library/react';

import ResponseView from '@/ui/ResponseView/ResponseView';

const mockResponse = {
  key: 'value',
};

jest.mock('next-themes', () => ({
  useTheme: (): {
    theme: string;
  } => ({ theme: 'light' }),
}));

describe('ResponseView Component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render JSON content correctly', () => {
    render(<ResponseView response={mockResponse} />);
    expect(screen.getByText('key')).toBeInTheDocument();
  });

  it('should apply light theme styles', () => {
    render(<ResponseView response={mockResponse} />);
    expect(screen.getByText('{').closest('div')).toHaveClass('bg-white');
  });

  it('should apply custom styles', () => {
    const customStyles = 'test';
    render(<ResponseView response={mockResponse} styles={customStyles} />);
    expect(screen.getByText('{').closest('div')).toHaveClass(customStyles);
  });
});
