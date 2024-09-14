import { notFound } from 'next/navigation';

function parseBody(jsonString: { type: 'json' | 'string'; value: string }): string | object {
  if (jsonString.type === 'json') {
    try {
      const data = JSON.parse(jsonString.value);
      return data;
    } catch {
      notFound();
    }
  } else {
    return jsonString.value;
  }
}

export default parseBody;
