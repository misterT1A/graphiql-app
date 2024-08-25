'use client';

import { javascript } from '@codemirror/lang-javascript';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState, type ReactElement } from 'react';

const initData = `{
  query: {
    
  }
}`;

const CodeMirrorComp = ({
  setResponse,
  size,
}: {
  setResponse: Dispatch<SetStateAction<object>>;
  size: { width: string; height: string };
}): ReactElement | null => {
  const [value, setValue] = useState(initData);

  const onChange = useCallback(
    (val: string) => {
      setValue(val);
      try {
        const validJsonString = val
          .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2":')
          .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?,/g, '"$2",')
          .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*\}/g, '"$2"}')
          .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*\{/g, '"$2":{')
          .replace(/'/g, '"');

        const parsedValue = JSON.parse(validJsonString);
        setResponse(parsedValue);
      } catch (e) {
        console.log('Error parsing JSON:', e);
      }
    },
    [setResponse],
  );

  const { theme } = useTheme();

  return (
    <div className="border border-black rounded-[5px] inline-block overflow-hidden">
      <CodeMirror
        value={value}
        width={size.width}
        height={size.height}
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        theme={theme === 'dark' ? githubDark : githubLight}
      />
    </div>
  );
};

export default CodeMirrorComp;
