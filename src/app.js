const express = require("express");
const app = express();
// Request Handler
// This will match all the HTTP methods API calls "/test"
app.use("/test",(req,res) => {
  res.send("Hello ,test from the server")
})
// Order of writing the routes matter alot.
// Order matters alot

// app.use("/user", (req, res) => {
//   res.send("Hello");
// });

// This will only handle Get Method of Http to /user
app.get("/user", (req, res) => { 
  res.send({
    firstName: "Bavnit Singh",
    Age: 20,
    Profession: "Software Developer"
})
})

app.post("/user", (req, res) => { 

//Post logic
  res.send("Data submitted successfully");
})

app.delete("/user", (req, res) => {
  // Delete logic
  res.send("Data deleted Successfully");
})

app.put("/user", (req, res) => {
  // Put logic
  res.send("Data put Successfully");
});
app.patch("/user", (req, res) => {
  // Put logic
  res.send("Data patched Successfully");
});

app.listen(3000, () => {
  console.log("Server started on port 3000...");
});