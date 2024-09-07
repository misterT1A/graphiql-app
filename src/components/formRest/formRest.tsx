'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Chip, Input, Tab, Tabs, Textarea } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import type { SetStateAction } from 'react';
import { useEffect, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { useEncryption, useHistoryService } from '@/hooks';
import { Client } from '@/types/historyServiceTypes';
import type { IFormParams } from '@/types/restFullTypes';
import type { FormRestType } from '@/types/types';
import CodeMirrorComp from '@/ui/Code-mirror/CodeMirrorComp';
import InputsArray from '@/ui/InputsArray/InputsArray';
import SelectInput from '@/ui/SelectInput/SelectInput';
import SubmitButton from '@/ui/SubmitButton/SubmitButton';
import { codeMirrorParser } from '@/utils/codeMirrorParser';
import { fieldsCounter } from '@/utils/fieldsCounter';
import { InputsArrayToObject } from '@/utils/InputsArrayToObject';
import { InputsObjectToArray } from '@/utils/InputsObjectToArray';
import RestSchema from '@/validation/RestSchema';

function FormRest(props: {
  getData: (form: IFormParams) => void;
  inputData?: {
    body: object | string;
    endpoint: string;
    headers: { [key: string]: string };
    variables: { [key: string]: string };
    method: string;
  };
}): ReactNode {
  const { setRequest } = useHistoryService();
  const { encrypt } = useEncryption();
  const t = useTranslations('RestForm');

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm<FormRestType>({
    mode: 'onChange',
    resolver: zodResolver(RestSchema(t)),
    defaultValues: {
      method: props.inputData?.method,
      endpoint: props.inputData?.endpoint,
      headers: InputsObjectToArray(props.inputData, 'headers'),
      variables: InputsObjectToArray(props.inputData, 'variables'),
      bodyText: typeof props.inputData?.body === 'string' ? props.inputData?.body : '',
    },
  });

  const [bodyJSONData, setBodyData] = useState<object | string>(
    (typeof props.inputData?.body !== 'string' && JSON.stringify(props.inputData?.body, null, '  ')) || '{\n  \n}',
  );

  const [selectedBody, setSelectedBody] = useState(typeof props.inputData?.body === 'string' ? 'bodyText' : 'bodyJSON');

  const submit = async (data: FormRestType): Promise<void> => {
    console.log({
      method: data.method,
      endpoint: data.endpoint,
      headers: InputsArrayToObject(data.headers),
      variables: InputsArrayToObject(data.variables),
      body: selectedBody === 'bodyJSON' ? JSON.stringify(codeMirrorParser(bodyJSONData as string)) : data.bodyText,
    });

    setRequest(
      {
        method: data.method,
        endpoint: data.endpoint,
        headers: data.headers,
        variables: InputsArrayToObject(data.variables),
        body:
          selectedBody === 'bodyJSON'
            ? { type: 'json', value: JSON.stringify(codeMirrorParser(bodyJSONData as string)) }
            : { type: 'string', value: data.bodyText },
      },
      Client.REST,
    );

    props.getData({
      method: data.method,
      endpoint: data.endpoint,
      headers: InputsArrayToObject(data.headers),
      variables: InputsArrayToObject(data.variables),
      body: selectedBody === 'bodyJSON' ? JSON.stringify(codeMirrorParser(bodyJSONData as string)) : data.bodyText,
    });
  };

  useEffect(() => {
    setValue('bodyJSON', bodyJSONData as string, { shouldValidate: true });
  }, [bodyJSONData, setValue]);

  return (
    <div className="flex flex-col items-center py-10 px-2 gap-2 md:p-10">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col items-center gap-5 w-full sm:w-[70%]">
        <div className="flex justify-between w-full gap-2">
          <div>
            <SelectInput t={t} register={register} getValues={getValues} errors={errors} />
          </div>
          <div className="w-full">
            <Input
              type="text"
              label={t('labels.endpoint')}
              {...register('endpoint')}
              onBlur={() => encrypt(getValues())}
              className="w-full text-center"
              isInvalid={Boolean(errors.endpoint)}
              errorMessage={errors.endpoint?.message}
            />
          </div>
          <SubmitButton t={t} register={register} errors={errors} />
        </div>
        <Tabs aria-label="Options">
          <Tab
            key="headersTab"
            title={
              <div className="flex items-center space-x-2">
                <span>{t('buttons.headersTab')}</span>
                {errors.headers && (
                  <Chip size="sm" variant="faded" color="danger">
                    {`+${fieldsCounter(errors.headers as object[])}`}
                  </Chip>
                )}
              </div>
            }
            className="flex flex-col items-center gap-5 w-full"
          >
            <InputsArray
              getValues={getValues}
              t={t}
              register={register}
              errors={errors}
              control={control}
              name="headers"
            />
          </Tab>
          <Tab
            key="variablesTab"
            title={
              <div className="flex items-center space-x-2">
                <span>{t('buttons.variablesTab')}</span>
                {errors.variables && (
                  <Chip size="sm" variant="faded" color="danger">
                    {`+${fieldsCounter(errors.variables as object[])}`}
                  </Chip>
                )}
              </div>
            }
            className="flex flex-col items-center gap-5 w-full"
          >
            <InputsArray
              getValues={getValues}
              t={t}
              register={register}
              errors={errors}
              control={control}
              name="variables"
            />
          </Tab>
          <Tab
            key="bodyTab"
            title={
              <div className="flex items-center space-x-2">
                <span>{t('buttons.bodyTab')}</span>
                {errors.bodyJSON && (
                  <Chip size="sm" variant="faded" color="danger">
                    +1
                  </Chip>
                )}
              </div>
            }
            className="w-full"
          >
            <Tabs
              aria-label="Mode"
              placement="start"
              className="flex flex-col h-[100px] justify-center"
              onSelectionChange={(key: React.Key) => {
                setSelectedBody(key as SetStateAction<string>);
              }}
              defaultSelectedKey={selectedBody}
              color="success"
            >
              <Tab key="bodyJSON" title="JSON" className="flex flex-col gap-2 w-full">
                <div onBlur={() => encrypt(getValues())}>
                  <CodeMirrorComp
                    setResponse={setBodyData}
                    size={{ width: '100%', height: '98.4px' }}
                    initValue={bodyJSONData as string}
                    t={t}
                    register={register}
                    errors={errors}
                    name="bodyJSON"
                  />
                </div>
              </Tab>
              <Tab
                key="bodyText"
                title={t('buttons.bodyTextTab')}
                className="flex flex-col gap-2 w-full"
                isDisabled={Boolean(errors.bodyJSON)}
              >
                <Textarea
                  {...register('bodyText')}
                  onBlur={() => encrypt(getValues(), true)}
                  label={t('labels.bodyText')}
                  placeholder={t('placeholders.bodyText')}
                  className="w-full h-[100px]"
                />
              </Tab>
            </Tabs>
          </Tab>
        </Tabs>
      </form>
    </div>
  );
}

export default FormRest;
