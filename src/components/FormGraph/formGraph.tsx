'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Chip, Input, Tab, Tabs } from '@nextui-org/react';
import { graphql } from 'cm6-graphql';
import type { GraphQLSchema } from 'graphql';
import { useTranslations } from 'next-intl';
import { useEffect, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import useEncryption from '@/hooks/useEncryption';
import type { IFormGraph } from '@/types/graphTypes';
import type { FormGraphDataType, FormGraphType } from '@/types/types';
import CodeMirrorComp from '@/ui/Code-mirror/CodeMirrorComp';
import InputsArray from '@/ui/InputsArray/InputsArray';
import SubmitButton from '@/ui/SubmitButton/SubmitButton';
import { fieldsCounter } from '@/utils/fieldsCounter';
import { InputsArrayToObject } from '@/utils/InputsArrayToObject';
import { InputsObjectToArray } from '@/utils/InputsObjectToArray';
import GraphSchema from '@/validation/GraphSchema';

function FormGraph(props: { getData: (form: IFormGraph) => void; inputData?: FormGraphDataType }): ReactNode {
  const { encryptGraph } = useEncryption();
  const t = useTranslations('Form');

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm<FormGraphType>({
    mode: 'onChange',
    resolver: zodResolver(GraphSchema(t)),
    defaultValues: {
      endpoint: props.inputData?.endpoint,
      sdl: props.inputData?.sdl,
      headers: InputsObjectToArray(props.inputData, 'headers'),
      variables: InputsObjectToArray(props.inputData, 'variables'),
    },
  });

  const [queryData, setBodyData] = useState<string>(props.inputData?.query || '{\n  \n}');

  const submit = async (data: FormGraphType): Promise<void> => {
    // console.log({
    //   endpoint: data.endpoint,
    //   sdl: data.sdl,
    //   headers: InputsArrayToObject(data.headers),
    //   variables: InputsArrayToObject(data.variables),
    //   query: queryData,
    // });

    props.getData({
      endpoint: data.endpoint,
      sdl: data.sdl,
      headers: InputsArrayToObject(data.headers),
      variables: InputsArrayToObject(data.variables),
      query: queryData,
    });
  };

  useEffect(() => {
    setValue('query', queryData, { shouldValidate: true });
  }, [queryData, setValue]);

  return (
    <div className="flex flex-col items-center py-10 px-2 gap-2 md:p-10">
      <form
        onChange={() => encryptGraph(getValues())}
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-center gap-5 w-full sm:w-[70%]"
      >
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
          <div className="w-full">
            <Input
              type="text"
              label={t('labels.sdl')}
              {...register('sdl')}
              className="w-full text-center"
              isInvalid={Boolean(errors.sdl)}
              errorMessage={errors.sdl?.message}
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
            <p className="text-center">
              {t('text.varsInfoStart')}
              <span className="text-[#F5A524]">{' $var_name '}</span>
              {t('text.graphVarsInfoEnd')}
            </p>
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
            <div onBlur={() => encryptGraph(getValues())}>
              <CodeMirrorComp
                setResponse={setBodyData}
                size={{ width: '100%', height: '300px' }}
                initValue={queryData as string}
                t={t}
                register={register}
                errors={errors}
                name="query"
                ext={
                  (props.inputData?.schema &&
                    Object.keys(props.inputData.schema).length && [
                      graphql(props.inputData.schema as GraphQLSchema),
                    ]) || [graphql()]
                }
              />
            </div>
          </Tab>
        </Tabs>
      </form>
    </div>
  );
}

export default FormGraph;
