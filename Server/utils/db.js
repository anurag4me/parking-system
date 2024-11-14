const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/login";
const connectDb = async () => {
  try {
    const URI = process.env.MONGODB_URI;
    if (!URI) {
      console.error("MONGODB_URI is undefined");
      process.exit(1);
    }

    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connection Successful to Database");
  } catch (error) {
    console.error("Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDb;
