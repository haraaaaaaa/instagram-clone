// requirements
const express = require("express");
const path = require("path");
const fs = require("fs");

// express setup
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.listen(5000, () => console.log("Server is running."));

// ejs setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//variables
const postsDataPath = path.join(__dirname, "data", "posts.json");

// route handling
app.get("/", (request, response) => {
  fs.readFile(postsDataPath, (err, posts) => {
    response.render("home", {
      pageTitle: "Home",
      posts: JSON.parse(posts),
    });
  });
});

app.get("/post", (request, response) => {
  response.render("create-post", { pageTitle: "Post" });
});

app.post("/post", (request, response) => {
  const { title, imgUrl, caption } = request.body;

  // validation
  if (caption.length > 150) {
    return response.render("error400", {
      message: "Maximum number of characters a caption can have is 150.",
    });
  } else if (title.length === 0 || caption.length === 0) {
    return response.render("error400", {
      message: "Title or caption must have atleast 1 character.",
    });
  } else if (caption[0] === " " || title[0] === " ") {
    return response.render("error400", {
      message: "First character cannot be blank",
    });
  }

  // posts data
  fs.readFile(postsDataPath, (err, posts) => {
    const updatedPosts = [{ title, imgUrl, caption }, ...JSON.parse(posts)];
    fs.writeFile(postsDataPath, JSON.stringify(updatedPosts), () => {
      response.redirect("/");
    });
  });
});
