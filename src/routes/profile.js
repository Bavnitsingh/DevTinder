const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ValidateProfileEditData } = require("../utils/validation");
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
module.exports = profileRouter;
