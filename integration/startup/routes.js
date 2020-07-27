const express = require("express");
const cors = require("cors");
const user = require("../modules/user/user-controller.js");
const login = require("../modules/login.js");

const corsOptions = {
  exposedHeaders: "x-access-token",
};

module.exports = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use("/api/v1/user", user);
  app.use("/api/v1/login", login);
};
