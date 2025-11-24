import { getRecipes, saveRecipes } from "./storage.js";
import { showToast } from "./toast.js";

// get recipe ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const form = document.getElementById("editRecipeForm");

// find recipe
const recipes = getRecipes();
const recipe = recipes.find((r) => r.id === id);

// show error helper
function showError(id, msg) {
  document.getElementById(id).innerText = msg;
}

// clear all error styles before re-validating
function clearErrors() {
  document
    .querySelectorAll(".error-message")
    .forEach((e) => (e.innerText = ""));
  document
    .querySelectorAll(".input-error")
    .forEach((e) => e.classList.remove("input-error"));
}

if (!recipe) {
  document.getElementById("editContainer").innerHTML =
    "<p class='not-found'>Recipe not found.</p>";
} else {
  // PREFILL FORM
  form.title.value = recipe.title;
  form.description.value = recipe.description;
  form.ingredients.value = recipe.ingredients.join("\n");
  form.steps.value = recipe.steps.join("\n");
  form.difficulty.value = recipe.difficulty;
  form.prepTime.value = recipe.prepTime;
  form.cookTime.value = recipe.cookTime;
  form.servings.value = recipe.servings;
  form.imageUrl.value = recipe.imageUrl || "";
}

// SAVE CHANGES
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  let valid = true;
  let firstInvalidField = null;

  // values
  const title = form.title.value.trim();
  const description = form.description.value.trim();
  const ingredients = form.ingredients.value.trim();
  const steps = form.steps.value.trim();
  const difficulty = form.difficulty.value;
  const prepTime = form.prepTime.value.trim();
  const cookTime = form.cookTime.value.trim();
  const servings = form.servings.value.trim();
  const imageUrl = form.imageUrl.value.trim();

  // VALIDATION HELPER
  function invalidate(fieldName, errorId, message) {
    showError(errorId, message);
    const field = form[fieldName];
    field.classList.add("input-error");

    if (!firstInvalidField) firstInvalidField = field;
    valid = false;
  }

  // VALIDATION RULES
  if (!title) invalidate("title", "err-title", " ⚠️ Please enter a title.");
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
    invalidate("difficulty", "err-difficulty", "⚠️ Select a difficulty level.");

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

  // STOP + SCROLL TO ERROR IF INVALID
  if (!valid) {
    firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalidField.focus();
    return;
  }

  // UPDATE recipe object
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
  recipe.cookTime = Number(cookTime);
  recipe.servings = Number(servings);
  recipe.imageUrl = imageUrl || "./images/food.jpg";

  // SAVE to storage
  saveRecipes(recipes);

  showToast("Recipe updated successfully!", "success");

  setTimeout(() => {
    window.location.href = `detail.html?id=${recipe.id}`;
  }, 1200);
});
