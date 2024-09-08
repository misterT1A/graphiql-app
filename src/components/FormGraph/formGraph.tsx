'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Chip, Input, Tab, Tabs } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import type { SetStateAction } from 'react';
import { useEffect, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';

// import useEncryption from '@/hooks/useEncryption';
import { API } from '@/services/API';
import type { FormGraphDataType, FormGraphType } from '@/types/types';
import CodeMirrorComp from '@/ui/Code-mirror/CodeMirrorComp';
import InputsArray from '@/ui/InputsArray/InputsArray';
import SubmitButton from '@/ui/SubmitButton/SubmitButton';
import { codeMirrorParser } from '@/utils/codeMirrorParser';
import { fieldsCounter } from '@/utils/fieldsCounter';
import { InputsArrayToObject } from '@/utils/InputsArrayToObject';
import { InputsObjectToArray } from '@/utils/InputsObjectToArray';
import GraphSchema from '@/validation/GraphSchema';

function FormGraph(props: {
  // getData: (form: IFormParams) => void;
  inputData?: FormGraphDataType;
}): ReactNode {
  // const { encrypt } = useEncryption();
  const t = useTranslations('Form');

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormGraphType>({
    mode: 'onChange',
    resolver: zodResolver(GraphSchema(t)),
    defaultValues: {
      endpoint: props.inputData?.endpoint,
      headers: InputsObjectToArray(props.inputData, 'headers'),
      variables: InputsObjectToArray(props.inputData, 'variables'),
    },
  });

  const [schema, setSchema] = useState({} as { message?: string });

  const [queryData, setBodyData] = useState<object | string>(
    (typeof props.inputData?.query !== 'string' && JSON.stringify(props.inputData?.query, null, '  ')) || '{\n  \n}',
  );

  const submit = async (data: FormGraphType): Promise<void> => {
    console.log({
      endpoint: data.endpoint,
      headers: InputsArrayToObject(data.headers),
      variables: InputsArrayToObject(data.variables),
      query: codeMirrorParser(queryData as string),
      schema: schema,
    });

    // props.getData({
    //   method: data.method,
    //   endpoint: data.endpoint,
    //   headers: InputsArrayToObject(data.headers),
    //   variables: InputsArrayToObject(data.variables),
    //   body: selectedBody === 'bodyJSON' ? JSON.stringify(codeMirrorParser(bodyJSONData as string)) : data.bodyText,
    // });
  };

  useEffect(() => {
    setValue('query', queryData as object, { shouldValidate: true });
  }, [queryData, setValue]);

  return (
    <div className="flex flex-col items-center py-10 px-2 gap-2 md:p-10">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col items-center gap-5 w-full sm:w-[70%]">
        <div className="flex justify-between w-full gap-2">
          <div className="w-full">
            <Input
              type="text"
              label={t('labels.endpoint')}
              {...register('endpoint')}
              // onBlur={() => encrypt(getValues())}
              className="w-full text-center"
              isInvalid={Boolean(errors.endpoint)}
              errorMessage={errors.endpoint?.message}
            />
          </div>
          <SubmitButton t={t} register={register} errors={errors} schema={schema} />
        </div>

        <div className="flex justify-between w-full gap-2">
          <div className="w-full">
            <Input
              type="text"
              label={t('labels.sdl')}
              {...register('sdl')}
              // onBlur={() => encrypt(getValues())}
              className="w-full text-center"
              isInvalid={Boolean(errors.sdl)}
              errorMessage={errors.sdl?.message}
              isDisabled={!(!Object.keys(schema).length || Boolean(schema.message))}
            />
          </div>
          <Button
            size="lg"
            color={((!Object.keys(schema).length || Boolean(schema.message)) && 'success') || 'default'}
            isDisabled={!(!Object.keys(schema).length || Boolean(schema.message))}
            className="h-14"
            onClick={async () => {
              const graphSchema = await API().getSchema(watch('sdl'));
              setSchema(graphSchema as SetStateAction<object>);
            }}
          >
            {t('buttons.getSchema')}
          </Button>
        </div>

        {Boolean(Object.keys(schema).length) && !schema.message && (
          <p className="text-[#17C964]">{t('text.schemaLoaded')}</p>
        )}
        {schema.message && <p className="text-[#F31260]">{schema.message}</p>}
        {!Object.keys(schema).length && !schema.message && <p>{t('text.schemaPenging')}</p>}

        <Tabs
          disabledKeys={[`${!Object.keys(schema).length || Boolean(schema.message) ? 'queryTab' : ''}`]}
          aria-label="Options"
        >
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
            key="queryTab"
            title={
              <div className="flex items-center space-x-2">
                <span>{t('buttons.queryTab')}</span>
                {errors.query && (
                  <Chip size="sm" variant="faded" color="danger">
                    +1
                  </Chip>
                )}
              </div>
            }
            className="w-full"
          >
            <div
            // onBlur={() => encrypt(getValues())}
            >
              <CodeMirrorComp
                setResponse={setBodyData}
                size={{ width: '100%', height: '98.4px' }}
                initValue={queryData as string}
                t={t}
                register={register}
                errors={errors}
                name="query"
              />
            </div>
          </Tab>
        </Tabs>
      </form>
    </div>
  );
}

export default FormGraph;
