const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username"],
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      max: 50,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      min: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
