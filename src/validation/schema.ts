import { z } from 'zod';

import { codeMirrorParser } from '@/utils/code-mirror-parser';

export const schema = z.object({
  method: z.string().min(1, 'Select method'),
  endpoint: z.string().min(1, 'Enter endpoint URL').url('Write valid URL'),
  headers: z.array(z.object({ key: z.string().min(1, 'Fill the field'), value: z.string().min(1, 'Fill the field') })),
  body: z.string().refine((value) => codeMirrorParser(JSON.parse(value)), { message: 'Enter valide JSON object' }),
});
