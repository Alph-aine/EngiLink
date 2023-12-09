require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const connectDB = () => {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
    .then((conBool) => {
      console.log(`MongoDB Connected: ${conBool.connection.host}`);
    })
    .catch((error) => {
      console.error(`MongoDB Connection Error: ${error.message}`);
    });
};

module.exports = connectDB;
