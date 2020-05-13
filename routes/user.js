
const express = require("express");
const router  = express.Router();

// route /user/login
router.get("/user/login",function(req,res){
    res.render("login");
    // res.send("from route /user/login");
});


module.exports = router;