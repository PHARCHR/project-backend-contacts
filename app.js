require("dotenv").config();
require("express-async-errors");

const authentication = require("./middlewares/authentication");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const authRouter = require("./routes/authRoutes");
const connect = require("./db/connect");
const contactRouter = require("./routes/contactRouter");

const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/contacts",authentication, contactRouter);
app.use(notFound);
app.use(errorHandler);
const start = () => {
  try {
    connect(process.env.MONGO_URI);
    app.listen(
      process.env.PORT,
      console.log(`Server running on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log("COULDN'T SPINN UP THE SEVER");
  }
};
start();
