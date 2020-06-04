//server.js

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');
var index = require("./routes/index")
let user = require("./routes/user")


var port = process.env.PORT || 8080;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(methodOverride('X-HTTP-METHOD-OVERRIDE'));
app.set("view engine", "ejs");
app.engine('ejs', require('ejs').__express);


// require("./routes/")(app);    
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


// app.get("/", function (req, res) {
//     res.render("index");
// });
// app.get("/sign_up", function (req, res) {
//     res.render("sign_up",{type: "user"});
// });
app.use(express.static(path.join(__dirname, "public")));
app.use("/", index);
app.use("/user", user);
app.listen(port);
console.log('Node server has been started');
console.log('\nTo check it pen any web browser and type "localhost:' + port + '"');
exports = module.exports = app;



// app.post("/sign_up", async (req, res) => {
//     // res.redirect("/auth/567");
//     const user = await User.findOne({
//         MobileNo: req.body.number
//     });
//     console.log("sign_up")
//     if (!user) {
//         console.log("user")
//         const client = require('twilio')('', '')
//         const otp = generateOTP();
//         console.log(otp)
//         client.messages
//             .create({
//                 body: 'Your Verification Code is ' + otp,
//                 from: '+12058800634',
//                 to: '+919039102681'
//             })
//             .then(message => console.log(message.sid));

//         function generateOTP() {
//             var digits = '0123456789';
//             var otpLength = 4;
//             var otp = '';
//             for (let i = 1; i <= otpLength; i++) {
//                 var index = Math.floor(Math.random() * (digits.length));
//                 otp = otp + digits[index];
//             }
//             return otp;
//         }

//         var user1 = new User({
//             FirstName: req.body.first,
//             LastName: req.body.last,
//             MobileNo: req.body.number,
//             Email: req.body.email,
//             Gender: req.body.gender,
//             IDType: req.body.idtype,
//             CurrentAddress: req.body.village,
//             IDNo: req.body.idno,
//             State: req.body.state,
//             District: req.body.district,
//             Zip:req.body.zip,
//             LoginID: req.body.login,
//             Password: req.body.password,
//             otp: otp + "",
//             verified: false
//         });
//         console.log(req.body);
//         const result = await user1.save();
//         console.log(result)
//         res.redirect("/auth/" + req.body.number);
//     } else {
//         res.send("Phone No already exist..")
//     }
// });
// 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