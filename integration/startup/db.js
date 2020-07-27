const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async function () {
  const db = process.env.DB_URL;

  mongoose
    .connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${db}`))
    .catch((err) => console.log(`Error occured ${err}`));
};
