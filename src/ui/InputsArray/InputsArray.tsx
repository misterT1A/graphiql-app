'use client';

import { Button, Input } from '@nextui-org/react';
import type { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import type { ArrayPath, Control, FieldArray, FieldValues, Path, UseFormGetValues } from 'react-hook-form';
import { useFieldArray, type FieldErrors, type UseFormRegister } from 'react-hook-form';

import { EMPTY_ARRAY_INPUT } from '@/constants/constants';
import type { InputArrayErrors } from '@/types/types';

import { RemoveIcon } from '../Icons/RemoveIcon';

function InputsArray<T extends FieldValues>(props: {
  getValues: UseFormGetValues<T>;
  t: ReturnType<typeof useTranslations<'Form'>>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  control: Control<T>;
  name: ArrayPath<T>;
}): ReactNode {
  const {
    fields: fields,
    append: append,
    remove: remove,
  } = useFieldArray({
    name: props.name,
    control: props.control,
  });

  const shortName = props.name.slice(0, props.name.length - 1) as 'header' | 'variable';

  return (
    <div className="flex flex-col gap-5 w-full">
      {Boolean(fields.length) && (
        <div className="flex flex-col gap-2 w-full">
          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-2 justify-between">
              <div className="w-1/2">
                <Input
                  type="text"
                  label={props.t(`labels.${shortName}Key`)}
                  {...props.register(`${props.name}.${index}.key` as Path<T>)}
                  className="text-center"
                  isInvalid={Boolean(
                    props.errors[props.name] &&
                      (props.errors[props.name] as unknown as InputArrayErrors[])[index]?.key?.message,
                  )}
                  errorMessage={
                    props.errors[props.name] &&
                    (props.errors[props.name] as unknown as InputArrayErrors[])[index]?.key?.message
                  }
                />
              </div>
              <div className="w-1/2">
                <Input
                  type="text"
                  label={props.t(`labels.${shortName}Value`)}
                  {...props.register(`${props.name}.${index}.value` as Path<T>)}
                  className="text-center"
                  isInvalid={Boolean(
                    props.errors[props.name] &&
                      (props.errors[props.name] as unknown as InputArrayErrors[])[index]?.value?.message,
                  )}
                  errorMessage={
                    props.errors[props.name] &&
                    (props.errors[props.name] as unknown as InputArrayErrors[])[index]?.value?.message
                  }
                />
              </div>
              <div className="flex items-center h-14">
                <Button
                  isIconOnly
                  color="danger"
                  aria-label="Like"
                  size="sm"
                  onClick={() => {
                    remove(index);
                    // encrypt(props.getValues());
                  }}
                  data-testid="remove-btn"
                >
                  <RemoveIcon />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Button size="sm" onClick={() => append(EMPTY_ARRAY_INPUT as FieldArray<T, ArrayPath<T>>)}>
        {props.t(`buttons.${shortName}Add`)}
      </Button>
    </div>
  );
}

export default InputsArray;
