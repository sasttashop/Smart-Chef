const Recipe = {
  add: (e) => {
    e.preventDefault();
    const name = Form.get("recipeName");
    const ingredients = Form.get("recipeIngredients");
    const steps = Form.get("recipeSteps");

    const recipe = { name, ingredients, steps };
    const all = Recipe.getAll();
    all.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(all));
    Recipe.render();
    Alert.show("✅ ترکیب شامل ہو گئی");
    e.target.reset();
  },

  getAll: () => {
    return JSON.parse(localStorage.getItem("recipes") || "[]");
  },

  render: () => {
    const list = document.getElementById("recipeList");
    list.innerHTML = "";
    const recipes = Recipe.getAll();

    if (recipes.length === 0) {
      list.innerHTML = "<p>کوئی ترکیب موجود نہیں</p>";
      return;
    }

    recipes.forEach((r, i) => {
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

// Event Binding
document.getElementById("recipeForm").addEventListener("submit", Recipe.add);
