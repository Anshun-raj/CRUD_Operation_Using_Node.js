const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  address: String,
  gender: String,
});
module.exports = mongoose.model("users", userSchema);
