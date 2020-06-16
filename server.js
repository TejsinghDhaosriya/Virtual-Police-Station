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


app.use(express.static(path.join(__dirname, "public")));
app.use("/", index);
app.use("/user", user);
app.listen(port);
console.log('Node server has been started');
console.log('\nTo check it pen any web browser and type "localhost:' + port + '"');
exports = module.exports = app;