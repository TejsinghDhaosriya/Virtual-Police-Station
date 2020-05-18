var mongoose = require('mongoose');



var userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
    },
    LastName: {
        type: String,
    },
    MobileNo: {
        type: String,
    },
    verified: {
        type: Boolean,
    },
    countryCode: Number,

    Email: {
        type: String,
    },
    Gender: {
        type: String,
    },
    IDType: {
        type: String,
    },
    IDNo: {
        type: String,
    },
    Date: {
        type: Date
    },
    CurrentAddress: {
        type: String,
    },
    State: {
        type: String,
    },
    District: {
        type: String,
    },
    Zip: {
        type: String,
    },
    LoginID: {
        type: String,
    },
    Password: {
        type: String,
    },
    otp:{
        type:String,
    }
});


module.exports = mongoose.model("User", userSchema);