// const User = require("/models/user_schema");
const express = require("express");
const router = express.Router();



router.get("/user/login", function (req, res) {
    res.render("login", {
        type: "user"
    });
});

router.get("/sign_up", function (req, res) {
    res.render("sign_up", {
        type: "user"
    });
    // const emailExist    
})
router.post("/sign_up", async (req, res) => {
    const user = await User.findOne({
        phoneNo: req.body.phoneNo
    });
    if (!user) {
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
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phoneNo: req.body.phoneNo,
            otp: otp + "",
            verified: false
        });
        user1.save()(function(err, contact){
            if(err){
                res.json({msg:'Failed to add contact'})
            }
            else{
                res.json({msg:'Contact Added Successfully'})
            }
        });
        res.redirect("/auth");
    } else {
        res.send("Phone No already exist..")
    }
});

router.get('/auth', (req, res) => {
    res.render("verifyOTP");
});

router.post('/auth', async (req, res) => {
    const user = await User.findOne({
        phoneNo: req.body.phoneNo
    });
    console.log(user)
    if (user.otp == req.body.OTP) {
        user.verified = true;
        user.save();
        res.redirect("/login");
    } else {
        res.send("Wrong OTP...")
    }
});
router.get("/login", (req, res) => {
    res.send("plese login...");
});
router.post("/login", async (req, res) => {
    const user = await User.findOne({
        phoneNo: req.body.phoneNo
    });
    if (!user) {
        res.send("Phone No does't exist")
    } else {

        if (user.password != req.body.password) {
            res.send("Invalid password")
        } else {
            const token = jwt.sign({
                _id: user._id
            }, process.env.TOKEN_SECRET);
            res.cookie('authToken', token, {
                maxAge: 2628000000, //1 month in mili sec
                httpOnly: true
            });
            res.redirect("/");
        }
    }
});


module.exports = router;