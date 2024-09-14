import { json } from '@codemirror/lang-json';
import { Tab, Tabs } from '@nextui-org/react';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror, { EditorState } from '@uiw/react-codemirror';
import type { GraphQLSchema } from 'graphql';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useState, type ReactElement } from 'react';

import getGraphData from '@/services/getGraphData';
import getGraphSchema from '@/services/getGraphSchema';
import type { IFormGraphEncrypt } from '@/types/graphTypes';
import type { IErrorObj } from '@/types/restFullTypes';
import type { FormGraphDataType } from '@/types/types';
import ResponseLoader from '@/ui/ResponseLoader/ResponseLoader';
import ResponseView from '@/ui/ResponseView/ResponseView';
import { replaceVariablesGraph } from '@/utils/replaceVariables';

import FormGraph from '../FormGraph/formGraph';

const GraphQLContent = ({ initParams }: { initParams?: FormGraphDataType }): ReactElement => {
  const t = useTranslations('GraphClient');
  const [response, setResponse] = useState<Response | undefined | IErrorObj>(undefined);
  const [schema, setSchema] = useState<GraphQLSchema | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const sumbiteHandler = async (form: IFormGraphEncrypt): Promise<void> => {
    const replacedParams = replaceVariablesGraph(form);
    setIsLoading(true);
    const resp = await getGraphData(replacedParams);
    const schemaResp = await getGraphSchema(form.sdl);
    setIsLoading(false);
    setResponse(resp);

    if (schemaResp) {
      setSchema(schemaResp);
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl">{t('Title')}</h1>
      <FormGraph inputData={initParams} getData={sumbiteHandler} />
      {isLoading && (
        <div className="w-full flex justify-center">
          <ResponseLoader />
        </div>
      )}
      {!isLoading && response && (
        <div className="w-full flex justify-center">
          <div className="flex flex-col gap-5 w-full sm:w-[64%]">
            <hr className="w-full" />
            <Tabs aria-label="Options" className="self-center" disabledKeys={[`${schema ? '' : 'schema'}`]}>
              <Tab key="response" title={t('RespBtn')}>
                <div className={'border border-black rounded-[12px] inline-block overflow-hidden w-full'}>
                  <ResponseView response={response} />
                </div>
              </Tab>
              <Tab key="schema" title={t('DocBtn')}>
                <div className={'border border-black rounded-[12px] inline-block overflow-hidden w-full'}>
                  <CodeMirror
                    value={JSON.stringify(schema, null, '  ')}
                    width="100%"
                    height="800px"
                    extensions={[EditorState.readOnly.of(true), json()]}
                    theme={theme === 'dark' ? githubDark : githubLight}
                  />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default GraphQLContent;
