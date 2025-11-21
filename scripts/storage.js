import { safeJSONParse, generateId } from "./utils.js";
import { showToast } from "./toast.js";

const STORAGE_KEY = "recipes";

function getSampleRecipes() {
  return [
    {
      id: generateId(),
      title: "Chicken Biryani",
      description:
        "A fragrant, restaurant-style biryani made with marinated chicken, basmati rice, and aromatic whole spices.",
      ingredients: [
        "2 cups basmati rice",
        "500g chicken (bone-in preferred)",
        "1 cup thick curd (yogurt)",
        "2 onions, thinly sliced",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "Whole spices (bay leaf, cloves, cardamom, cinnamon)",
        "1 tsp turmeric",
        "1 tbsp biryani masala",
        "1 tsp red chili powder",
        "Fresh mint & coriander",
        "Ghee or oil",
        "Salt to taste",
      ],
      steps: [
        "Wash and soak basmati rice for 20 minutes.",
        "Marinate chicken with curd, ginger-garlic paste, spices, and salt. Rest 30 minutes.",
        "Fry onions in ghee until golden brown; remove some for layering.",
        "Add tomatoes, spices, and marinated chicken. Cook until chicken is half done.",
        "Par-boil rice with whole spices until 70% cooked.",
        "Layer partially cooked rice over chicken, then top with fried onions, mint, and coriander.",
        "Seal pot and cook on low flame (dum) for 20 minutes.",
        "Rest 10 minutes, fluff gently, and serve hot.",
      ],
      difficulty: "Medium",
      prepTime: 30,
      cookTime: 45,
      servings: 4,
      imageUrl: "images/biryani.jpg",
    },

    {
      id: generateId(),
      title: "Masala Omelette",
      description:
        "A spicy, fluffy Indian-style omelette packed with fresh vegetables and herbs.",
      ingredients: [
        "3 eggs",
        "1 onion, finely chopped",
        "1 green chili, chopped",
        "2 tbsp tomato, chopped",
        "Fresh coriander, chopped",
        "1/4 tsp turmeric",
        "Black pepper to taste",
        "Salt to taste",
        "1 tbsp butter or oil",
      ],
      steps: [
        "Crack eggs into a bowl and whisk until foamy.",
        "Add chopped vegetables, turmeric, pepper, and salt.",
        "Heat butter in a non-stick pan.",
        "Pour the mixture and cook until edges start to firm.",
        "Fold gently and cook both sides until golden.",
        "Serve hot with toast or paratha.",
      ],
      difficulty: "Easy",
      prepTime: 10,
      cookTime: 5,
      servings: 1,
      imageUrl: "images/omelette.jpg",
    },

    {
      id: generateId(),
      title: "Paneer Butter Masala",
      description:
        "A rich and creamy North Indian curry made with paneer simmered in a buttery tomato gravy.",
      ingredients: [
        "250g paneer, cubed",
        "3 tomatoes, pureed",
        "1 onion, chopped",
        "1 tbsp ginger-garlic paste",
        "1/2 cup fresh cream",
        "2 tbsp butter",
        "1 tbsp kasuri methi",
        "1 tsp garam masala",
        "1 tsp chili powder",
        "1/2 tsp turmeric",
        "Salt to taste",
        "1 tbsp sugar (optional)",
      ],
      steps: [
        "Heat butter and sauté onions until soft.",
        "Add ginger-garlic paste and cook for 1 minute.",
        "Add tomato puree and spices; cook until oil separates.",
        "Pour in the cream and simmer gently.",
        "Add paneer cubes and kasuri methi.",
        "Cook on low heat for 5 minutes and serve hot.",
      ],
      difficulty: "Medium",
      prepTime: 15,
      cookTime: 20,
      servings: 3,
      imageUrl: "images/paneer.jpg",
    },

    {
      id: generateId(),
      title: "Pasta Primavera",
      description:
        "A colorful Italian pasta dish tossed with sautéed seasonal vegetables and a light creamy sauce.",
      ingredients: [
        "200g penne or fusilli pasta",
        "1 carrot, sliced",
        "1 bell pepper, chopped",
        "1 cup broccoli florets",
        "3 garlic cloves, minced",
        "1 cup milk or cream",
        "1 tbsp butter",
        "1 tsp chili flakes",
        "Salt and pepper to taste",
        "Parmesan (optional)",
      ],
      steps: [
        "Boil pasta until al dente; drain and set aside.",
        "Heat butter and sauté garlic until fragrant.",
        "Add vegetables and stir-fry on high heat.",
        "Pour in milk/cream and simmer for 2–3 minutes.",
        "Season with chili flakes, salt, and pepper.",
        "Add pasta and toss gently until coated.",
        "Serve warm garnished with parmesan.",
      ],
      difficulty: "Easy",
      prepTime: 15,
      cookTime: 15,
      servings: 2,
      imageUrl: "images/pasta-primavera.jpg",
    },

    {
      id: generateId(),
      title: "Chocolate Mug Cake",
      description:
        "A soft, gooey chocolate cake made in just 1 minute using a microwave.",
      ingredients: [
        "4 tbsp all-purpose flour",
        "2 tbsp cocoa powder",
        "3 tbsp sugar",
        "3 tbsp milk",
        "1 tbsp oil",
        "1/4 tsp baking powder",
        "A pinch of salt",
        "Chocolate chips (optional)",
      ],
      steps: [
        "Mix all dry ingredients in a microwave-safe mug.",
        "Add milk and oil; whisk into a smooth batter.",
        "Fold in chocolate chips if using.",
        "Microwave for 60–70 seconds.",
        "Let it cool slightly and enjoy warm.",
      ],
      difficulty: "Easy",
      prepTime: 3,
      cookTime: 1,
      servings: 1,
      imageUrl: "images/mug-cake.jpg",
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

    showToast("Local data was corrupted. Restored defaults.", "error");

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
