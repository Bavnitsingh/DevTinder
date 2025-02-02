const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { ValidateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
//  express json middleware
app.use(express.json());

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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login successfully!!!");
    }
    else {
      throw new Error("Invalid credentials");
    }

  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

// Get user by Id
app.get("/user", async (req, res) => {
  try {
    const user = await User.findById();
    res.send(user);
  } catch (err) {
    res.status(400).send("Error in getting user : " + err.message);
  }
});
// Delete a user from the database
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Error in deleting user : " + err.message);
  }
});

// Update a user in the database
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "gender", "age", "about", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Invalid updates!");
    }
    if (data?.skills.length > 15) {
      throw new Error("Skills cannot exceed 15!");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Error in creating user : " + err.message);
  }
});

// Update a user by emailId
// app.patch("/user", async (req, res) => {
//   const data = req.body;
//   const emailId = req.body.emailId;
//   try {
//     const user = await User.findOneAndUpdate(
//       { "emailId": emailId },
//       data,
//       { new: true }
//     );
//     console.log(user);
//     res.send("User updated successfully");
//   } catch (err) {
//     res.status(400).send("error in updating user:");
//   }
// });
// Get user by email
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const users = await User.findOne({ emailId: userEmail }); // this is array
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error in creating user : " + err.message);
  }
});

//Feed Api = GET /feed - get all the users from the database
app.get("/feed", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Error in creating user : " + err.message);
  }
});
// creating a new instance of the user model

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
