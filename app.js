// requirements
const express = require("express");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");

// express setup
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.listen(5000);

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
  console.log(title, imgUrl, caption);

  if (caption.length > 3) {
    return response.render("error400");
  }

  fs.readFile(postsDataPath, (err, posts) => {
    const newPosts = [{ title, imgUrl, caption }, ...JSON.parse(posts)];
    fs.writeFile(postsDataPath, JSON.stringify(newPosts), () => {
      response.redirect("/");
    });
  });
});
