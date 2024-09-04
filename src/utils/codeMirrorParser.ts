export function codeMirrorParser(input: string): object | null {
  try {
    const validJsonString = input
      .replace(/\\n/g, '')
      .replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, '"{{$1}}"')
      .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2":');
    console.log(JSON.parse(validJsonString));
    return JSON.parse(validJsonString);
  } catch {
    return null;
  }
}
