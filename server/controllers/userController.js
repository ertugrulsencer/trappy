const User = require("../models/user");
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
    .then((res) => {
      console.log(res);
      res.send(res);
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
