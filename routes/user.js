
const express = require("express");
const router  = express.Router();


router.get("/login",function(req,res){
    res.render("login");
});

router.get("/sign_up", async function(req,res) {
    console.log('/register');
    // const emailExist    
})

module.exports = router;