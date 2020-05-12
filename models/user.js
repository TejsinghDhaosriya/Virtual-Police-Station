//grab the mongoose module
var mongoose=require('mongoose')
//define our about module
//module.export allow us to pass this
module.exports=mongoose.model('About',{
    name:{type:String ,default:''}
})