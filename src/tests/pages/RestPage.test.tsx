import { render, screen } from '@testing-library/react';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import Page from '@/app/[locale]/[method]/[[...slug]]/page';

jest.mock('@/components/RestFullClient/RestFullClient', () => {
  const RestClient = (props: { initParams?: undefined | { method: string } }): ReactElement => (
    <>
      <h1>RestFull client</h1>
      <div> {props.initParams?.method ? 'Rest' : 'emtpty init params'}</div>
    </>
  );
  return RestClient;
});

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('Rest page', () => {
  it('Should render page', () => {
    render(<Page params={{ method: 'GET' }} searchParams={{ Test: 'test' }} />);

    expect(screen.getByText('RestFull client')).toBeInTheDocument();
  });

  it('Should redirect to not found page if method is invalid', () => {
    render(<Page params={{ method: 'INVALID' }} searchParams={{}} />);

    expect(notFound).toHaveBeenCalled();
  });
});
