var express = require("express");
var router  = express.Router();

// route /user/login
router.get("/login",function(req,res){
    res.send("from route /user/login")
});


module.exports = router;