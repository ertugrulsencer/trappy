const User = require("../models/User");
const getUsers = (req, res) => {
  res.send("test");
};
const addUser = (req, res) => {
  const insertUser = new User({
    user_name: "ertugrulsencer",
    user_full_name: "Ertuğrul Sencer",
    user_email: "teknoertg@gmail.com",
    user_password: "hdkfkfkfkfkfkfuryskcmdhstwoaspcm",
  });
  insertUser
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
};
module.exports = {
  getUsers,
  addUser,
};
