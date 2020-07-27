const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { User, userSchema } = require("./user/user-model.js");

router.post("/", async (req, res) => {
  console.log("called");
  const data = req.body;
  if (data.email == "" || data.password == "") {
    return res
      .status(400)
      .send({
        message: "Email/Password cannot be left blank.",
        status: "error",
      });
  }

  const user = await User.findOne({ email: data.email });
  if (!user)
    return res
      .status(404)
      .send({ message: "Email not registered.", status: "error" });

  const isPasswordValid = await bcrypt.compareSync(
    data.password,
    user.password
  );

  if (isPasswordValid == false)
    return res
      .status(400)
      .send({ message: "Invalid Email/Password.", status: "error" });

  const token = user.generateAuthToken(user._id, user.email);

  return res
    .header("x-access-token", token)
    .status(200)
    .send({ message: "User authenticated successfully", status: "success" });
});

module.exports = router;
