'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import { type ReactElement } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { signIn } from '@/firebase/auth';
import { useRouterIntl } from '@/navigation';
import InputPassword from '@/ui/InputPassword/InputPassword';
import { signInSchema, type SignInDto } from '@/validation/signInSchema';

const SignIn = (): ReactElement => {
  const t = useTranslations('Auth');
  const router = useRouterIntl();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInDto>({
    resolver: zodResolver(signInSchema(t)),
  });

  const onSubmit: SubmitHandler<SignInDto> = async (dto): Promise<void> => {
    try {
      await signIn(dto);
      toast.success(t('signInForm.signInSuccess'));
      router.replace('/');
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <main className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-2" noValidate>
        <h1 className="text-lg">{t('signInForm.heading')}</h1>
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
          label={t('signInForm.password')}
          isRequired={true}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          disabled={isSubmitting}
          {...register('password')}
        />
        <Button isLoading={isSubmitting} type="submit" color="primary" variant="flat" size="lg">
          {t('signInForm.submit')}
        </Button>
      </form>
    </main>
  );
};

export default SignIn;
