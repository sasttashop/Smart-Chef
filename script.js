// === Recipe Logic ===
const Recipe = {
  add: (e) => {
    e.preventDefault();

    const name = document.getElementById("recipeName").value.trim();
    const ingredients = document.getElementById("recipeIngredients").value.trim();
    const steps = document.getElementById("recipeSteps").value.trim();

    if (!name || !ingredients || !steps) {
      Alert.show("⚠️ تمام فیلڈز بھرنا ضروری ہیں");
      return;
    }

    const recipe = { name, ingredients, steps };
    const all = Recipe.getAll();
    all.push(recipe);

    localStorage.setItem("recipes", JSON.stringify(all));
    Recipe.render();
    Alert.show("✅ ترکیب شامل ہو گئی");
    e.target.reset();
  },

  getAll: () => {
    try {
      return JSON.parse(localStorage.getItem("recipes")) || [];
    } catch (err) {
      console.error("❌ Recipe parsing error:", err);
      return [];
    }
  },

  render: () => {
    const list = document.getElementById("recipeList");
    list.innerHTML = "";

    const recipes = Recipe.getAll();
    if (recipes.length === 0) {
      list.innerHTML = "<p>کوئی ترکیب موجود نہیں</p>";
      return;
    }

    recipes.forEach((r) => {
      const div = document.createElement("div");
      div.className = "recipe-card";
      div.innerHTML = `
        <h4>${r.name}</h4>
        <p><strong>اجزاء:</strong> ${r.ingredients}</p>
        <p><strong>مراحل:</strong> ${r.steps}</p>
      `;
      list.appendChild(div);
    });
  }
};

// === Recipe Form Binding ===
document.addEventListener("DOMContentLoaded", () => {
  const recipeForm = document.getElementById("recipeForm");
  if (recipeForm) recipeForm.addEventListener("submit", Recipe.add);
});
