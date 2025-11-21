import { getRecipes, saveRecipes } from "./storage.js";
import { showToast } from "./toast.js";

const form = document.getElementById("editRecipeForm");

// Read recipe ID
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let recipes = getRecipes();
let recipe = recipes.find((r) => r.id === id);

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

loadFormValues();

// Helpers
function showError(id, msg) {
  document.getElementById(id).innerText = msg;
}
function clearErrors() {
  document
    .querySelectorAll(".error-message")
    .forEach((e) => (e.innerText = ""));
}

// Handle update
form.addEventListener("submit", (e) => {
  e.preventDefault();

  clearErrors();

  let valid = true;

  if (!form.title.value.trim()) {
    showError("err-title", "Title is required.");
    valid = false;
  }

  if (!form.description.value.trim()) {
    showError("err-description", "Description cannot be empty.");
    valid = false;
  }

  if (!form.ingredients.value.trim()) {
    showError("err-ingredients", "Enter at least 1 ingredient.");
    valid = false;
  }

  if (!form.steps.value.trim()) {
    showError("err-steps", "Enter at least 1 step.");
    valid = false;
  }

  if (form.difficulty.value === "") {
    showError("err-difficulty", "Select a difficulty.");
    valid = false;
  }

  if (!form.prepTime.value.trim() || Number(form.prepTime.value) <= 0) {
    showError("err-preptime", "Prep time must be positive.");
    valid = false;
  }

  const imageUrl = form.imageUrl.value.trim();
  if (imageUrl && !imageUrl.startsWith("http")) {
    showError("err-image", "URL must start with http or https.");
    valid = false;
  }

  if (!valid) return;

  // Update recipe object
  recipe.title = form.title.value.trim();
  recipe.description = form.description.value.trim();
  recipe.ingredients = form.ingredients.value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  recipe.steps = form.steps.value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  recipe.difficulty = form.difficulty.value;
  recipe.prepTime = Number(form.prepTime.value);
  recipe.imageUrl = imageUrl;

  // Save
  saveRecipes(recipes);

  showToast("Recipe updated!", "success");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1000);
});
