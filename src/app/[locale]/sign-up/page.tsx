'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { type MessageKeys, useTranslations } from 'next-intl';
import { type ReactElement } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { FirebaseError, signUp } from '@/firebase/auth';
import messages from '@/messages/en.json';
import { useRouterIntl } from '@/navigation';
import InputPassword from '@/ui/InputPassword/InputPassword';
import { signUpSchema, type SignUpDto } from '@/validation/signUpSchema';

const SignUp = (): ReactElement => {
  const t = useTranslations('Auth');
  const router = useRouterIntl();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpDto>({
    resolver: zodResolver(signUpSchema(t)),
  });

  const onSubmit: SubmitHandler<SignUpDto> = async (dto): Promise<void> => {
    try {
      await signUp(dto);
      toast.success(t('signUpForm.signUpSuccess'));
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
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-2" noValidate>
        <h1 className="text-lg">{t('signUpForm.heading')}</h1>
        <Input
          label={t('signUpForm.username')}
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
          label={t('signUpForm.password')}
          isRequired={true}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          disabled={isSubmitting}
          {...register('password')}
        />
        <InputPassword
          label={t('signUpForm.confirm')}
          isRequired={true}
          errorMessage={errors.confirm?.message}
          isInvalid={!!errors.confirm}
          disabled={isSubmitting}
          {...register('confirm')}
        />
        <Button isLoading={isSubmitting} type="submit" color="primary" variant="flat" size="lg">
          {t('signUpForm.submit')}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
