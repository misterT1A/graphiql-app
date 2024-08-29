import type { useTranslations } from 'next-intl';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const signUpSchema = (t: ReturnType<typeof useTranslations<'SignUp'>>) =>
  z
    .object({
      username: z.string().min(1, t('validation.usernameRequired')),
      email: z
        .string()
        .trim()
        .email({ message: t('validation.invalidEmail') }),
      password: z
        .string()
        .min(8, t('validation.invalidPasswordLength', { length: 8 }))
        .regex(new RegExp('\\p{Letter}+', 'u'), t('validation.mustContainLetter'))
        .regex(new RegExp('\\d+'), t('validation.mustContainDigit'))
        .regex(new RegExp('[!@#$%^&*(),.?":{}|<>]+'), t('validation.mustContainSpecialCharacter')),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: t('validation.mismatchPasswords'),
      path: ['confirm'],
    });

export type SignUpDto = z.infer<ReturnType<typeof signUpSchema>>;

