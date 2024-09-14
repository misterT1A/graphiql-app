import type { useTranslations } from 'next-intl';
import type { ZodSchema } from 'zod';
import { z } from 'zod';

const GraphSchema = (t: ReturnType<typeof useTranslations<'Form'>>): ZodSchema => {
  const schema = z.object({
    endpoint: z.string().min(1, t('errors.endpointMin')).url(t('errors.endpointURL')),
    sdl: z.string(),
    headers: z.array(
      z.object({ key: z.string().min(1, t('errors.required')), value: z.string().min(1, t('errors.required')) }),
    ),
    variables: z.array(
      z.object({ key: z.string().min(1, t('errors.required')), value: z.string().min(1, t('errors.required')) }),
    ),
    query: z.string(),
  });

  return schema;
};

export default GraphSchema;
