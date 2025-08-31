// === UI کنٹرول ===
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

// === رجسٹریشن اور لاگ ان لاجک ===
const Auth = {
  register: (e) => {
    e.preventDefault();
    const username = Form.get("regUsername");
    const password = Form.get("regPassw…
