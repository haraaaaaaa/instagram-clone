const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (request, response) => {
  response.render("index", { pageTitle: "Home" });
});

app.get("/post", (request, response) => {
  response.render("index", { pageTitle: "Post" });
});

app.listen(5000);
