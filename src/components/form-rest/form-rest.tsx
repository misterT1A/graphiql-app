'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem, Tab, Tabs } from '@nextui-org/react';
import { useEffect, useState, type ReactNode } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { TEXT_CONTENT } from '@/constants/constants';
import type { FormRestType } from '@/types/types';
import CodeMirrorComp from '@/ui/Code-mirror/CodeMirrorComp';
import { RemoveIcon } from '@/ui/Icons/remove-icon';
import ResponseView from '@/ui/Response-view/ResponseView';
import { schema } from '@/validation/schema';

const headerEmpty = { key: '', value: '' };

export default function FormRest(props: { response: object | null }): ReactNode {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormRestType>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      headers: [headerEmpty],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'headers',
    control,
  });

  const [bodyData, setBodyData] = useState<object | null>({
    query: {},
  });

  const submit = async (data: FormRestType): Promise<void> => {
    const headers: { [key: string]: string } = {};
    data.headers.forEach((value) => (headers[value.key] = value.value));

    // output object for queryParams
    console.log({
      method: data.method,
      endpoint: data.endpoint,
      headers: headers,
      body: bodyData,
    });

    // example of API calling and response rendering
    // const resp = await API().getData(data, headers, bodyData!);
    // setResponse(resp as SetStateAction<object | null>);
  };

  useEffect(() => {
    setValue('body', JSON.stringify(bodyData), { shouldValidate: true });
  }, [bodyData, setValue]);

  return (
    <div className="flex flex-col items-center p-10 gap-10">
      <form onSubmit={handleSubmit(submit)} className="flex flex-col items-center gap-5 w-7/12">
        <div className="flex justify-between w-full gap-2">
          <div>
            <Select
              label="Method"
              {...register('method')}
              className="w-[105px] text-center"
              isInvalid={Boolean(errors.method)}
              errorMessage={errors.method?.message}
            >
              {TEXT_CONTENT.methodValues.map((value, index) => {
                return (
                  <SelectItem value={value} key={value} hidden={!index}>
                    {value}
                  </SelectItem>
                );
              })}
            </Select>
          </div>
          <div className="w-full">
            <Input
              type="text"
              label="Endpoint URL"
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
            Send
          </Button>
        </div>
        <Tabs aria-label="Options">
          <Tab key="headersTab" title="Headers" className="flex flex-col items-center gap-5 w-full">
            <div className="flex flex-col gap-5 w-full">
              {Boolean(fields.length) && (
                <div className="flex flex-col gap-2 w-full">
                  {fields.map((item, index) => (
                    <div key={item.id} className="flex gap-2 justify-between">
                      <div className="w-1/2">
                        <Input
                          type="text"
                          label="Header value"
                          {...register(`headers.${index}.key` as const)}
                          className="text-center"
                          isInvalid={Boolean(errors.headers && errors.headers[index]?.key?.message)}
                          errorMessage={errors.headers && errors.headers[index]?.key?.message}
                        />
                      </div>
                      <div className="w-1/2">
                        <Input
                          type="text"
                          label="Header key"
                          {...register(`headers.${index}.value` as const)}
                          className="text-center"
                          isInvalid={Boolean(errors.headers && errors.headers[index]?.value?.message)}
                          errorMessage={errors.headers && errors.headers[index]?.value?.message}
                        />
                      </div>
                      <div className="flex items-center h-14">
                        <Button isIconOnly color="danger" aria-label="Like" size="sm" onClick={() => remove(index)}>
                          <RemoveIcon />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button size="sm" onClick={() => append(headerEmpty)}>
                Add Header
              </Button>
            </div>
          </Tab>
          <Tab key="bodyTab" title="Body" className="flex flex-col gap-2 w-full">
            <CodeMirrorComp setResponse={setBodyData} size={{ width: '100%', height: '100px' }} />
            <Input type="hidden" {...register('body')} />
            <p className="text-[#F31260] text-center text-xs">{errors.body?.message}</p>
          </Tab>
        </Tabs>
      </form>
      {props.response && (
        <div className="flex flex-col gap-5 w-7/12">
          <div className="flex flex-col gap-2 w-full">
            <hr />
            <p>Response</p>
          </div>
          <ResponseView response={props.response} styles="w-full h-96" />
        </div>
      )}
    </div>
  );
}
