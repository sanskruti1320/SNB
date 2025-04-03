document.addEventListener("DOMContentLoaded", () => {
  let loggedInEmail =
    localStorage.getItem("loggedInEmail") ||
    localStorage.getItem("loggedInBusinessEmail");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let businesses = JSON.parse(localStorage.getItem("businessAccounts")) || [];

  let currentUser =
    users.find((user) => user.email === loggedInEmail) ||
    businesses.find((business) => business.businessEmail === loggedInEmail);

  if (!currentUser) {
    alert("You need to login to access this page!");
    window.location.href = "../Auth/login.html";
    return;
  }

  // Determine if this is a business account or regular user
  const isBusinessAccount = businesses.some(
    (business) => business.businessEmail === loggedInEmail
  );

  document.getElementById("profileName").textContent = `Name: ${
    isBusinessAccount ? currentUser.businessName : currentUser.fullName
  }`;
  document.getElementById("profileEmail").textContent = `Email: ${
    isBusinessAccount ? currentUser.businessEmail : currentUser.email
  }`;
  document.getElementById("profileMobile").textContent = `Mobile: ${
    currentUser.mobileNo || "N/A"
  }`;
  document.getElementById("profileCategory").textContent = `Category: ${
    isBusinessAccount ? currentUser.businessCategory : "User"
  }`;

  let socialLink = document.getElementById("profileSocial").querySelector("a");
  socialLink.href = currentUser.socialMedia || "#";
  socialLink.textContent = currentUser.socialMedia
    ? "Visit Social Profile"
    : "No Social Media";

  // Profile Picture Handling
  let profilePic = document.getElementById("profilePic");
  let profilePicInput = document.getElementById("profilePicInput");

  let savedProfilePic = localStorage.getItem(`profilePic_${loggedInEmail}`);
  if (savedProfilePic) {
    profilePic.src = savedProfilePic;
  }

  profilePicInput.addEventListener("change", function () {
    let file = profilePicInput.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function (event) {
        let base64Image = event.target.result;
        localStorage.setItem(`profilePic_${loggedInEmail}`, base64Image);
        profilePic.src = base64Image;
      };
      reader.readAsDataURL(file);
    }
  });

  // Logout functionality
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInEmail");
    localStorage.removeItem("loggedInBusinessEmail");
    window.location.href = "../Auth/login.html";
  });
});
