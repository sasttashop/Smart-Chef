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
    console.log("✅ Logged in as:", username);
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

    console.log("📝 Registered:", username);
    console.log("📝 Saved password:", localStorage.getItem(username));

    Alert.show("✅ رجسٹریشن مکمل");
    UI.showLogin();
  },

  login: (e) => {
    e.preventDefault();
    const username = Form.get("loginUsername");
    const password = document.getElementById("loginPassword").value.trim();

    const stored = localStorage.getItem(username);

    console.log("🔐 Login username:", username);
    console.log("🔐 Entered password:", password);
    console.log("🔐 Stored password:", stored);

    if (stored && stored === password) {
      Alert.show("✅ لاگ ان کامیاب");
      UI.showApp(username);
    } else {
      Alert.show("❌ یوزر نیم یا پاسورڈ غلط ہے");
      console.warn("Login failed for:", username);
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

    const
