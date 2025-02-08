const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { ValidateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")
//  express json middleware
app.use(express.json());
app.use(cookieParser());

// Post Api -> Signup Api
app.post("/signup", async (req, res) => {
  try {
    // validation of the data
    ValidateSignupData(req);
    // Encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    // Await bcoz it returns a promise
    const passwordHash = await bcrypt.hash(password, 10); // bcrypt.hash(password,saltrounds)
    // console.log(passwordHash);
    // create a new user instance
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

// Profile GET Api
app.get("/profile",userAuth , async (req, res) => { 
  try { 
    const user = req.user;
    res.send(user)
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
})

// Login Api
app.post("/login", async (req, res) => {
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
      res.cookie("token", token,{expires : new Date(Date.now() + 10 * 3600000)});

      res.send("Login successfully!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});


app.post("/sendConnectionRequest",userAuth, async (req, res) => {
  try {
    const user = req.user;

    console.log("Sending connection");
    res.send(user.firstName + " is sending request");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

// we should firat connect the db then start the server
connectDB()
  .then(() => {
    console.log("DB connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Error in connecting db");
  });
