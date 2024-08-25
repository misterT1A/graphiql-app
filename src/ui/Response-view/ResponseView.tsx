'use client';

import { useTheme } from 'next-themes';
import { type ReactElement } from 'react';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

const ResponseView = ({ response, styles }: { response: object; styles?: string }): ReactElement => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-5 overflow-scroll border border-black rounded-[5px] ${theme === 'light' ? 'bg-white' : 'bg-black'} ${styles || ''}`}
    >
      <JsonView src={response} />
    </div>
  );
};

export default ResponseView;
