const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("It's working !");
});

app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server worked: 5000");
  }
});
