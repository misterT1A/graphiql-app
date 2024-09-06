export function codeMirrorParser(input: string): object | null {
  try {
    const validJsonString = input.replace(/\\n/g, '').replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, '"{{$1}}"');

    return JSON.parse(validJsonString);
  } catch {
    return null;
  }
}
