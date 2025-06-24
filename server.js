// server.js
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: "", //your host name
  user: "root",         // change if needed
  password: "",         // change if needed
  database: "" // your DB name
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});


app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/view", (req, res) => {
  res.sendFile(path.join(__dirname, "viewer.html"));
});


app.get("/users", (req, res) => {
  db.query("SELECT * FROM users ORDER BY id DESC", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.post("/submit", (req, res) => {
  const { name, age } = req.body;
  const sql = "INSERT INTO users (name, age) VALUES (?, ?)";
  db.query(sql, [name, age], (err) => {
    if (err) throw err;
    res.redirect("/view");
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

