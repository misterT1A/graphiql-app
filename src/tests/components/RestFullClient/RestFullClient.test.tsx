import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement } from 'react';

import RestFullClient from '@/components/RestFullClient/RestFullClient';
import messages from '@/messages/en.json';
import getRestfullData from '@/services/getRestfullData';

jest.mock('../../../services/getRestfullData.ts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../utils/replaceVariables.ts', () => ({
  replaceVariablesSybmitRest: jest.fn().mockReturnValue({ method: 'GET' }),
}));

jest.mock('../../../components/formRest/formRest.tsx', () => {
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

describe('RestFullClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Should render component', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <RestFullClient />
      </NextIntlClientProvider>,
    );
    expect(screen.getByText('Form')).toBeInTheDocument();
  });
  it('Should call getRestfullData with correct arguments', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        <RestFullClient />
      </NextIntlClientProvider>,
    );

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getRestfullData).toHaveBeenCalledWith({ method: 'GET' });
    });
  });
});
