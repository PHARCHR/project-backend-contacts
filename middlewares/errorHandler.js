const { StatusCodes } = require("http-status-codes");
const BadRequest=require("../error/BadRequest");
const errorHandler = (err, req, res, next) => {
  if (err instanceof BadRequest) {
    return res
      .status(err.statusCode || StatusCodes.BAD_REQUEST)
      .json({ error: err.message }); // Use statusCode here
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send(err.message);
  console.log("SOME THING WENT WRONG");
};
module.exports = errorHandler;
