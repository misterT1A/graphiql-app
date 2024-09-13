'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { type MessageKeys, useTranslations } from 'next-intl';
import { type ReactElement } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { FirebaseError, signIn } from '@/firebase/auth';
import messages from '@/messages/en.json';
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
      if (error instanceof FirebaseError && error.code in messages.Auth.firebaseAuthErrors) {
        toast.error(
          t(('firebaseAuthErrors.' + error.code) as MessageKeys<typeof messages.Auth, keyof typeof messages.Auth>),
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong.');
      }
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-80 p-4 flex flex-col" noValidate>
        <h1 className="text-lg">{t('signInForm.heading')}</h1>
        <Input
          className="h-24"
          type="email"
          label="Email"
          isRequired={true}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
          disabled={isSubmitting}
          {...register('email')}
        />
        <InputPassword
          className="h-24"
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
    </div>
  );
};

export default SignIn;
