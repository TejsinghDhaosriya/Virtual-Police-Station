//grab the mongoose module
var mongoose=require('mongoose')
//define our about module
//module.export allow us to pass this
var userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
});

//userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);