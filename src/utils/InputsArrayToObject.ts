export function InputsArrayToObject(array: { key: string; value: string }[]): { [key: string]: string } {
  const outputObject: { [key: string]: string } = {};

  array.forEach((value) => (outputObject[value.key] = value.value));

  return outputObject;
}
