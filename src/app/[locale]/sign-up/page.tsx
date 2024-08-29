'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { type ReactElement } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import InputPassword from '@/ui/InputPassword/InputPassword';
import { signUpSchema, type SignUpDto } from '@/validation/signUpSchema';

import { signUpAction } from './signUpAction';

const SignUp = (): ReactElement => {
  const t = useTranslations('SignUp');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpDto>({
    resolver: zodResolver(signUpSchema(t)),
  });

  const onSubmit: SubmitHandler<SignUpDto> = async (dto): Promise<void> => {
    const response = await signUpAction(dto);

    if (response) {
      console.error(response);
    }
  };

  return (
    <main className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-2" noValidate>
        <h1 className="text-lg">{t('form.heading')}</h1>
        <Input
          label={t('form.username')}
          isRequired={true}
          errorMessage={errors.username?.message}
          isInvalid={!!errors.username}
          disabled={isSubmitting}
          {...register('username')}
        />
        <Input
          type="email"
          label="Email"
          isRequired={true}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          disabled={isSubmitting}
          {...register('email')}
        />
        <InputPassword
          label={t('form.password')}
          isRequired={true}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          disabled={isSubmitting}
          {...register('password')}
        />
        <InputPassword
          label={t('form.confirm')}
          isRequired={true}
          errorMessage={errors.confirm?.message}
          isInvalid={!!errors.confirm}
          disabled={isSubmitting}
          {...register('confirm')}
        />
        <Button isLoading={isSubmitting} type="submit" color="primary" variant="flat" size="lg">
          {t('form.submit')}
        </Button>
      </form>
    </main>
  );
};

export default SignUp;

