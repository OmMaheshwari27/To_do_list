const mongoose = require("mongoose");
const validator=require("validator");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim:true,
    },
    lastName:{
        type:String,
        trim: true,

    },
    //email is set as unique so that one user can register using one email
    email: {
        type: String,
        required: true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    }
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