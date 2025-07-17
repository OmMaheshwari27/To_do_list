const jwt = require("jsonwebtoken");
const User = require("../models/user");
require('dotenv').config();

const Auth = async (request, response, next) => {
    try {
        const token = request.cookies?.token;
        if (!token) {
            throw new Error("Token not found");
        }
        const userObject = await jwt.verify(token, process.env.JWT_SECRET);
        const id = userObject._id;
        const user = await User.findById({ _id: id });
        if (!user) {
            throw new Error("user not found");
        }
        else{
            request.user=user;
            next();
        }
    }
    catch(err){
        response.status(400).send("Error : "+err.message);
    }
}

module.exports = {
    Auth
}