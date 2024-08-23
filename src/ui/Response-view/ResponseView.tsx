'use client';

import { useTheme } from 'next-themes';
import { type ReactElement } from 'react';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

const ResponseView = ({ response }: { response: object }): ReactElement => {
  const { theme } = useTheme();

  return (
    <div className={`border border-black rounded-[5px] w-[300px] ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <JsonView src={response} />
    </div>
  );
};

export default ResponseView;
