const mongoose = require("mongoose");

const userSch = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
        required: false,
    }

},{
    timestamps: true,
});

const USER = mongoose.model("user",userSch);
module.exports = USER;