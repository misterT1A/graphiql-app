'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem, Spinner } from '@nextui-org/react';
import type { SetStateAction } from 'react';
import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { TEXT_CONTENT } from '@/constants/constants';
import { API } from '@/services/API';
import type { FormRestType } from '@/types/types';
import CodeMirrorComp from '@/ui/Code-mirror/CodeMirrorComp';
import ResponseView from '@/ui/Response-view/ResponseView';
import { numberToArray } from '@/utils/number-to-array';
// import { schema } from '@/validation/schema';

export default function FormRest(): ReactNode {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRestType>({
    mode: 'onChange',
    // resolver: zodResolver(schema),
  });

  const [headCount, setHeadCount] = useState(1);
  const [bodyData, setBodyData] = useState<object>({
    query: {},
  });
  const [response, setResponse] = useState<object | null>(null);
  const [loading, setLoading] = useState(false);

  const test = async (data: FormRestType): Promise<void> => {
    console.log('jopa');
    setLoading(true);

    const resp = await API().getData(data, headCount, bodyData);
    setResponse(resp as SetStateAction<object | null>);

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-10 gap-10">
      <form onSubmit={handleSubmit((data) => test(data))} className="flex flex-col items-center gap-5 w-7/12">
        <div className="flex justify-between w-full gap-5">
          <div className="w-40">
            <Select label="Method" {...register('method')} className="w-full">
              {TEXT_CONTENT.methodValues.map((value, index) => {
                return (
                  <SelectItem value={value} key={value} hidden={!index}>
                    {value}
                  </SelectItem>
                );
              })}
            </Select>
            <p>{errors.method?.message}</p>
          </div>
          <div className="w-full">
            <Input type="text" label="Endpoint URL" {...register('endpoint')} className="w-full" />
            <p>{errors.endpoint?.message}</p>
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <p>Headers: </p>
          <div className="flex gap-3">
            <Button size="sm" onClick={() => setHeadCount(headCount + 1)}>
              Add Header
            </Button>
            <Button size="sm" onClick={() => setHeadCount(headCount - 1)}>
              Remove Header
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {numberToArray(headCount).map((value) => {
            return (
              <div key={value} className="flex gap-5">
                <Input type="text" label="Header value" {...register(`header-key-${value}` as keyof FormRestType)} />
                <Input type="text" label="Header key" {...register(`header-value-${value}` as keyof FormRestType)} />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-5 w-full">
          <p>Body: </p>
          <CodeMirrorComp setResponse={setBodyData} size={{ width: '100%', height: '100px' }} />
          <p>{errors.body?.message}</p>
        </div>

        <Button size="lg" type="submit" disabled={Boolean(Object.keys(errors).length)}>
          Submit
        </Button>
      </form>
      {(loading && <Spinner size="lg" />) || (response && <ResponseView response={response} styles="w-7/12 h-96" />)}
    </div>
  );
}

