import { Button, Input } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import type { ReactElement } from 'react';

import InputPassword from '@/ui/InputPassword/InputPassword';

const SignUp = (): ReactElement => {
  const t = useTranslations('SignUp');

  return (
    <main className="flex justify-center">
      <form className="p-4 flex flex-col gap-2">
        <h1 className="text-lg">{t('heading')}</h1>
        <Input name="email" type="email" label="Email" isRequired />
        <InputPassword name="password" label={t('password')} isRequired />
        <InputPassword name="confirm" label={t('confirm')} isRequired />
        <Button color="primary" variant="flat" size="lg">
          {t('submit')}
        </Button>
      </form>
    </main>
  );
};

export default SignUp;

