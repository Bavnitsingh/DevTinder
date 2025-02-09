const validator = require("validator")

const ValidateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First name and last name are required.");
  }
  else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid.");
  }
  else if (!validator.isStrongPassword(password)){
    throw new Error("Please enter a strong password.");
  }
}

const ValidateProfileEditData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "skills", "about", "age", "gender", "emailId", "photoUrl"];
  const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));
  return isEditAllowed;

}
module.exports = { ValidateSignupData, ValidateProfileEditData };