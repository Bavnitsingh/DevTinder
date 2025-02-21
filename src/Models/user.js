const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 3,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address." + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter Strong Password : min 1 UpperCase,lowercase,special character,number" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (
          !["male", "Male", "Female", "female", "Others", "others"].includes(
            value
          )
        ) {
          throw new Error("Invalid Gender data .");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://p.kindpng.com/picc/s/150-1503949_computer-icons-user-profile-male-profile-icon-png.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Url." + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is default about section of the user.",
    },
    skills: {
      type: [String],
      set: (skills) => [...new Set(skills.map((skill) => skill.trim()))], // Remove duplicates and trim spaces
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);
userSchema.methods.getJWT = async function () {
  const user = this;// this keyword not work in => function that's why use normal function
  const token = await jwt.sign({ _id: user._id }, "DEVTINDER@harman", { expiresIn: "7d" });
  return token;
}
 userSchema.index({ firstName: 1, lastName: 1 });
userSchema.methods.passwordValidation = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
 
  return isPasswordValid;
}
module.exports = mongoose.model("User", userSchema); // mongoose.model("Name",schema);
