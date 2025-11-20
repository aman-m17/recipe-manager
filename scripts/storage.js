import { safeJSONParse, generateId } from "./utils.js";

const STORAGE_KEY = "recipes";

function getSampleRecipes() {
  return [
    {
      id: generateId(),
      title: "Chicken Biriyani",
      description: "A flavorful and aromatic home-style biriyani.",
      ingredients: ["Basmati rice", "Chicken", "Curd", "Ghee"],
      steps: ["Marinate chicken", "Cook onions", "Add rice", "Pressure cook"],
      difficulty: "Medium",
      prepTime: 45,
      imageUrl: "",
    },
    {
      id: generateId(),
      title: "Masala Omelette",
      description: "Quick spicy omelette.",
      ingredients: ["Eggs", "Onions", "Green chillies"],
      steps: ["Beat eggs", "Mix vegetables", "Cook on pan"],
      difficulty: "Easy",
      prepTime: 10,
      imageUrl: "",
    },
    {
      id: generateId(),
      title: "Paneer Butter Masala",
      description: "Rich restaurant-style curry.",
      ingredients: ["Paneer", "Tomatoes", "Cream"],
      steps: ["Blend tomatoes", "Cook masala", "Add cream"],
      difficulty: "Medium",
      prepTime: 35,
      imageUrl: "",
    },
  ];
}

/* Get recipes safely */
export function getRecipes() {
  const raw = localStorage.getItem(STORAGE_KEY);

  // corrupted localStorage (invalid JSON)
  const parsed = safeJSONParse(raw, null);

  // if storage missing or corrupted → reset to samples
  if (!parsed || !Array.isArray(parsed)) {
    const samples = getSampleRecipes();
    saveRecipes(samples);
    return samples;
  }

  return parsed;
}

/* Save safely */
export function saveRecipes(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save recipes to localStorage", e);
  }
}

/* Ensure first-load seeding */
export function ensureInitialData() {
  const existing = getRecipes();

  // if empty, seed samples
  if (!existing || existing.length === 0) {
    const samples = getSampleRecipes();
    saveRecipes(samples);
  }
}
