const jwt = require("jsonwebtoken");
const BadRequest=require("../error/BadRequest");
const authentication = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !(authorization.startsWith("Bearer"))) {
    console.log("authentication")
    throw new BadRequest("YOUR ARE NOT AUTHORIZED");
  }
  const token = authorization.split(" ")[1];
  try {
    console.log("authentication")
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user=decoded
  } catch (error) {
    console.log("authentication")
    throw new BadRequest("YOUR ARE NOT AUTHORIZED");
  }
  console.log("authentication")
  next();
};
module.exports = authentication;
