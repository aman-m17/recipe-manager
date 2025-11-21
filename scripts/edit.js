import { getRecipes, saveRecipes } from "./storage.js";
import { showToast } from "./toast.js";

const form = document.getElementById("editRecipeForm");

// read recipe id from query string
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let recipes = getRecipes();
let recipe = recipes.find((r) => r.id === id);

// if ID not found → redirect
if (!recipe) {
  alert("Recipe not found!");
  window.location.href = "../index.html";
}

// prefill the form with existing values
function loadFormValues() {
  form.title.value = recipe.title || "";
  form.description.value = recipe.description || "";

  form.ingredients.value = (recipe.ingredients || []).join("\n");
  form.steps.value = (recipe.steps || []).join("\n");

  form.difficulty.value = recipe.difficulty || "";

  form.prepTime.value =
    typeof recipe.prepTime === "number" ? recipe.prepTime : "";
  form.cookTime.value =
    typeof recipe.cookTime === "number" ? recipe.cookTime : "";
  form.servings.value =
    typeof recipe.serving === "number" ? recipe.serving : "";

  form.imageUrl.value = recipe.imageUrl || "";
}

loadFormValues();

// helpers
function showError(id, message) {
  document.getElementById(id).innerText = message;
}

function clearErrors() {
  document
    .querySelectorAll(".error-message")
    .forEach((e) => (e.innerText = ""));
}

// handle update
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  let valid = true;

  const title = form.title.value.trim();
  const description = form.description.value.trim();
  const ingredientsText = form.ingredients.value.trim();
  const stepsText = form.steps.value.trim();
  const difficulty = form.difficulty.value;
  const prepTime = form.prepTime.value.trim();
  const cookTime = form.cookTime.value.trim();
  const servings = form.servings.value.trim();
  const imageUrl = form.imageUrl.value.trim();

  // Validation
  if (!title) {
    showError("err-title", "Title is required.");
    valid = false;
  }

  if (!description) {
    showError("err-description", "Description cannot be empty.");
    valid = false;
  }

  if (!ingredientsText) {
    showError("err-ingredients", "Enter at least 1 ingredient.");
    valid = false;
  }

  if (!stepsText) {
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

  // update recipe object
  recipe.title = title;
  recipe.description = description;
  recipe.ingredients = ingredientsText
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean);
  recipe.steps = stepsText
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  recipe.difficulty = difficulty;
  recipe.prepTime = Number(prepTime);
  recipe.cookTime = Number(cookTime);
  recipe.servings = Number(servings);
  recipe.imageUrl = imageUrl;

  // save updated list
  saveRecipes(recipes);

  showToast("Recipe updated successfully!", "success");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1000);
});
