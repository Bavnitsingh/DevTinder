const express = require("express");
const app = express();
// req /user /user/userId , /user/1

// this is regex(Regular Expression)/a/
// here is a is coming in the url then it will run otherwise not
// app.get("/user", (req, res) => {
//   res.send({
//     firstName: "Bavnit Singh",
//     Age: 20,
//     Profession: "Software Developer",
//   });
// });

app.get("/user/:userId/:Name/:password", (req, res) => {
  console.log(req.params)
  res.send({
    firstName: "Bavnit Singh",
    Age: 20,
    Profession: "Software Developer",
  });
});

// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send({
//     firstName: "Bavnit Singh",
//     Age: 20,
//     Profession: "Software Developer",
//   });
// });
// here b is optional
app.get("/ab?c", (req, res) => {
  res.send({
    firstName: "Bavnit Singh",
    Age: 20,
    Profession: "Software Developer",
  });
});
//abbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbc than also works
app.get("/ab+c", (req, res) => { 
  res.send({
    firstName: "Bavnit Singh",
    Age: 20,
    Profession: "Software Developer"
})
})
// abBavnitSinghcd   than also it works
app.get("/ab*cd", (req, res) => {
  res.send({
    firstName: "Bavnit Singh",
    Age: 20,
    Profession: "Software Developer",
  });
});


app.listen(3000, () => {
  console.log("Server started on port 3000...");
});