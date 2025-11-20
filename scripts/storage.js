import { safeJSONParse, generateId } from "./utils.js";

const STORAGE_KEY = "recipes";

function getSampleRecipes() {
  return [
    {
      id: generateId(),
      title: "Chicken Biriyani",
      description: "A flavorful and aromatic home-style biriyani.",
      ingredients: [
        "Basmati rice",
        "Chicken",
        "Curd",
        "Ghee",
        "Onions",
        "Ginger-garlic paste",
        "Spices",
        "Mint & coriander",
      ],
      steps: [
        "Marinate chicken with curd and spices.",
        "Cook onions with aromatics.",
        "Add chicken and partially cook.",
        "Add soaked rice and ghee.",
        "Pressure cook for 2–3 whistles.",
      ],
      difficulty: "Medium",
      prepTime: 45,
      imageUrl: "",
    },

    {
      id: generateId(),
      title: "Masala Omelette",
      description: "A quick spicy Indian omelette.",
      ingredients: [
        "Eggs",
        "Onions",
        "Green chillies",
        "Salt",
        "Pepper",
        "Coriander",
      ],
      steps: [
        "Beat eggs.",
        "Mix onions, chillies, salt and pepper.",
        "Cook on pan with oil.",
      ],
      difficulty: "Easy",
      prepTime: 10,
      imageUrl: "",
    },

    {
      id: generateId(),
      title: "Paneer Butter Masala",
      description: "Rich, creamy, restaurant-style paneer masala.",
      ingredients: ["Paneer", "Tomatoes", "Cream", "Butter", "Spices"],
      steps: [
        "Blend tomatoes.",
        "Cook paste with spices.",
        "Add cream and paneer.",
      ],
      difficulty: "Medium",
      prepTime: 35,
      imageUrl: "",
    },

    {
      id: generateId(),
      title: "Veg Fried Rice",
      description: "Chinese-style vegetable stir-fried rice.",
      ingredients: [
        "Cooked rice",
        "Carrots",
        "Beans",
        "Capsicum",
        "Soy sauce",
        "Oil",
      ],
      steps: [
        "Heat oil and fry vegetables.",
        "Add rice and soy sauce.",
        "Stir fry for 3–4 minutes.",
      ],
      difficulty: "Easy",
      prepTime: 20,
      imageUrl: "",
    },
  ];
}

/* get recipes from localStorage */

export function getRecipes() {
  const data = localStorage.getItem(STORAGE_KEY);
  return safeJSONParse(data, []);
}

/* save recipes to localStorage */

export function saveRecipes(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/* Ensure initial data exists */

export function ensureInitialData() {
  const existing = getRecipes();

  // If empty, seed sample recipes
  if (!existing || existing.length === 0) {
    const samples = getSampleRecipes();
    saveRecipes(samples);
  }
}

ensureInitialData();
