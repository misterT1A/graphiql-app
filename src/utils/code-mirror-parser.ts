export function codeMirrorParser(input: string): object | null {
  try {
    const validJsonString = input
      .replace(/\\n/g, '')
      .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2":')
      .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?,/g, '"$2",')
      .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*\}/g, '"$2"}')
      .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*\{/g, '"$2":{')
      .replace(/'/g, '"');

    return JSON.parse(validJsonString);
  } catch {
    return null;
  }
}

