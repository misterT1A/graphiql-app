import { EMPTY_ARRAY_INPUT } from '@/constants/constants';
import type { FormRestDataType } from '@/types/types';

export function InputsObjectToArray(object: FormRestDataType | undefined, name: 'headers' | 'variables'): object[] {
  const outputArray = [];

  if (object) {
    for (const keys in object[name]) {
      outputArray.push({ key: keys, value: object[name][keys] });
    }
  } else {
    outputArray.push(EMPTY_ARRAY_INPUT);
  }

  return outputArray;
}
