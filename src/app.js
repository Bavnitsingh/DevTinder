const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 7777;

const allowedOrigins = [
  "http://localhost:5173",
  "https://dev-tinder-web-six.vercel.app"
];

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// we should first connect the db then start the server
connectDB()
  .then(() => {
    console.log("DB connection established...");
    app.listen(PORT, () => {
      console.log(`Server is successfully listening on port ...${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error in connecting db", err);
  });
