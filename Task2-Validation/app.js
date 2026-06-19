const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let users = [];

app.get("/", (req, res) => {
  res.render("index", { error: "" });
});

app.post("/submit", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.render("index", {
      error: "All fields are required."
    });
  }

  users.push({
    name,
    email,
    age
  });

  res.render("success", {
    name,
    email,
    age
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});