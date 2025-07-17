// Importing required packages
const validator = require("validator");
const bcrypt = require("bcrypt");

// Function to validate only email format using validator
const validateEmailOnly = (email) => {
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email Format");
  }
};

// Function to validate user signup input fields
const validateUserSignup = (request) => {
  const { firstName, lastName, email, password } = request.body;

  // Check if first name and last name are present
  if (!firstName || !lastName) {
    throw new Error("Enter valid name");
  }

  
  // Validate email format
  if (!validator.isEmail(email)) {
    throw new Error("Incorrect email Format");
  }


  // Check for password strength (includes length, characters, etc.)
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is too weak");
  }
};

// Function to validate if only allowed fields are being edited in user profile
const validateProfileData = (request) => {
  const allowedEdit = ["firstName", "lastName"];
  // Ensure every field in the request body is part of allowedEdit list
  const isEditAllowed = Object.keys(request.body).every(field =>
    allowedEdit.includes(field)
  );

  return isEditAllowed;
};



// Function to validate the user's current password before updating
const validatePassword = async (request) => {
  const { password, new_password } = request.body;
  // Log new password to verify it's being received
  // console.log(new_password);
  // Compare provided current password with hashed password in DB
  return await bcrypt.compare(password, request.user.password);
};

// Export all validation functions for use in other modules
module.exports = {
  validateUserSignup,
  validateEmailOnly,
  validateProfileData,
  validatePassword
};