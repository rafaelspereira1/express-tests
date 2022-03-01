const express = require("express");

const app = express();

app.get("/", (request, response) => response.send("Test Server"));

app.listen(3000, () =>
  console.log("Server is running at http://localhost:3000")
);
