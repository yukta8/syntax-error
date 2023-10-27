const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
var User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
   username:{
       type:String,
       required : true,
       unique: true
   }
})
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);