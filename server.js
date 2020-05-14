//server.js
var express = require('express');
var expobj = express();
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var cookieParser = require("cookie-parser");
const path = require('path');
/* This code you have to validate */
var User = require("./models/user_schema")
const accountSid = '';
const authToken = '';
const client = require('twilio')("AC84dbc55d69f62818d0d20b151762b386", "a046f0a95bba385f8bd91f1dd1c6c59e" );
var jwt             = require("jsonwebtoken");
var cookieParser    = require("cookie-parser");

client.messages
  .create({
     body: 'Your Verification Code is ' + generateOTP(),
     from: '+12058800634',
     to: '+919039102681'
   })
  .then(message => console.log(message.sid));

  function generateOTP(){ 
      var digits = '0123456789';
      var otpLength = 4;  
      var otp = ''; 
      for(let i=1; i<=otpLength; i++){
          var index = Math.floor(Math.random()*(digits.length)); 
          otp = otp + digits[index];
      }
      return otp;
  }
/************************************************************* */
// expobj.use(require('./routes'));
// requiring routes
var userRoutes = require("./routes/user");
var policeRoutes = require("./routes/police");
var adminRoutes  = require("./routes/admin");

//set port
var port = process.env.PORT || 8080;
//parse application/json
expobj.use(bodyparser.json());
//parse aplication/x-www url encoded 
expobj.use(bodyparser.urlencoded({extended:true}));
//method-override
expobj.use(methodOverride('X-HTTP-METHOD-OVERRIDE'));
expobj.set("view engine","ejs");
expobj.engine('ejs', require('ejs').__express);

expobj.use(express.static(path.join(__dirname,"public")));
mongoose.connect("mongodb://localhost/users",{useNewUrlParser: true, useUnifiedTopology: true});
//on connection
mongoose.connection.on('connected',function(){
    console.log('connected to database mongoDB @ 27017');
});
mongoose.connection.on('err', function(err){
    if(err){
        console.log('error in database connection:'+err);
    }
});
mongoose.connection.on('disconnected' , function (){
    console.log('disconnected from databasee monngoDB ');
});
process.on('SIGINT', function(){
    console.log('Disconnected from database mongoDB through app termination');
    process.exit(0);
});


// function isLoggedIn(req,res,next){
//     const token = req.cookies.authToken
//     if(!token){
//         res.send("access denied");
//     }else{
//         const verified = jwt.verify(token,process.env.TOKEN_SECRET);
//         console.log(req.user);
//         if(req.user != verified){
//             req.user = verified;
//         }
//         next()
//     }
// }

/*******************************************************************************************************************
 |  |   |   |   |   |   |   |   |   INDEX ROUTE
*********************************************************************************************************************/
expobj.get("/",function(req,res) {
    res.render("sign_up");    
});

expobj.get('/auth',(req,res)=>{
    res.render("verifyOTP");
});

expobj.post('/auth',async (req,res)=>{
    const user = await User.findOne({phoneNo:req.body.phoneNo});
    console.log(user)
    if(user.otp == req.body.OTP ){
        user.verified = true;
        user.save();
        res.redirect("/login");
    }else{
        res.send("Wrong OTP...")
    }
});
expobj.post("/register",async (req,res)=>{
    const user = await User.findOne({phoneNo:req.body.phoneNo});
    if(!user){
        const otp = generateOTP();
        console.log(otp)
        var user1 = new User({username:req.body.username, email:req.body.email, password:req.body.password,phoneNo:req.body.phoneNo,otp:otp+"", verified:false});
        user1.save();
        res.redirect("/auth");
    }else{
        res.send("Phone No already exist..")
    }
});
expobj.get("/login",(req,res)=>{
    res.send("plese login...");
});
expobj.post("/login", async (req,res)=>{
    const user = await User.findOne({phoneNo:req.body.phoneNo});
    if(!user){
        res.send("Phone No does't exist")
    }else{
        
        if(user.password != req.body.password){
            res.send("Invalid password")
        }else{
            const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
            res.cookie('authToken',token,{
                maxAge:2628000000, //1 month in mili sec
                httpOnly:true
            });
            res.redirect("/");
        }
    }
});

// expobj("/secret",isLoggedIn,(req,res)=>{
//     res.send("secret fjynhbltjfg");
// })
expobj.use("/user",userRoutes);
// expobj.use("/admin",adminRoutes);
// expobj.use("/police",policeRoutes);


//startup our app
expobj.listen(port);
//infrom to the user
console.log('Node server has been started');
console.log('\nTo check it pen any web browser and type "localhost:'+port+'"');
exports = module.exports = expobj;

