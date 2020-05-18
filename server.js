//server.js
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var cookieParser = require("cookie-parser");
const path = require('path');
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");

/*******************************************MODELS********************************************************* */
const User = require("./models/user_schema");
var port = process.env.PORT || 8080;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(methodOverride('X-HTTP-METHOD-OVERRIDE'));
app.set("view engine", "ejs");
app.engine('ejs', require('ejs').__express);

app.use(express.static(path.join(__dirname, "public")));
// app.use("/user", userRoutes);
mongoose.connect("mongodb://localhost/police_station", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', function () {
    console.log('connected to database mongoDB @ 27017');
});
mongoose.connection.on('err', function (err) {
    if (err) {
        console.log('error in database connection:' + err);
    }
});
mongoose.connection.on('disconnected', function () {
    console.log('disconnected from databasee monngoDB ');
});
process.on('SIGINT', function () {
    console.log('Disconnected from database mongoDB through app termination');
    process.exit(0);
});


/*******************************************************************************************************************
 |  |   |   |   |   |   |   |   |   INDEX ROUTE
*********************************************************************************************************************/


app.post('/auth', async (req, res) => {
    const user = await User.findOne({
        MobileNo: req.body.MobileNo
    });
    console.log(user.otp === req.body.otp);
    if (user.otp == req.body.otp) {
        user.verified = true;
        await user.save();
        res.redirect("/login");
    } else {
        res.send("Wrong OTP...")
    }
    console.log(user)
});

app.post("/sign_up", async (req, res) => {
    // res.redirect("/auth/567");
    const user = await User.findOne({
        MobileNo: req.body.number
    });
    console.log("sign_up")
    if (!user) {
        console.log("user")
        const client = require('twilio')('', '')
        const otp = generateOTP();
        console.log(otp)
        client.messages
            .create({
                body: 'Your Verification Code is ' + otp,
                from: '+12058800634',
                to: '+919039102681'
            })
            .then(message => console.log(message.sid));

        function generateOTP() {
            var digits = '0123456789';
            var otpLength = 4;
            var otp = '';
            for (let i = 1; i <= otpLength; i++) {
                var index = Math.floor(Math.random() * (digits.length));
                otp = otp + digits[index];
            }
            return otp;
        }

        var user1 = new User({
            FirstName: req.body.first,
            LastName: req.body.last,
            MobileNo: req.body.number,
            Email: req.body.email,
            Gender: req.body.gender,
            IDType: req.body.idtype,
            CurrentAddress: req.body.village,
            IDNo: req.body.idno,
            State: req.body.state,
            District: req.body.district,
            Zip:req.body.zip,
            LoginID: req.body.login,
            Password: req.body.password,
            otp: otp + "",
            verified: false
        });
        console.log(req.body);
        const result = await user1.save();
        console.log(result)
        res.redirect("/auth/" + req.body.number);
    } else {
        res.send("Phone No already exist..")
    }
});

app.get("/login", function (req, res) {
    res.render("login", {
        type: "user"
    });
});
app.post("/login", async (req, res) => {
    const user = await User.findOne({
        MobileNo: req.body.phn
    });
    console.log(user.Password, user);
    if (!user) {
        res.send("Phone No does't exist")
    } else {

        if (user.Password !== req.body.pass) {
            res.send("Invalid password")
        } else {
        //     const token = jwt.sign({
        //         _id: user._id
        //     }, process.env.TOKEN_SECRET);
            const token = jwt.sign({
                _id: user._id
            },'qwefrdbrldstfghnlazwdfgbsdfg');
            res.cookie('authToken', token, {
                maxAge: 2628000000, //1 month in mili sec
                httpOnly: true
            });
            res.redirect("/complaint");
        }
    }
});


app.get("/complaint", function (req, res) {
    res.render("complaint", {
        type: "user"
    });
    // const emailExist    
})

app.get("/sign_up", function (req, res) {
    res.render("sign_up", {
        type: "user"
    });
    // const emailExist    
})
app.get("/contact", function(req, res){
    res.render("contact");
});
app.get("/about", function(req, res){
    res.render("about");
});
app.get("*", function(req, res){
    res.render("index");
});

// app.('/verifyOTP', (res,req)=>{
//     res.redirect('/login');
// });



// app.use("/admin",adminRoutes);
// app.use("/police",policeRoutes);


app.listen(port);
console.log('Node server has been started');
console.log('\nTo check it pen any web browser and type "localhost:' + port + '"');
exports = module.exports = app;