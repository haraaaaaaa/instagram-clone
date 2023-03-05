const express = require("express");
const path = require("path");
const fs = require("fs");

const postsData = path.join(__dirname, 'views', 'posts.json')


const app = express();
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (request, response) => {
  fs.readFile(postsData, (err, posts) => {
    response.render("index", { pageTitle: "Home", posts: JSON.parse() });
  })
});

app.get("/post", (request, response) => {
  response.render("index", { pageTitle: "Post" });
});

app.post("/post", (request, response) => {
  const posts = req.body
  fs.readFile(postsData, (err, posts) => {
    const updatedPosts = [posts, ...JSON.parse(posts)]
    fs.writeFile(postsData, JSON.stringify(updatedPosts), () => {
      response.redirect("/")
    })
  })

})

app.listen(5000);
