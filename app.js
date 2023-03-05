const express = require("express");
const path = require("path");
const fs = require("fs");

const postsData = path.join(__dirname, "data", "posts.json");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (request, response) => {
  fs.readFile(postsData, (err, posts) => {
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
  fs.readFile(postsData, (err, posts) => {
    const newPosts = [{ title, imgUrl, caption }, ...JSON.parse(posts)];
    fs.writeFile(postsData, JSON.stringify(newPosts), () => {
      response.redirect("/");
    });
  });
});

app.listen(5000);
