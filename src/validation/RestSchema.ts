import type { useTranslations } from 'next-intl';
import type { ZodSchema } from 'zod';
import { z } from 'zod';

import { codeMirrorParser } from '@/utils/codeMirrorParser';

const RestSchema = (t: ReturnType<typeof useTranslations<'RestForm'>>): ZodSchema => {
  const errorCatcher = (value: string): string => {
    try {
      return JSON.parse(value);
    } catch (error) {
      return (error as Error).message;
    }
  };

  const schema = z.object({
    method: z.string().min(1, t('errors.method')),
    endpoint: z.string().min(1, t('errors.endpointMin')).url(t('errors.endpointURL')),
    headers: z.array(
      z.object({ key: z.string().min(1, t('errors.required')), value: z.string().min(1, t('errors.required')) }),
    ),
    variables: z.array(
      z.object({ key: z.string().min(1, t('errors.required')), value: z.string().min(1, t('errors.required')) }),
    ),
    bodyJSON: z.string().refine(
      (value) => codeMirrorParser(value),
      (value) => ({ message: `"${errorCatcher(value)}"` }),
    ),
    bodyText: z.string(),
  });

  return schema;
};

export default RestSchema;
