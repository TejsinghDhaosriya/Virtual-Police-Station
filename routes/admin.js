var express = require("express");
var router  = express.Router();

// route /admin/login
router.get("/login",function(req,res){
    res.send("from route /admin/login")
});


module.exports = router;