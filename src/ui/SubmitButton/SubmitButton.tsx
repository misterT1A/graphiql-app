import { Button } from '@nextui-org/react';
import type { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { FormGraphType, FormRestType } from '@/types/types';

function SubmitButton(props: {
  t: ReturnType<typeof useTranslations<'RestForm'>>;
  register: UseFormRegister<FormRestType> | UseFormRegister<FormGraphType>;
  errors: FieldErrors<FormRestType>;
}): ReactNode {
  return (
    <Button
      size="lg"
      type="submit"
      color={(Object.keys(props.errors).length && 'danger') || 'success'}
      isDisabled={Boolean(Object.keys(props.errors).length)}
      className="h-14"
    >
      {props.t('buttons.send')}
    </Button>
  );
}

export default SubmitButton;
