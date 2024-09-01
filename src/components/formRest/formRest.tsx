'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Chip, Input, Tab, Tabs } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { EMPTY_ARRAY_INPUT } from '@/constants/constants';
import type { FormRestType } from '@/types/types';
import CodeMirrorComp from '@/ui/Code-mirror/CodeMirrorComp';
import InputsArray from '@/ui/InputsArray/InputsArray';
import SelectInput from '@/ui/SelectInput/SelectInput';
import { codeMirrorParser } from '@/utils/codeMirrorParser';
import { fieldsCounter } from '@/utils/fieldsCounter';
import RestSchema from '@/validation/RestSchema';

function FormRest(props: {
  inputData?: {
    body: object;
    endpoint: string;
    headers: { [key: string]: string };
    variables: { [key: string]: string };
    method: string;
  };
}): ReactNode {
  const t = useTranslations('RestForm');

  const initHeaders = [];
  if (props.inputData) {
    for (const keys in props.inputData.headers) {
      initHeaders.push({ key: keys, value: props.inputData.headers[keys] });
    }
  } else {
    initHeaders.push(EMPTY_ARRAY_INPUT);
  }

  const initVariables = [];
  if (props.inputData) {
    for (const keys in props.inputData.variables) {
      initVariables.push({ key: keys, value: props.inputData.variables[keys] });
    }
  } else {
    initVariables.push(EMPTY_ARRAY_INPUT);
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormRestType>({
    mode: 'onChange',
    resolver: zodResolver(RestSchema(t)),
    defaultValues: {
      method: props.inputData?.method,
      endpoint: props.inputData?.endpoint,
      headers: initHeaders,
      variables: initVariables,
    },
  });

  const [bodyData, setBodyData] = useState<object | string>(
    JSON.stringify(props.inputData?.body, null, '  ') || '{\n  \n}',
  );

  const submit = async (data: FormRestType): Promise<void> => {
    const headers: { [key: string]: string } = {};
    data.headers.forEach((value) => (headers[value.key] = value.value));

    const variables: { [key: string]: string } = {};
    data.variables.forEach((value) => (variables[value.key] = value.value));

    // output object for queryParams
    console.log({
      method: data.method,
      endpoint: data.endpoint,
      headers: headers,
      variables: variables,
      body: codeMirrorParser(bodyData as string),
    });
  };

  useEffect(() => {
    setValue('body', bodyData as string, { shouldValidate: true });
  }, [bodyData, setValue]);

  return (
    <div className="flex flex-col items-center p-10 gap-10">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col items-center gap-5 w-7/12">
        <div className="flex justify-between w-full gap-2">
          <div>
            <SelectInput t={t} register={register} errors={errors} />
          </div>
          <div className="w-full">
            <Input
              type="text"
              label={t('labels.endpoint')}
              {...register('endpoint')}
              className="w-full text-center"
              isInvalid={Boolean(errors.endpoint)}
              errorMessage={errors.endpoint?.message}
            />
          </div>
          <Button
            size="lg"
            type="submit"
            color={(Object.keys(errors).length && 'danger') || 'success'}
            isDisabled={Boolean(Object.keys(errors).length)}
            className="h-14"
          >
            {t('buttons.send')}
          </Button>
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
            <InputsArray t={t} register={register} errors={errors} control={control} name="headers" />
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
            <InputsArray t={t} register={register} errors={errors} control={control} name="variables" />
          </Tab>
          <Tab
            key="bodyTab"
            title={
              <div className="flex items-center space-x-2">
                <span>{t('buttons.bodyTab')}</span>
                {errors.body && (
                  <Chip size="sm" variant="faded" color="danger">
                    +1
                  </Chip>
                )}
              </div>
            }
            className="flex flex-col gap-2 w-full"
          >
            <CodeMirrorComp
              setResponse={setBodyData}
              size={{ width: '100%', height: '100px' }}
              initValue={bodyData as string}
            />
            <Input type="hidden" {...register('body')} />
            <p className="text-[#F31260] text-center text-xs">{errors.body && t('errors.body')}</p>
            <p className="text-[#F31260] text-center text-xs">{errors.body?.message}</p>
          </Tab>
        </Tabs>
      </form>
    </div>
  );
}

export default FormRest;
