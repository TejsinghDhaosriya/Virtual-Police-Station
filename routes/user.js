
const express = require("express");
const router  = express.Router();


router.get("/login",function(req,res){
    res.render("login",{type:"user"});
});

router.get("/sign_up", async function(req,res) {
    console.log('/register',{type:"user"});
    // const emailExist    
})
router.post("/user/login",async function(req,res){
    console.log("user/login")
    const user = await User.findOne({email:req.body.email});
    if(!user){
        res.send("email does't exist")
    }else{
        const validpass =await bcrypt.compare(req.body.password,user.password)
        if(!validpass){
            res.send("Invalid password")
        }else{
            const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
            res.cookie('authToken',token,{
                maxAge:2628000000, //1 month in mili sec
                httpOnly:true
            });
            res.redirect("/main");
        }
    }
});

module.exports = router;