import type { useTranslations } from 'next-intl';
import { z } from 'zod';

import { passwordSchema } from './passwordSchema';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const signUpSchema = (t: ReturnType<typeof useTranslations<'Auth'>>) =>
  z
    .object({
      username: z.string().min(1, t('validation.usernameRequired')),
      email: z
        .string()
        .trim()
        .email({ message: t('validation.invalidEmail') }),
      password: passwordSchema(t),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: t('validation.mismatchPasswords'),
      path: ['confirm'],
    });

export type SignUpDto = z.infer<ReturnType<typeof signUpSchema>>;
