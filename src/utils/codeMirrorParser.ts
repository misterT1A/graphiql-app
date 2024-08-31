export function codeMirrorParser(input: string): string {
  try {
    const validJsonString = input.replace(/\\n/g, '').replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2":');

    return validJsonString;
  } catch {
    return '';
  }
}
