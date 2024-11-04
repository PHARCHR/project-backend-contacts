const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxength: 50,
    minlength: 2,
  },
  email: {
    type: String,
    required: [true, "Please enter your name"],
    maxength: 50,
    minlength: 2,
    match: [
      /^(?!\.)[\w\.-]{1,64}@(?!-)[a-zA-Z\d-]{1,63}(?<!-)\.[a-zA-Z]{2,}$/,
      "Please enter a valid email adress",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your name"],
    maxength: 8,
    minlength: 6,
  },
});
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.generateToken = function () {
  return  jwt.sign(
    { userName: this.name, userId: this._id },
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_EXPIRY }
  );
};
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", userSchema);
