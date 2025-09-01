// === UI Controls ===
const UI = {
  showLogin: () => {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("app").style.display = "none";
  },
  showRegister: () => {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("app").style.display = "none";
  },
  showApp: (username) => {
    document.getElementById("loggedUser").textContent = username;
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("app").style.display = "block";
    Recipe.render();
  },
  logout: () => {
    document.getElementById("app").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  }
};

// === Helpers ===
const Form = {
  get: (id) => document.getElementById(id).value.trim().toLowerCase()
};

const Alert = {
  show: (msg) => alert(msg)
};

// === Auth Logic ===
const Auth = {
  register: (e) => {
    e.preventDefault();
    const username = Form.get("regUsername");
    const password = document.getElementById("regPassword").value.trim();

    if (!username || !password) {
      Alert.show("⚠️ یوزر نیم اور پاسورڈ ضروری ہیں");
      return;
    }

    localStorage.setItem(username, password);
    Alert.show("✅ رجسٹریشن مکمل");
    UI.showLogin();
  },

  login: (e) => {
    e.preventDefault();
    const username = Form.get("loginUsername");
    const password = document.getElementById("loginPassword").value.trim();

    const stored = localStorage.getItem(username);
    if (stored && stored === password) {
      UI.showApp(username);
    } else {
      Alert.show("❌ یوزر نیم یا پاسورڈ غلط ہے");
    }
  }
};

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

// === Event Binding ===
document.addEventListener("DOMContentLoaded", () => {
  const regForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const recipeForm = document.getElementById("recipeForm");
  const goToLoginBtn = document.getElementById("goToLoginBtn");
  const goToRegisterBtn = document.getElementById("goToRegisterBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (regForm) regForm.addEventListener("submit", Auth.register);
  if (loginForm) loginForm.addEventListener("submit", Auth.login);
  if (recipeForm) recipeForm.addEventListener("submit", Recipe.add);
  if (goToLoginBtn) goToLoginBtn.addEventListener("click", UI.showLogin);
  if (goToRegisterBtn) goToRegisterBtn.addEventListener("click", UI.showRegister);
  if (logoutBtn) logoutBtn.addEventListener("click", UI.logout);
});
