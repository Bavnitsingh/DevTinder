const express = require("express");
const app = express();
const {adminAuth,userAuth} = require("./Middlewares/auth")
//Handle Auth Middleware for all GET,POST,PUT,PATCH & delete
app.use("/admin", adminAuth);

app.get("/user/data", userAuth, (req, res, next) => {
  res.send("User Data sent successfully!");
});
app.post("/user/login", (req, res, next) => { 
  res.send("Login successfully!");

})

app.get("/admin/getAllData", (req, res, next) => {
  // Check if the admin is authorized or not.

  res.send("All data sent!");
});

app.get("/admin/deleteData", (req, res, next) => {
  res.send("All data Deleted!");
});

app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
