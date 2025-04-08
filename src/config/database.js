const mongoose = require('mongoose');
require("dotenv").config();
const connectDB = async () => {
<<<<<<< HEAD
  await mongoose.connect(
    "mongodb+srv://BavnitSingh:aARilV4x6rClQS8N@namastenode.n4a4r.mongodb.net/devTinder"
  );
=======
  await mongoose.connect(process.env.MONGODB_URI);
>>>>>>> e3e3e0c (Production Build)
}
module.exports = connectDB;
