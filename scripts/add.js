import { getRecipes, saveRecipes } from "./storage.js";
import { generateId } from "./utils.js";

const form = document.getElementById("addRecipeForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newRecipe = {
    id: generateId(),
    title: form.title.value.trim(),
    description: form.description.value.trim(),
    ingredients: form.ingredients.value
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean),
    steps: form.steps.value
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    difficulty: form.difficulty.value,
    prepTime: Number(form.prepTime.value),
    imageUrl: form.imageUrl.value.trim(),
  };

  const list = getRecipes();
  list.push(newRecipe);
  saveRecipes(list);

  // redirect back home
  window.location.href = "../index.html";
});
