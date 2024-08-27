export function codeMirrorParser(input: string): object | null {
  try {
    const validJsonString = input.replace(/\\n/g, '').replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2":');

    return JSON.parse(validJsonString);
  } catch {
    return null;
  }
}
