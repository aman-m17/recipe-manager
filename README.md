📘 Recipe Manager – README

A lightweight, browser-based recipe management application built using HTML, CSS, and JavaScript.
Users can add, edit, delete, and view recipes, switch between light/dark mode, filter and search, and enjoy a modern UI — all with localStorage persistence.

## 🔗 Live Demo

<a href="https://aman-m17.github.io/recipe-manager/" target="_blank">Click here to view the live project</a>


## 🚀 How to Run the Application

This project uses JavaScript ES Modules (import/export).
Therefore, you must run it using a local server, not by double-clicking the file.

Option 1 — VS Code Live Server

Install the Live Server extension.

Right-click index.html

Select “Open with Live Server”

App runs at:http://localhost:5500/index.html


Option 2 — Python Simple Server

Run this inside the project folder:

python -m http.server 5500

Open: http://localhost:5500/index.html


Option 3 — Node.js http-server
npm install -g http-server
http-server .


Option 4 - The live Recipe Manager App can be visited at https://aman-m17.github.io/recipe-manager/


## ✨ Features

- Add, edit, delete recipes (full CRUD)
- Real-time search & filters
- Difficulty & prep-time filtering
- LocalStorage data persistence
- Light/Dark mode toggle
- Error handling with field highlighting
- Responsive modern UI
- Placeholder handling for broken or missing images
- Scroll-to-error + validation UX


## 📦 Data Structure (localStorage)

All recipe data is stored inside:

localStorage["recipes"]

The value is an array of recipe objects with the following structure:

{

  "id": "unique-string-id",
  
  "title": "String",
  
  "description": "String",
  
  "ingredients": ["String", "String", "..."],
  
  "steps": ["String", "String", "..."],
  
  "difficulty": "Easy | Medium | Hard",
  
  "prepTime": Number,
  
  "cookTime": Number,
  
  "servings": Number,
  
  "imageUrl": "String (URL) or default-food.jpg"

}

Recipe Object Example:

{

  "id": "rcp_001",
  
  "title": "Paneer Butter Masala",
  
  "description": "Rich and creamy North Indian curry.",
  
  "ingredients": ["Paneer", "Tomatoes", "Cream"],
  
  "steps": ["Blend tomatoes", "Cook gravy", "Add paneer and simmer"],
  
  "difficulty": "Medium",
  
  "prepTime": 20,
  
  "cookTime": 30,
  
  "servings": 4,
  
  "imageUrl": "./images/paneer.jpg"

}


## 🧠 Assumptions

This app was developed under the following assumptions:

localStorage is available and not blocked by private/incognito mode.

Users will enter one ingredient/step per line in the text area.

Image uploads are not required — only URLs or default placeholders.

The app is completely offline — no backend or user accounts.

Users may refresh, but forms do not auto-save.

Browser supports ES module imports (<script type="module">).


## ⚠️ Limitations

Some constraints exist due to the scope and offline nature of the project:

No cloud sync — data is stored only in localStorage.

No file uploads — recipe images must be URLs.

Filtering and search are basic (no fuzzy search, no tag system).

No pagination — all recipes appear in one grid.

No reordering of recipes (drag-and-drop not implemented).

Data can be lost if localStorage is cleared.

Long text may break the card layout slightly.


## 🐞 Known Issues

These issues are known and may be improved in future iterations:

If a user enters extremely long text, cards may expand unevenly.

If an image URL is invalid, the default placeholder is used.

Toast notifications fade quickly when redirection occurs.

Accessing internal pages directly (e.g. /pages/detail.html)
without a server may cause CORS/Module loading errors.

Recipe fields do not currently support:

Fractions (e.g., "0.5 servings")

Step numbering with sub-steps
