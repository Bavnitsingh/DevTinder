const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 7777;

const allowedOrigins = [
  "http://localhost:5173",
  // "https://your-frontend-name.vercel.app", // replace this
];

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(
  cors({
<<<<<<< HEAD
    origin: ["http://localhost:5173",
      "https://0cb1-103-79-8-185.ngrok-free.app/"
    ],
    credentials:true

=======
    origin: allowedOrigins,
    credentials: true,
>>>>>>> e3e3e0c (Production Build)
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// we should firat connect the db then start the server
connectDB()
  .then(() => {
    console.log("DB connection established...");
    app.listen(PORT, () => {
      console.log(`Server is successfully listening on port ...${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error in connecting db");
  });
