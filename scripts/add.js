import { getRecipes, saveRecipes } from "./storage.js";
import { generateId } from "./utils.js";
import { showToast } from "./toast.js";

const form = document.getElementById("addRecipeForm");

// show error
function showError(id, message) {
  const el = document.getElementById(id);
  el.innerText = message;
}

// remove all errors
function clearErrors() {
  document
    .querySelectorAll(".error-message")
    .forEach((e) => (e.innerText = ""));
  document
    .querySelectorAll(".input-error")
    .forEach((e) => e.classList.remove("input-error"));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  let valid = true;
  let firstInvalidField = null;

  const title = form.title.value.trim();
  const description = form.description.value.trim();
  const ingredients = form.ingredients.value.trim();
  const steps = form.steps.value.trim();
  const difficulty = form.difficulty.value;
  const prepTime = form.prepTime.value.trim();
  const cookTime = form.cookTime.value.trim();
  const servings = form.servings.value.trim();
  const imageUrl = form.imageUrl.value.trim();

  // helper function to mark field invalid
  function invalidate(fieldName, errorId, message) {
    showError(errorId, message);
    const field = form[fieldName];
    field.classList.add("input-error");

    if (!firstInvalidField) firstInvalidField = field;
    valid = false;
  }

  // VALIDATION
  if (!title) invalidate("title", "err-title", "⚠️ Please enter a title.");
  if (!description)
    invalidate(
      "description",
      "err-description",
      "⚠️ Please enter a description."
    );
  if (!ingredients)
    invalidate(
      "ingredients",
      "err-ingredients",
      "⚠️ Please add at least one ingredient."
    );
  if (!steps)
    invalidate("steps", "err-steps", "⚠️ Please add at least one step.");
  if (difficulty === "")
    invalidate("difficulty", "err-difficulty", "Select a difficulty level.");
  if (!prepTime || Number(prepTime) <= 0)
    invalidate(
      "prepTime",
      "err-preptime",
      "⚠️ Prep time must be a positive number."
    );
  if (!cookTime || Number(cookTime) <= 0)
    invalidate(
      "cookTime",
      "err-cooktime",
      "⚠️ Cook time must be a positive number."
    );
  if (!servings || Number(servings) <= 0)
    invalidate(
      "servings",
      "err-servings",
      "⚠️ Servings must be a positive number."
    );

  if (imageUrl && !imageUrl.startsWith("http"))
    invalidate(
      "imageUrl",
      "err-image",
      "⚠️ Image URL must begin with http or https."
    );

  if (!valid) {
    // AUTO-FOCUS + SCROLL TO FIRST INVALID FIELD
    firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalidField.focus();
    return;
  }

  // new recipe object
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
    imageUrl: imageUrl || "./images/food.jpg",
  };

  const list = getRecipes();
  list.push(newRecipe);
  saveRecipes(list);

  showToast("Recipe added successfully!", "success");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1200);
});
