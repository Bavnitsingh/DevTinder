const express = require("express");
const app = express();
// Request Handler
app.use("/test",(req,res) => {
  res.send("Hello ,test from the server")
})
app.use("/", (req, res) => {
  res.send("Hello from the server");
});
app.listen(3000, () => {
  console.log("Server started on port 3000...");
});