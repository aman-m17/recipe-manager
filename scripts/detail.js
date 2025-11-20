import { getRecipes, saveRecipes } from "./storage.js";

const container = document.getElementById("detailContainer");

// get id from URL query
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const recipes = getRecipes();
const recipe = recipes.find((r) => r.id === id);

if (!recipe) {
  container.innerHTML = "<p>Recipe not found.</p>";
} else {
  renderDetail(recipe);
}

function renderDetail(r) {
  container.innerHTML = `
    <div class="recipe-detail-card">

      <h2>${r.title}</h2>

      ${r.imageUrl ? `<img src="${r.imageUrl}" alt="${r.title}" />` : ""}

      <p><strong>Description:</strong> ${r.description}</p>
      <p><strong>Difficulty:</strong> ${r.difficulty}</p>
      <p><strong>Prep Time:</strong> ${r.prepTime} minutes</p>

      <h3>Ingredients</h3>
      <ul>
        ${r.ingredients.map((i) => `<li>${i}</li>`).join("")}
      </ul>

      <h3>Steps</h3>
      <ol>
        ${r.steps.map((s) => `<li>${s}</li>`).join("")}
      </ol>

      <div class="detail-actions">
        <a class="btn primary" href="edit.html?id=${r.id}">Edit</a>
        <button id="deleteBtn" class="btn danger">Delete</button>
      </div>
    </div>
  `;

  document.getElementById("deleteBtn").onclick = () => {
    const confirmed = confirm("Delete this recipe?");
    if (!confirmed) return;

    const updated = recipes.filter((x) => x.id !== r.id);
    saveRecipes(updated);
    window.location.replace("../index.html");
  };
}
