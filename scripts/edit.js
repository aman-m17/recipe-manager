import { getRecipes, saveRecipes } from "./storage.js";

const form = document.getElementById("editRecipeForm");

// Get recipe ID from ?id=...
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let recipes = getRecipes();
let recipe = recipes.find((r) => r.id === id);

// If ID not found, redirect
if (!recipe) {
  alert("Recipe not found!");
  window.location.href = "../index.html";
}

function loadFormValues() {
  form.title.value = recipe.title;
  form.description.value = recipe.description;
  form.ingredients.value = recipe.ingredients.join("\n");
  form.steps.value = recipe.steps.join("\n");
  form.difficulty.value = recipe.difficulty;
  form.prepTime.value = recipe.prepTime;
  form.imageUrl.value = recipe.imageUrl || "";
}

// Prefill form
loadFormValues();

// Handle update
form.addEventListener("submit", (e) => {
  e.preventDefault();

  recipe.title = form.title.value.trim();
  recipe.description = form.description.value.trim();

  recipe.ingredients = form.ingredients.value
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean);

  recipe.steps = form.steps.value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  recipe.difficulty = form.difficulty.value;
  recipe.prepTime = Number(form.prepTime.value);
  recipe.imageUrl = form.imageUrl.value.trim();

  // Save updated list
  saveRecipes(recipes);

  // Redirect back
  window.location.href = "../index.html";
});
