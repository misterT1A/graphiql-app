export function numberToMatrix(n: number): string[][] {
  const outputArray: string[][] = [];
  for (let counter = 0; counter < n; counter++) {
    outputArray.push(new Array(0));
  }
  return outputArray;
}

