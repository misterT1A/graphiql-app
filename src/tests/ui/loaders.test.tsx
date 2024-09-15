import { render, screen } from '@testing-library/react';

import Restloading from '@/app/[locale]/[method]/[[...slug]]/loading';
import Graphloading from '@/app/[locale]/GRAPHQL/[[...slug]]/loading';
import Historyloading from '@/app/[locale]/history/loading';
import SignInloading from '@/app/[locale]/sign-in/loading';
import SignUploading from '@/app/[locale]/sign-up/loading';

describe('Loading pages', () => {
  it('Should render SignIn loading page', () => {
    render(<SignInloading />);
    expect(screen.getByTestId('SignInLoader')).toBeInTheDocument();
  });
  it('Should render SignUp loading page', () => {
    render(<SignUploading />);
    expect(screen.getByTestId('SignUpLoader')).toBeInTheDocument();
  });
  it('Should render Rest loading page', () => {
    render(<Restloading />);
    expect(screen.getByTestId('RestLoader')).toBeInTheDocument();
  });
  it('Should render Graph loading page', () => {
    render(<Graphloading />);
    expect(screen.getByTestId('GraphLoader')).toBeInTheDocument();
  });
  it('Should render History loading page', () => {
    render(<Historyloading />);
    expect(screen.getByTestId('HistoryLoader')).toBeInTheDocument();
  });
});
