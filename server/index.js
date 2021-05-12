const express = require("express");
const app = express();
const router = require("./router/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://master:trappy2021@trappy.idj1b.mongodb.net/trappy?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((error) => console.log(error));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use("/api", router);

app.use("*", (req, res, next) => {
  res.redirect("/api");
  next();
});

app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server worked: 5000");
  }
});
