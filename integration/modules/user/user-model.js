const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { userCollection } = require("../../constants/CollectionConstant.js");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: String,
    gender: String,
    phoneNumber: String,
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

// will be used during login to generate token
userSchema.methods.generateAuthToken = function (_id, email) {
  const token = jwt.sign({ _id, email }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: 24 * 60 * 60,
  });
  return token;
};

const User = mongoose.model("User", userSchema, userCollection);

module.exports = {
  User,
  userSchema,
};
