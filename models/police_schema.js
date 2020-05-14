//grab the mongoose module
var mongoose=require('mongoose')
//define our about module
//module.export allow us to pass this
var policeSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
});

module.exports = mongoose.model("User",policeSchema);