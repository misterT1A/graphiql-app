'use client';

//
import { Input } from '@nextui-org/react';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
import type { Extension } from '@uiw/react-codemirror';
import CodeMirror from '@uiw/react-codemirror';
import type { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState, type ReactElement } from 'react';
import type { FieldError, FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

function CodeMirrorComp<T extends FieldValues>(props: {
  setResponse: Dispatch<SetStateAction<string>>;
  size: { width: string; height: string };
  initValue: string;
  t: ReturnType<typeof useTranslations<'Form'>>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: 'bodyJSON' | 'query';
  ext: Extension[];
}): ReactElement | null {
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
      <div className={'border border-black rounded-[12px] inline-block overflow-hidden w-full'}>
        <CodeMirror
          value={value}
          width={props.size.width}
          height={props.size.height}
          extensions={props.ext}
          onChange={onChange}
          theme={theme === 'dark' ? githubDark : githubLight}
        />
      </div>
      <Input type="hidden" {...props.register(props.name as Path<T>)} />
      {props.errors[props.name] && (
        <div>
          <p className="text-[#F31260] text-center text-xs">{props.errors[props.name] && props.t('errors.body')}</p>
          <p className="text-[#F31260] text-center text-xs">{(props.errors[props.name] as FieldError)?.message}</p>
        </div>
      )}
    </>
  );
}

export default CodeMirrorComp;
