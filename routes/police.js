var express = require("express");
var router  = express.Router();

// route /police/login
router.get("/login",function(req,res){
    res.send("from route /police/login")
});

module.exports = router;