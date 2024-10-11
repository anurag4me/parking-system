const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/login";
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection Successful to Database");
  } catch (error) {
    console.error("Connection Failed");
    console.log(error);
    process.exit(0);
  }
};

module.exports = connectDb;
