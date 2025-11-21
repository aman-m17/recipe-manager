const toggleBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    toggleBtn.textContent = "🌙";
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
}

toggleBtn.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  applyTheme(newTheme);
});

initTheme();
