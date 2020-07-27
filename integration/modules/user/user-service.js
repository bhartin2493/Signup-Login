const bcrypt = require("bcrypt");
const { User } = require("./user-model.js");

//checking if user already exists
async function checkUserExists(email) {
  const data = await User.findOne({ email });
  if (!data) return true;
  else return false;
}

//New user creation
async function registerUser(data) {
  const isAvailable = await checkUserExists(data.email);

  if (isAvailable == true) {
    const user = new User(data);
    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hashSync(user.password, salt);
    await user.save();

    return { message: "User created successfully", status: 200 };
  }

  return { message: "User already registered", status: 400 };
}

exports.checkUserExists = checkUserExists;
exports.registerUser = registerUser;
