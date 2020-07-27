const express = require("express");
const router = express.Router();

const { checkUserExists, registerUser } = require("./user-service.js");

router.get("/checkExists", async (req, res, next) => {
  const email = req.query.email;

  const UserObject = await checkUserExists(email);
  if (UserObject instanceof Error) {
    return res.status(400).send({
      status: "Error",
      message: UserObject.message,
    });
  }

  return res.status(200).send({ available: UserObject });
});

router.post("/create", async (req, res, next) => {
  const userData = req.body;

  const UserObject = await registerUser(userData);
  if (UserObject instanceof Error) {
    return res.status(400).send({
      status: "Error",
      message: UserObject.message,
    });
  }

  return res.status(UserObject.status).send({ message: UserObject });
});

module.exports = router;
