function parseBody(jsonString: string): string {
  try {
    const data = JSON.parse(jsonString);

    return data;
  } catch (error) {
    return `Error JSON: ${error instanceof Error ? error.message : String(error)}`;
  }
}

export default parseBody;
