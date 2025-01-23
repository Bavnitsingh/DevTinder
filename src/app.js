const express = require("express");
const app = express();
// req /user /user/userId , /user/1

//app.use("/route", rh1, [rh2, rh3], rh4, rh5, rh6);
// array of route handlers will not affect its performance

app.use(
  "/user",
  [(req, res, next) => {
    // route handler
    console.log("Handling route1");
    next();
    res.send("Route handler 1");
  },
  (req, res,next) => {
    // route handler
    console.log("Handling route 2");
    next();
    res.send("Route handler 2");
  },
  (req, res, next) => {
    // route handler
    console.log("Handling route 3");
    next();
    res.send("Route handler 3");
  }]
);




app.listen(3000, () => {
  console.log("Server started on port 3000...");
});