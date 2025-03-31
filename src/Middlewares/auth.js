const jwt = require("jsonwebtoken");
const User = require("../models/user")
const userAuth = async (req, res, next) => {
  // Read the token from req cookies
  try {
    const { token } = req.cookies;
    if (!token) { 
      return res.status(401).send("Please Login!");
    }
    const decodedObj = await jwt.verify(token, "DEVTINDER@harman");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
       return res.status(400).send("User not found"); 
    }// if valid user then next Api is called

    req.user = user;  // setting user info in req object for further use in apis.  
    next();
  } catch (err) { 
   return res.status(400).send("ERROR : " + err.message)
  }

};
module.exports = { userAuth };