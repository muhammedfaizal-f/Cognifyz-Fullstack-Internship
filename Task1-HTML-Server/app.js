const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {
    const { name, email } = req.body;
    res.render("result", { name, email });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});