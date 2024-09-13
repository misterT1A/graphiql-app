export function fieldsCounter(array: object[]): number {
  let counter = 0;

  array.forEach((item) => {
    if (item) counter += Object.keys(item).length;
  });

  return counter;
}
