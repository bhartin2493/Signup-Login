const express = require("express");
require("dotenv").config();

const app = express();

require("./startup/routes.js")(app);
require("./startup/db.js")();
//port details
const port = process.env.PORT || 5000;

//Server activation

app.listen(port, () => {
  console.log(`Integration server running on http://localhost:${port}`);
});
