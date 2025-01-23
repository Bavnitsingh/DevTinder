const express = require("express");
const app = express();
// req /user /user/userId , /user/1

//app.use("/route", rh1, [rh2, rh3], rh4, rh5, rh6);
// array of route handlers will not affect its performance
// GET /user => middlewares => request Handlers
// it pass through all the middlewares and at last the route handler handle the response
app.use("/user", (req, res, next) => {
  // route handler
  console.log("Handling route 0");
  next();
})
app.get(
  "/user",
  (req, res, next) => {
    // route handler
    console.log("Handling route1");
    next();
  },
  (req, res,next) => {
    // route handler
    console.log("Handling route 2");
    next();
  },
  //before this route all are known as middlewares
  (req, res, next) => {
    // route handler
    res.send("Handling route 3");
  }
);




app.listen(3000, () => {
  console.log("Server started on port 3000...");
});