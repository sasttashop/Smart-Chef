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

// === Event Binding ===
document.addEventListener("DOMContentLoaded", () => {
  const regForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (regForm) regForm.addEventListener("submit", Auth.register);
  if (loginForm) loginForm.addEventListener("submit", Auth.login);
});
