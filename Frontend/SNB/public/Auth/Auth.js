(function () {
  function setupSignupForm() {
    const signupForm = document.getElementById("signupForm");

    console.log("Attempting to setup signup form:", signupForm);

    if (!signupForm) return;

    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let fullName = document.getElementById("fullName").value.trim();
      let email = document.getElementById("email").value.trim();
      let password = document.getElementById("password").value;

      if (fullName.length < 2) return;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
      if (password.length < 8) return;

      let users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.some((user) => user.email === email)) return;

      users.push({ fullName, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      console.log("User registered successfully:", users);

      window.location.href = "login.html";
    });
  }

  function setupLoginForm() {
    const loginForm = document.getElementById("login-form");

    console.log("Attempting to setup login form:", loginForm);

    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let email = document.getElementById("login-email").value.trim();
      let password = document.getElementById("login-password").value;

      if (!email || !password) return;

      let users = JSON.parse(localStorage.getItem("users")) || [];

      console.log("Stored Users:", users);

      let validUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (validUser) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            fullName: validUser.fullName,
            email: validUser.email,
          })
        );

        console.log("Login successful for:", email);

        window.location.href = "../Post/post.html";
      } else {
        document.getElementById("login-password").value = "";
      }
    });
  }

  function initializeAuth() {
    console.log("DOM fully loaded. Initializing authentication.");

    if (document.getElementById("signupForm")) setupSignupForm();
    if (document.getElementById("login-form")) setupLoginForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeAuth);
  } else {
    initializeAuth();
  }
})();
