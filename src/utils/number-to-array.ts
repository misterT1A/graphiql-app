export function numberToArray(n: number): number[] {
  const outputArray: number[] = [];
  for (let counter = 0; counter < n; counter++) {
    outputArray.push(counter + 1);
  }
  return outputArray;
}

