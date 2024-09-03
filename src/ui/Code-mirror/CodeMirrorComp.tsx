'use client';

import { json } from '@codemirror/lang-json';
import { Input } from '@nextui-org/react';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import type { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState, type ReactElement } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { FormRestType } from '@/types/types';

const CodeMirrorComp = (props: {
  setResponse: Dispatch<SetStateAction<string>>;
  size: { width: string; height: string };
  initValue: string;
  t: ReturnType<typeof useTranslations<'RestForm'>>;
  register: UseFormRegister<FormRestType>;
  errors: FieldErrors<FormRestType>;
  name: 'bodyJSON';
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
    <>
      <div className={'border border-black rounded-[12px] inline-block overflow-hidden'}>
        <CodeMirror
          value={value}
          width={props.size.width}
          height={props.size.height}
          extensions={[json()]}
          onChange={onChange}
          theme={theme === 'dark' ? githubDark : githubLight}
        />
      </div>
      <Input type="hidden" {...props.register(props.name)} />
      {props.errors[props.name] && (
        <div>
          <p className="text-[#F31260] text-center text-xs">{props.errors[props.name] && props.t('errors.body')}</p>
          <p className="text-[#F31260] text-center text-xs">{props.errors[props.name]?.message}</p>
        </div>
      )}
    </>
  );
};

export default CodeMirrorComp;
