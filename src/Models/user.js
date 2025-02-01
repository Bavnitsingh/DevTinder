const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
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
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: function (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          );
        },
        message:
          "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
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

module.exports = mongoose.model("User", userSchema); // mongoose.model("Name",schema);
