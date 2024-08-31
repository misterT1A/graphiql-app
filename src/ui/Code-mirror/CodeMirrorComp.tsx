'use client';

import { json } from '@codemirror/lang-json';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import { useTheme } from 'next-themes';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState, type ReactElement } from 'react';

const CodeMirrorComp = (props: {
  setResponse: Dispatch<SetStateAction<string>>;
  size: { width: string; height: string };
  initValue: string;
}): ReactElement | null => {
  const [value, setValue] = useState(props.initValue);

  const onChange = useCallback(
    (val: string) => {
      setValue(val);
      props.setResponse(val as unknown as SetStateAction<string>);
    },
    [props],
  );

  const { theme } = useTheme();

  return (
    <div className="border border-black rounded-[5px] inline-block overflow-hidden">
      <CodeMirror
        value={value}
        width={props.size.width}
        height={props.size.height}
        extensions={[json()]}
        onChange={onChange}
        theme={theme === 'dark' ? githubDark : githubLight}
      />
    </div>
  );
};

export default CodeMirrorComp;
