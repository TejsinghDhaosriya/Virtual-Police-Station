var express = require("express");
var router  = express.Router();

// route /admin/login
router.get("/",function(req,res){
    // res.send("from route /admin/login")
    res.render("index")
});


module.exports = router;