import type { useTranslations } from 'next-intl';
import { z } from 'zod';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const passwordSchema = (t: ReturnType<typeof useTranslations<'Auth'>>) =>
  z
    .string()
    .min(8, t('validation.invalidPasswordLength', { length: 8 }))
    .regex(new RegExp('\\p{Letter}+', 'u'), t('validation.mustContainLetter'))
    .regex(new RegExp('\\d+'), t('validation.mustContainDigit'))
    .regex(new RegExp('[!@#$%^&*(),.?":{}|<>]+'), t('validation.mustContainSpecialCharacter'));

