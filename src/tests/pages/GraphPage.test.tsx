import { render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';

import Page from '@/app/[locale]/GRAPHQL/[[...slug]]/page';

jest.mock('../../components/GraphQLClient/GraphQLClient.tsx', () => {
  const GraphQLClient = (props: { initParams?: undefined | { method: string } }): ReactElement => (
    <>
      <h1>GraphQL client</h1>
      <div> {props.initParams?.method ? 'Graph' : 'emtpty init params'}</div>
    </>
  );
  return GraphQLClient;
});

describe('Graph page', () => {
  it('Should render page', () => {
    render(<Page params={{ slug: ['GET'] }} searchParams={{ Test: 'test' }} />);

    expect(screen.getByText('GraphQL client')).toBeInTheDocument();
  });

  it('Should render page without init params', () => {
    render(<Page params={{}} searchParams={{}} />);

    expect(screen.getByText('emtpty init params')).toBeInTheDocument();
  });
});
