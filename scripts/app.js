import { getRecipes } from "./storage.js";

const listEl = document.getElementById("recipeList");
const searchInput = document.getElementById("searchInput");
const difficultyFilter = document.getElementById("difficultyFilter");
const prepTimeFilter = document.getElementById("prepTimeFilter");

function renderRecipes(recipes) {
  listEl.innerHTML = recipes
    .map(
      (r) => `
      <div class="card">

        <img 
        src="${r.imageUrl || "./images/food.jpg"}" 
        class="card-img" 
        onerror="this.src='./images/food.jpg'" 
        />


        <h3>${r.title}</h3>
        <p>${r.description}</p>

        <p><strong>Prep:</strong> ${r.prepTime} min</p>
        <p><strong>Cook:</strong> ${r.cookTime} min</p>
        <p><strong>Serving:</strong> ${r.servings}</p>
        <p><strong>Difficulty:</strong> ${r.difficulty}</p>

        <div class="card-footer">
          <a class="btn btn-primary" href="pages/detail.html?id=${r.id}">
            View Recipe
          </a>
        </div>
      </div>
    `
    )
    .join("");
}

function applyFilters() {
  let term = searchInput.value.toLowerCase();
  let diff = difficultyFilter.value;
  let maxTime = prepTimeFilter.value;

  let list = getRecipes();

  if (term) {
    list = list.filter((r) => r.title.toLowerCase().includes(term));
  }

  if (diff !== "all") {
    list = list.filter((r) => r.difficulty === diff);
  }

  if (maxTime !== "all") {
    list = list.filter((r) => r.prepTime <= Number(maxTime));
  }

  renderRecipes(list);
}

// INITIAL RENDER
applyFilters();

// EVENT LISTENERS
searchInput.oninput = applyFilters;
difficultyFilter.onchange = applyFilters;
prepTimeFilter.onchange = applyFilters;
