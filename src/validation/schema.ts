import { z } from 'zod';

import { codeMirrorParser } from '@/utils/codeMirrorParser';

const errorCatcher = (value: string): string => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return (error as Error).message;
  }
};

export const schema = z.object({
  method: z.string().min(1, 'Select method'),
  endpoint: z.string().min(1, 'Enter endpoint URL').url('Write valid URL'),
  headers: z.array(z.object({ key: z.string().min(1, 'Fill the field'), value: z.string().min(1, 'Fill the field') })),
  body: z.string().refine(
    (value) => codeMirrorParser(value),
    (value) => ({ message: errorCatcher(value) }),
  ),
});
