const User = require("../models/User");

/* Get Users */
const getUsers = (req, res) => {
  User.find()
    .then((result) => {
      res.json({ message: result });
    })
    .catch((error) => {
      res.json({ message: error });
    });
};
/* Get single user */
const getUser = (req, res) => {
  User.find({ user_name: req.body.user_name })
    .then((result) => {
      res.json({ message: result });
    })
    .catch((error) => {
      res.json({ message: error });
    });
};
/* Add User */
const addUser = (req, res) => {
  const insertUser = new User({
    user_name: "sencertugrul",
    user_full_name: "Ertuğrul Sencer",
    user_email: "ertugrul@fribe.org",
    user_password: "kluiswthAkBnkJBGIJBhjbBjkbjkBıjb",
  });
  insertUser
    .save()
    .then((data) => {
      console.log(data);
      res.json({ result: data });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: error });
    });
};
const updateUser = (req, res) => {
  const newData = req.body.new_data;
  User.updateMany(
    { user_name: req.body.user_name },
    newData,
    (error, result) => {
      if (error) {
        res.status(500).json({ result: error });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};
const searchUser = (req, res) => {
  if (!req.query.user_name) {
    res.status(500).json({ result: "Geçersiz parametre" });
  } else {
    const user_name_regex = new RegExp(req.query.user_name, "i");
    User.find({ user_name: user_name_regex })
      .then((users) => {
        if (users.length) {
          res.status(200).json(users);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((err) => console.error(err));
  }
};
module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  searchUser,
};
