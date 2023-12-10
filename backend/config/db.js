const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_URI)
    .then((conBool) => {
      console.log(`MongoDB Connected: ${conBool.connection.host}`);
    })
    .catch((error) => {
      console.error(`MongoDB Connection Error: ${error.message}`);
    });
};

module.exports = connectDB;
