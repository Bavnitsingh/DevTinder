const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

//  express json middleware
app.use(express.json());

// Post Api
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(400).send("error in creating user:", err);
  }
});

// Get user by Id
app.get("/user", async (req, res) => {
  try {
    const user = await User.findById();
    res.send(user);
  } catch (error) {
    res.status(400).send("error in getting user");
  }
})
 // Delete a user from the database
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
    } catch (err) {
    res.status(400).send("error in creating user:");
    
  }
})

// Update a user in the database
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
   const user =  await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before"
    });
    console.log(user)
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("error in creating user:");
  }
})

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
    res.status(400).send("Something went wrong");
  }
});


//Feed Api = GET /feed - get all the users from the database
app.get("/feed", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
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
