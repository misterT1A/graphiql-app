function prettyBodyJson(jsonString: string): string {
  try {
    const data = JSON.parse(jsonString);

    const prettyJson = JSON.stringify(data, null, 2);

    return prettyJson;
  } catch (error) {
    return `Error JSON: ${error instanceof Error ? error.message : String(error)}`;
  }
}

export default prettyBodyJson;
