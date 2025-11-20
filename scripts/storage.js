import { safeJSONParse } from "./utils.js";

const STORAGE_KEY = "recipes";

export function getRecipes() {
  const data = localStorage.getItem(STORAGE_KEY);
  return safeJSONParse(data, []);
}

export function saveRecipes(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
