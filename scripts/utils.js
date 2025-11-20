export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export function safeJSONParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch (e) {
    console.warn("Corrupted localStorage detected. Resetting...", e);
    return fallback;
  }
}
