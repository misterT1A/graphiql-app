import type { useTranslations } from 'next-intl';
import { z } from 'zod';

import { passwordSchema } from './passwordSchema';

export const signInSchema = (
  t: ReturnType<typeof useTranslations<'Auth'>>,
): z.ZodObject<{
  email: z.ZodString;
  password: z.ZodString;
}> =>
  z.object({
    email: z
      .string()
      .trim()
      .email({ message: t('validation.invalidEmail') }),
    password: passwordSchema(t),
  });

export type SignInDto = z.infer<ReturnType<typeof signInSchema>>;
