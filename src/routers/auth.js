const express = require("express");
const AuthRouter=express.Router();
//password encryption and jwt authentication
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// checks for user detail at api level
const { validateUserSignup, validateEmailOnly} = require("../utils/validation");
// importing userschema for creating model
const User = require("../models/user");
//const { Auth } = require("../middlewares/auth");


// data coming in from request being saved to the server DB
AuthRouter.post("/signup", async (request, response) => {
  //check request body
  //console.log(request.body);
  try {
    // validation of data
    validateUserSignup(request);
    //encryption of password with salt rounds
    const {firstName,lastName,email,password}=request.body;
    const passHash= await bcrypt.hash(password,10);
    console.log(passHash);
    //new user object
    const data1 = new User({
      firstName,
      lastName,
      email,
      password:passHash,
    });
    //dating being saved
    await data1.save();
    response.send("sign-up successful");
  }
  catch (err) {
    response.status(400).send("error occured : " + err.message);
  }
});

//login api with Credential matching
AuthRouter.post("/login", async (request, response) => {
  try {
    const {email,password}=request.body;
    // validation of email at api level
    validateEmailOnly(email);
    // fetching user details from the db using find one method, 
    // we can use find also as email is set unique field.
    const userObject= await User.findOne({email:email});
    // check is user is found or not
    if(!userObject){
      //user not present in db
      throw new Error("Invalid Credential\n");
    }
   //console.log(userObject);
    // comparing stored passwordHASH with entered password in request
    // password->entered by user
    // userObject.password->hash stored in DB 
    const password_bool=await bcrypt.compare(password,userObject.password);
    if(password_bool){
    //creating cookie containing jwt token  which will be sent back to cleint browser
      const token=await jwt.sign({_id:userObject._id},process.env.JWT_SECRET,{expiresIn:"7d"}); //expires in 7 days
      //console.log(token);
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // expires in 7 days

      response.cookie("token",token,{expires:expiresAt}); 
      response.send("Login Successfully\n");
    }
    else{
      throw new Error("Invalid Credentials\n");
    }
  }
  catch (err) {
    response.status(400).send("Error Occured : " + err.message+ "\n");
  }
});

AuthRouter.post("/logout", async (request, response) => {
  try {
    //token will expire at the point of logout, new token is set to null
    response.cookie("token",null,
      {expires:new Date(Date.now())
    }).send("logout successful");
  }
  catch (err) {
    response.status(400).send("Error Occured : " + err.message+ "\n");
  }
});

module.exports=AuthRouter;
