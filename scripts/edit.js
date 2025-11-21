import { getRecipes, saveRecipes } from "./storage.js";
import { showToast } from "./toast.js";

const form = document.getElementById("editRecipeForm");

// Get ID from query string
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let recipes = getRecipes();
let recipe = recipes.find((r) => r.id === id);

// Error UI helpers
function showError(id, message) {
  document.getElementById(id).innerText = message;
}

function clearErrors() {
  document
    .querySelectorAll(".error-message")
    .forEach((e) => (e.innerText = ""));
}

// Redirect if invalid
if (!recipe) {
  alert("Recipe not found!");
  window.location.href = "../index.html";
}

// Prefill
function loadFormValues() {
  form.title.value = recipe.title;
  form.description.value = recipe.description;
  form.ingredients.value = recipe.ingredients.join("\n");
  form.steps.value = recipe.steps.join("\n");
  form.difficulty.value = recipe.difficulty;
  form.prepTime.value = recipe.prepTime;
  form.imageUrl.value = recipe.imageUrl || "";
}

loadFormValues();

// Save changes
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  let valid = true;

  const title = form.title.value.trim();
  const description = form.description.value.trim();
  const ingredients = form.ingredients.value.trim();
  const steps = form.steps.value.trim();
  const difficulty = form.difficulty.value;
  const prepTime = form.prepTime.value.trim();
  const imageUrl = form.imageUrl.value.trim();

  // Validation identical to add.js
  if (!title) {
    showError("err-title", "Title is required.");
    valid = false;
  }
  if (!description) {
    showError("err-description", "Description cannot be empty.");
    valid = false;
  }
  if (!ingredients) {
    showError("err-ingredients", "Enter at least 1 ingredient.");
    valid = false;
  }
  if (!steps) {
    showError("err-steps", "Enter at least 1 step.");
    valid = false;
  }
  if (difficulty === "") {
    showError("err-difficulty", "Select a difficulty level.");
    valid = false;
  }
  if (!prepTime || Number(prepTime) <= 0) {
    showError("err-preptime", "Prep time must be a positive number.");
    valid = false;
  }
  if (imageUrl && !imageUrl.startsWith("http")) {
    showError("err-image", "Image URL must begin with http or https.");
    valid = false;
  }

  if (!valid) return;

  // Apply changes
  recipe.title = title;
  recipe.description = description;
  recipe.ingredients = ingredients
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean);
  recipe.steps = steps
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  recipe.difficulty = difficulty;
  recipe.prepTime = Number(prepTime);
  recipe.imageUrl = imageUrl;

  saveRecipes(recipes);

  showToast("Recipe updated!", "success");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 800);
});
