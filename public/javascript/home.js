const createPost = document.getElementById("create-post");

const gotoCreatePost = async (event) => {
  event.preventDefault();

  window.location.replace("/post");
};

createPost.addEventListener("click", gotoCreatePost);

// Change Heart Color