const validator = require("validator");
const bcrypt = require("bcrypt");


const validateEmailOnly=(email)=>{
if(!validator.isEmail(email)){
    throw new Error("Invalid Email Format");
}
};

const validateUserSignup = (request) => {
  const { firstName, lastName, email, password } = request.body;
  if (!firstName || !lastName) {
    throw new Error("Enter valid name");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Incorrect email Format");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is too weak");
  }
};


const validateProfileData = (request) => {
  const allowedEdit=["firstName","lastName"];
  const isEditAllowed=Object.keys(request.body).every(field=>allowedEdit.includes(field));
  return isEditAllowed;
};

const validatePassword = async (request) => {
  const { password,new_password } = request.body; 
  console.log(new_password);
  
  return await bcrypt.compare(password, request.user.password);
};

module.exports = {validateUserSignup, validateEmailOnly,validateProfileData ,validatePassword};