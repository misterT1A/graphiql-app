'use client';

import { Select, SelectItem } from '@nextui-org/react';
import type { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import type { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';

import { TEXT_CONTENT } from '@/constants/constants';
import useEncryption from '@/hooks/useEncryption';
import type { FormRestType } from '@/types/types';

function SelectInput(props: {
  t: ReturnType<typeof useTranslations<'RestForm'>>;
  getValues: UseFormGetValues<FormRestType>;
  register: UseFormRegister<FormRestType>;
  errors: FieldErrors<FormRestType>;
}): ReactNode {
  const { encriptMethod } = useEncryption();
  return (
    <Select
      label={props.t('labels.method')}
      {...props.register('method')}
      onBlur={() => encriptMethod(props.getValues('method'))}
      className="w-[105px] text-center"
      isInvalid={Boolean(props.errors.method)}
      errorMessage={props.errors.method?.message}
    >
      {TEXT_CONTENT.methodValues.map((value, index) => {
        return (
          <SelectItem value={value} key={value} hidden={!index}>
            {value}
          </SelectItem>
        );
      })}
    </Select>
  );
}

export default SelectInput;
