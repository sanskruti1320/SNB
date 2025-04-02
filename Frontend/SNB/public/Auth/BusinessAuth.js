document.addEventListener("DOMContentLoaded", () => {
  const businessSignupForm = document.getElementById("businessSignupForm");

  if (businessSignupForm) {
    businessSignupForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent page refresh

      // Get form values
      const businessName = document.getElementById("businessName").value.trim();
      const businessEmail = document
        .getElementById("businessEmail")
        .value.trim();
      const mobileNo = document.getElementById("mobileNo").value.trim();
      const socialMedia = document.getElementById("socialMedia").value.trim();
      const businessCategory =
        document.getElementById("businessCategory").value;
      const password = document.getElementById("password").value.trim();

      // Validation
      if (
        !businessName ||
        !businessEmail ||
        !mobileNo ||
        !businessCategory ||
        !password
      ) {
        alert("Please fill all required fields.");
        return;
      }

      // Create business object
      const businessData = {
        businessName,
        businessEmail,
        mobileNo,
        socialMedia,
        businessCategory,
        password, // Note: Passwords should be hashed in a real system
      };

      // Check if localStorage already has businesses
      let businesses =
        JSON.parse(localStorage.getItem("businessAccounts")) || [];

      // Check if email is already registered
      const existingBusiness = businesses.find(
        (b) => b.businessEmail === businessEmail
      );
      if (existingBusiness) {
        alert("Business email already registered. Try logging in.");
        return;
      }

      // Store new business data
      businesses.push(businessData);
      localStorage.setItem("businessAccounts", JSON.stringify(businesses));

      alert("Business account created successfully!");
      businessSignupForm.reset();

      // Redirect to login page (Future Implementation)
      window.location.href = "BusinessLogin.html";
    });
  }
});
document.addEventListener("DOMContentLoaded", () => {
  let loginForm = document.getElementById("businessLoginForm");

  if (loginForm) {
    // ✅ Ensure form exists before adding event listener
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let emailField = document.getElementById("loginEmail");
      let passwordField = document.getElementById("loginPassword");

      // ✅ Check if elements exist before accessing `.value`
      if (!emailField || !passwordField) {
        console.error("Login form elements not found!");
        return;
      }

      let email = emailField.value;
      let password = passwordField.value;

      let storedBusiness =
        JSON.parse(localStorage.getItem("businessAccounts")) || [];
      let validUser = storedBusiness.find(
        (user) => user.businessEmail === email && user.password === password
      );

      if (validUser) {
        alert("Login successful!");

        // ✅ Store login session
        localStorage.setItem("businessLoggedIn", "true");
        localStorage.setItem("loggedInBusinessEmail", email);

        // ✅ Redirect to post.html
        window.location.href = "../Post/post.html";
      } else {
        alert("Email or Password is incorrect");
      }
    });
  } else {
    console.error("Login form not found in the DOM!");
  }
});
