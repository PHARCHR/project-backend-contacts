const BadRequest = require("../error/BadRequest");
const User = require("../models/users");
require("../error/BadRequest");
const { StatusCodes } = require("http-status-codes");
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateToken();
  res
    .status(StatusCodes.CREATED)
    .send({ users: { userName: user.name, userId: user._id }, token });
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
  res.status(StatusCodes.ACCEPTED).send({
    users: { userName: user.name, userId: user._id },
    token,
    msg: "YOU ARE NOW LOGGED IN",
  });
};
module.exports = { register, login };
