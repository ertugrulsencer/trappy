const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
  const { user_name } = req.params;
  if (user_name) {
    User.find({ user_name })
      .then((result) => {
        if (result.length) {
          res.status(200).json({ message: result });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((error) => {
        res.status(200).json({ message: error });
      });
  } else {
    res.status(400).json({ message: "Bad request: user_name required" });
  }
};
/* Add User */
const addUser = (req, res) => {
  const newUserData = req.body.user;
  const insertUser = new User(newUserData);
  insertUser
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).json({ result: data });
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
const authUser = (req, res) => {
  if (!req.body.user_name && res.body.user_pass) {
    res
      .status(400)
      .json({ message: "Bad request: user_name and user_pass required" });
  } else {
    const user_name = req.body.user_name,
      user_pass = req.body.user_pass;
    User.find({
      user_name,
      user_password: user_pass,
    })
      .then((user) => {
        console.log(user);
        if (user.length) {
          let token = jwt.sign(
            {
              user_id: user._id,
              user_name: user.user_name,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
            }
          );
          res.status(200).json({ message: user, token });
        } else {
          res.status(401).json({ message: "No authentication" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err });
      });
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  searchUser,
  authUser,
};
