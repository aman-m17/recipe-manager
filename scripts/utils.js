export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function safeJSONParse(str, fallback = []) {
  try {
    const parsed = JSON.parse(str);
    return parsed || fallback;
  } catch (error) {
    console.warn("JSON parse failed. Using fallback value.");
    return fallback;
  }
}
