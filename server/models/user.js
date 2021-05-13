const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_full_name: {
      type: String,
      required: false,
    },
    user_email: {
      type: String,
      required: true,
    },
    user_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "user_created", updatedAt: "user_updated" } }
);

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
