const express = require("express");
const path = require("path");
const languages = require("./dist/assets/languages/languages.min");

const app = express();

app.use("/assets", express.static(path.join(__dirname, "dist", "assets")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "dist", "views"));

app.get("/", (req, res, next) => {
  res.render("index", {
    content: languages.english,
  });
});

const port = process.env.PORT || 3000;
app.listen(port);
