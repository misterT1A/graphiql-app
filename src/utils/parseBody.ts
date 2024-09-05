function parseBody(jsonString: { type: 'json' | 'string'; value: string }): string | object {
  if (jsonString.type === 'json') {
    try {
      const data = JSON.parse(jsonString.value);

      return data;
    } catch (error) {
      return `Error JSON: ${error instanceof Error ? error.message : String(error)}`;
    }
  } else {
    return jsonString.value;
  }
}

export default parseBody;
