const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized");
  } else {
    next(); // Proceed to the next middleware or route handler.
  }
}
const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized");
  } else {
    next(); // Proceed to the next middleware or route handler.
  }
};
module.exports = { adminAuth,userAuth };