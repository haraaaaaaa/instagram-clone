const express = require("express");
const path = require("path");
const fs = require("fs");

const postsData = path.join(__dirname, 'views', 'posts.json')

const app = express();
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (request, response) => {
  response.render("home", { pageTitle: "Home", message: "LIST OF POSTS" });
});

app.get("/post", (request, response) => {
  response.render("create-post", { pageTitle: "Post" });
});

app.post("/post", (request, response) => {
  fs.readFile(postsData, (err, posts) => {
    const newPosts = [req.body, ...JSON.parse(posts)];
    fs.writeFile(postsData, JSON.stringify(newPosts), () => {
      response.redirect("/");
    });
  });
});

app.listen(5000);
