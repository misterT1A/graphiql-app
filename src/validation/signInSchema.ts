import type { useTranslations } from 'next-intl';
import { z } from 'zod';

import { passwordSchema } from './passwordSchema';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const signInSchema = (t: ReturnType<typeof useTranslations<'Auth'>>) =>
  z.object({
    email: z
      .string()
      .trim()
      .email({ message: t('validation.invalidEmail') }),
    password: passwordSchema(t),
  });

export type SignInDto = z.infer<ReturnType<typeof signInSchema>>;
