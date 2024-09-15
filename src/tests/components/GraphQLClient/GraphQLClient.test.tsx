import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement } from 'react';

import GraphQLClient from '@/components/GraphQLClient/GraphQLClient';
import messages from '@/messages/en.json';
import getGraphData from '@/services/getGraphData';

jest.mock('../../../services/getGraphData.ts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../utils/replaceVariables.ts', () => ({
  replaceVariablesGraph: jest.fn().mockReturnValue({ method: 'GET' }),
}));

jest.mock('../../../components/FormGraph/formGraph.tsx', () => {
  const Form = (props: { getData: (value: { method: string }) => void }): ReactElement => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.getData({ method: 'GET' });
      }}
    >
      Form
      <button type="submit">Submit</button>
    </form>
  );

  return Form;
});
jest.mock('../../../ui/ResponseView/ResponseView.tsx', () => {
  const View = (): ReactElement => <div>ResponseView</div>;
  return View;
});

describe('Graph client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should render component', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <GraphQLClient />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText('Form')).toBeInTheDocument();
  });
  it('Should call getGraphData with correct arguments', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <GraphQLClient />
      </NextIntlClientProvider>,
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getGraphData).toHaveBeenCalledWith({ method: 'GET' });
    });
  });
});
