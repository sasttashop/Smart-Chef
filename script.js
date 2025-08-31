const UI = {
  toggle: (id, show) => {
    document.getElementById(id).style.display = show ? "block" : "none";
  },
  showLogin: () => {
    UI.toggle("registerForm", false);
    UI.toggle("loginForm", true);
  },
  showRegister: () => {
    UI.toggle("loginForm", false);
    UI.toggle("registerForm", true);
  },
  showApp: (username) => {
    document.getElementById("loggedUser").textContent = username;
    UI.toggle("loginForm", false);
    UI.toggle("app", true);
  },
  logout: () => {
    UI.toggle("app", false);
    UI.toggle("loginForm", true);
  }
};

const Form = {
  get: (id) => document.getElementById(id).value.trim()
};

const Alert = {
  show: (msg) => alert(msg)
};

const Auth = {
  register: (e) => {
    e.preventDefault();
    const username = Form.get("regUsername");
    const password = Form.get("regPassword");

    if (!username || !password) {
      Alert.show("⚠️ Username aur password zaroori hain");
      return;
    }

    localStorage.setItem(username, password);
    Alert.show("✅ Registered");
    UI.showLogin();
  },

  login: (e) => {
    e.preventDefault();
    const username = Form.get("loginUsername");
    const password = Form.get("loginPassword");

    const stored = localStorage.getItem(username);
    if (stored === password) {
      UI.showApp(username);
    } else {
      Alert.show("❌ Invalid login");
    }
  }
};

document.getElementById("registerForm").addEventListener("submit", Auth.register);
document.getElementById("loginForm").addEventListener("submit", Auth.login);
