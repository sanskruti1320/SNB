document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("createPostForm");

  postForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const postTitle = document.getElementById("postTitle").value;
    const postContent = document.getElementById("postContent").value;
    const postImageInput = document.getElementById("postImage");

    // Check if an image is selected
    let imageBase64 = "";
    if (postImageInput.files.length > 0) {
      const file = postImageInput.files[0];
      imageBase64 = await convertToBase64(file); // Convert image to Base64
    }

    // Retrieve existing posts from local storage
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Create new post object
    const newPost = {
      title: postTitle,
      content: postContent,
      image: imageBase64,
      author: localStorage.getItem("loggedInBusinessEmail") || "Unknown",
    };

    // Save updated posts array to local storage
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("Post Created Successfully!");
    window.location.href = "post.html"; // Redirect to post page
  });

  // Function to convert image to Base64
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
});
