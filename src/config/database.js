const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://BavnitSingh:aARilV4x6rClQS8N@namastenode.n4a4r.mongodb.net/devTinder"
  );
}
module.exports = connectDB;
