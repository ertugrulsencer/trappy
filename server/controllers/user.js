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
      res.json({ result: data });
    })
    .catch((error) => {
      console.error(error);
      res.json({ message: error });
    });
};
module.exports = {
  getUsers,
  addUser,
};
