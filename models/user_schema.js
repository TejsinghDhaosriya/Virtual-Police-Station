
var mongoose=require('mongoose')

var userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    phoneNo : String,
    otp:String,
    verified:Boolean
});


module.exports = mongoose.model("User",userSchema);