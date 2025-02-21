const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ValidateProfileEditData } = require("../utils/validation");
const bcrypt = require("bcrypt");
// Profile GET Api
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

// Profile UPDATE Api
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!ValidateProfileEditData(req)) {
      throw new Error("invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
   await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} , your profile updated successfully`,
      data: loggedInUser
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

// forgot password Api
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body;
    // validate input

    if (!oldpassword || !newpassword) { 
      throw new Error("Please provide old and new password");
    }
    const user = req.user;
    if (!user) {
      throw new Error("User Not Found");
    }
    const isPasswordMatch = await bcrypt.compare(oldpassword, user.password)
    if (!isPasswordMatch) {
      throw new Error("You have entered wrong password!!");
    }
    const passwordHash = await bcrypt.hash(newpassword, 10)
    user.password = passwordHash;
    await user.save()
    res.json({
      message: `${user.firstName}, your password updated successfully`
    })
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
})
module.exports = profileRouter;
