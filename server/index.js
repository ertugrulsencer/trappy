const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./router/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
dotenv.config();
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

app.use(
  cors({
    origin: process.env.ACCESS_ORIGIN,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use("/api", router);

app.use("*", (req, res, next) => {
  res.redirect("/api");
  next();
});

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server worked: " + process.env.PORT || 5000);
  }
});
