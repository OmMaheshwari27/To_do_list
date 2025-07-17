const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type:String,
    },
    //email is set as unique so that one user can register using one email
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