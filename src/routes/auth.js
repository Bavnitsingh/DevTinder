// handled issue
const express = require("express");
const authRouter = express.Router();
const { ValidateSignupData } = require("../utils/validation");
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true, // Vercel = HTTPS
  sameSite: "None",
  expires: new Date(Date.now() + 10 * 3600000),
};

authRouter.post("/signup", async (req, res) => {
  try {
    // validation of the data
    ValidateSignupData(req);
    // Encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    // Await bcoz it returns a promise
    const passwordHash = await bcrypt.hash(password, 10); // bcrypt.hash(password,saltrounds)
    // create a new user instance
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();
    // Create a JWT token

    const token = await savedUser.getJWT();
    // Add the token to cookie and send the response back to the user
    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({ message: "User created successfully", data: savedUser });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await user.passwordValidation(password);
    if (isPasswordValid) {
      // Create a JWT token

      const token = await user.getJWT();
      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, COOKIE_OPTIONS);

      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, COOKIE_OPTIONS);
  res.send("Logged out successfully!!!");
});

module.exports = authRouter;
