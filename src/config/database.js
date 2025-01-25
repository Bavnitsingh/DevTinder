const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://BavnitSingh:9iPKtONhSoYULhyV@namastenode.n4a4r.mongodb.net/devTinder"
  );
}
module.exports = connectDB;
