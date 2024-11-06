const BadRequest = require("../error/BadRequest");
const User = require("../models/users");
require("../error/BadRequest");
const { StatusCodes } = require("http-status-codes");
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateToken();
  res
    .status(StatusCodes.CREATED)
    .cookie("jwt", token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
    .send({ users: { userName: user.name, userId: user._id } });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please enter Email and Password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest("INCORRECT EMAIL OR PASSWORD");
  }
  const isPasswordCorrect = user.isPasswordCorrect(user.password);
  if (!isPasswordCorrect) {
    throw new BadRequest("INCOREECT EMAIL OR PASSWORD");
  }
  const token = user.generateToken();

  res
    .status(StatusCodes.ACCEPTED)
    .cookie("jwt", token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 })
    .send({
      users: { userName: user.name, userId: user._id },
      msg: "YOU ARE NOW LOGGED IN",
    });
};
const logout = (req, res) => {
  res.clearCookie("jwt", { httpOnly: true });
  res.status(200).json({ message: "Successfully logged out" });
};
module.exports = { register, login, logout };
