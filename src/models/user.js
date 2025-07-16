const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type:String,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        require:true,
    }
},
    { timestamps: true }
);

const user = mongoose.model("Task_Users", userSchema);
module.exports = user;