const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./Models/user");

//  express json middleware
app.use(express.json());
// Post Api
app.post("/signup", async (req, res) => {
  
  const user = new User(req.body);
  try {
     await user.save();
  res.send("User created successfully");
  }
  catch (err) {
    res.status(400).send("error in creating user:" , err);
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
