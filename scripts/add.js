import { getRecipes, saveRecipes } from "./storage.js";
import { generateId } from "./utils.js";
import { showToast } from "./toast.js";

const form = document.getElementById("addRecipeForm");

// helper to show error
function showError(id, message) {
  document.getElementById(id).innerText = message;
}

// helper to clear all errors
function clearErrors() {
  document
    .querySelectorAll(".error-message")
    .forEach((e) => (e.innerText = ""));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  let valid = true;

  // FORM INPUTS
  const title = form.title.value.trim();
  const description = form.description.value.trim();
  const ingredients = form.ingredients.value.trim();
  const steps = form.steps.value.trim();
  const difficulty = form.difficulty.value;
  const prepTime = form.prepTime.value.trim();
  const cookTime = form.cookTime.value.trim();
  const servings = form.servings.value.trim();
  const imageUrl = form.imageUrl.value.trim();

  // VALIDATION
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

  if (!cookTime || Number(cookTime) <= 0) {
    showError("err-cooktime", "Cook time must be a positive number.");
    valid = false;
  }

  if (!servings || Number(servings) <= 0) {
    showError("err-servings", "Servings must be a positive number.");
    valid = false;
  }

  if (imageUrl && !imageUrl.startsWith("http")) {
    showError("err-image", "Image URL must begin with http or https.");
    valid = false;
  }

  if (!valid) return;

  // NEW RECIPE OBJECT (CLEAN + CONSISTENT)
  const newRecipe = {
    id: generateId(),
    title,
    description,
    ingredients: ingredients
      .split("\n")
      .map((i) => i.trim())
      .filter(Boolean),
    steps: steps
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    difficulty,
    prepTime: Number(prepTime),
    cookTime: Number(cookTime),
    servings: Number(servings),
    imageUrl,
  };

  // SAVE
  const list = getRecipes();
  list.push(newRecipe);
  saveRecipes(list);

  showToast("Recipe added successfully!", "success");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1000);
});
