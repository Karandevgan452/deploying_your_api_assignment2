const express = require("express");
const { resolve } = require("path");

const app = express();
const port = 7480;

app.use(express.static("static"));

require("dotenv").config();

const isAdmin = process.env.IS_ADMIN === "true";

if (isAdmin) {
  console.log("Admin privileges granted.");
} else {
  console.log("Access restricted. Admin only.");
}

app.get("/", (req, res) => {
  res.sendFile(resolve(__dirname, "pages/index.html"));
});

app.get("/login", (req, res) => {
  if (process.env.IS_ADMIN === "true") {
    res.send({
      message: "Welcome, Admin!",
      data: ["Karan Devgan", "Ram"],
    });
  } else {
    res.send({
      message: "Welcome, User!",
      data: ["User1", "User2"],
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
