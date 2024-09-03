const validateJson = (val: string): string | null => {
  try {
    if (val.trim() === '{}' || val.trim() === '' || /^[\s{}]*$/.test(val)) {
      return null;
    }

    const validJsonString = val
      .replace(/:\s*([0-9]+)/g, ': "$1"')
      .replace(/'/g, '"')
      .replace(/(\{\{.*?\}\})\s*:/g, '"$1":')
      .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":')
      .replace(/:(?!\s*({|"))([^,}\]]+)(?=[},])/g, ': "$1"')
      .replace(/:(?!\s*({|"))([^}\]]+)$/g, ': "$1"');

    const parsedValue = JSON.parse(validJsonString);

    return JSON.stringify(parsedValue);
  } catch (e) {
    console.log('Error parsing JSON:', e);
    return null;
  }
};

export default validateJson;
