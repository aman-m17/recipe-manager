import { getRecipes, saveRecipes } from "./storage.js";
import { showToast } from "./toast.js";

const container = document.getElementById("detailContainer");

// get id from URL query
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const recipes = getRecipes();
const recipe = recipes.find((r) => r.id === id);

if (!recipe) {
  container.innerHTML = "<p class='not-found'>Recipe not found.</p>";
} else {
  renderDetail(recipe);
}

function renderDetail(r) {
  container.innerHTML = `
    <div class="detail-card">

      <div class="detail-header">
        <h2>${r.title}</h2>
        <span class="badge">${r.difficulty}</span>
      </div>

      ${r.imageUrl ? `<img class="detail-img" src="${r.imageUrl}" />` : ""}

      <div class="detail-meta">
        <p><strong>Prep Time:</strong> ${r.prepTime} min</p>
      </div>

      <div class="section">
        <h3>Ingredients</h3>
        <ul>
          ${r.ingredients.map((i) => `<li>${i}</li>`).join("")}
        </ul>
      </div>

      <div class="section">
        <h3>Steps</h3>
        <ol>
          ${r.steps.map((s) => `<li>${s}</li>`).join("")}
        </ol>
      </div>

        
      <div class="detail-actions">
        <a href="edit.html?id=${r.id}" class="btn btn-primary">Edit Recipe</a>
        <button id="deleteBtn" class="btn btn-danger">Delete</button>
      </div>

      </div>

    </div>
  `;

  document.getElementById("deleteBtn").onclick = () => {
    const confirmed = confirm("Delete this recipe?");
    if (!confirmed) return;

    const updated = recipes.filter((x) => x.id !== r.id);
    saveRecipes(updated);

    showToast("Recipe deleted", "warning");

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1000);
  };
}
