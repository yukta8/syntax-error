const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
var User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User",
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);