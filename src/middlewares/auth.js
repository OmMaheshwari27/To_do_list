const jwt = require("jsonwebtoken");
const user = require("../models/user");
require('dotenv').config();

// middleware to authenticate the user using jwt
const Auth = async (request, response, next) => {
    try {
        // extract token from cookies
        const token = request.cookies?.token;
        // if no token is present, throw error
        if (!token) {
            throw new Error("token not found");
        }
        // verify token using jwt secret
        const userObject = await jwt.verify(token, process.env.JWT_SECRET);
        // extract user id from token
        const id = userObject._id;

        // find user in database using id
        const existingUser = await user.findById({ _id: id });
        // if user not found, throw error
        if (!existingUser) {
            throw new Error("user not found");
        } else {
            request.user = existingUser;
            next();
        }
    } catch (err) {
        // send error response if any step fails
        response.status(400).send("error : " + err.message);
    }
};

// export auth middleware
module.exports = {
    Auth
};