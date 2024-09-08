import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';

import Page from '@/app/[locale]/restfull-client/[[...slug]]/page';

jest.mock('../../components/RestFullClient/RestFullClient.tsx', () => {
  const RestClient = (props: { initParams?: undefined | { method: string } }): ReactElement => (
    <div> {props.initParams?.method ? 'Rest' : 'emtpty init params'}</div>
  );
  return RestClient;
});

describe('Rest page', () => {
  it('Should render page', () => {
    render(<Page params={{ slug: ['GET'] }} searchParams={{ Test: 'test' }} />);

    expect(screen.getByText('Rest')).toBeInTheDocument();
  });

  it('Should render page without init params', () => {
    render(<Page params={{}} searchParams={{}} />);

    expect(screen.getByText('emtpty init params')).toBeInTheDocument();
  });
});
