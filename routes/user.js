// const User = require("/models/user_schema");
var crypto = require("crypto");
const express = require("express");
const router = express.Router();
const sgMail = require("@sendgrid/mail");
const User = require("../models/user_schema.js");
const nodemailer = require('nodemailer');
const sendgridtransport = require('nodemailer-sendgrid-transport');
const transporter =nodemailer.createTransport(sendgridtransport({
    auth: {
        api_key: "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"
    }
}));
console.log("hello");
router.get("/sign_up", (req,res)=>{
    res.render("sign_up");
    res.send("Sign up page");
})
router.post("/sign_up", async (req, res) => {
    // res.redirect("/auth/567");
    const user = await User.findOne({
        Email: req.body.email
    });
    console.log(req.body.email);
    if (!user) {
        // console.log("user");
        var token;
        crypto.randomBytes(32, (err, data)=>{
            if(err){
                res.render("sign_up");
            }
            else{
                token = data.toString("hex");
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
                    Zip: req.body.zip,
                    LoginID: req.body.login,
                    Password: req.body.password,
                    token: token,
                    tokenExpirationTime: new Date()+ 360000,
                    verified: false
                });
                // console.log(user1);
                // console.log(token);
                const url = "http://localhost:8080/user/emailVerification/"+ token;
                // console.log(url);
                const msg = {
                    to: req.body.email,
                    from: 'virtaulpolicestation@gmail.com',
                    subject: 'Sending with Twilio SendGrid is Fun',
                    text: 'Verify your email',
                    html: `<p>Click to activate your account<a href="${url}"> Link</a></p>`,
                }
                transporter.sendMail(msg);
                
            }
        });
    }
});
router.get("/profile", function (req, res) {
    res.render("profile");
});

router.get('/emailVerification/:token', (req,res)=>{
    const token = req.params.token;
    console.log(token);
    const user = User.findOne({
        token: token,
        tokenExpirationTime : {$gt: Date.now()}
     });
     if (!user){
         res.redirect("/sign_up");
     }
     else{
         res.redirect("/user/profile");
     }
     
     
});

router.get("/login", function (req, res) {
    res.render("login", {
        type: "user"
    });
});
router.post("/login", async (req, res) => {
    const user = await User.findOne({
        Email: req.body.email
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
            }, 'qwefrdbrldstfghnlazwdfgbsdfg');
            res.cookie('authToken', token, {
                maxAge: 2628000000, //1 month in mili sec
                httpOnly: true
            });
            res.redirect("/complaint");
        }
    }
});


router.get("/complaint", function (req, res) {
    res.render("complaint", {
        type: "user"
    });
    // const emailExist    
})

router.get("/sign_up", function (req, res) {
    res.render("sign_up", {
        type: "user"
    });
    // const emailExist    
})
router.get("/contact", function (req, res) {
    res.render("contact");
});
router.get("/about", function (req, res) {
    res.render("about");
});




module.exports = router;