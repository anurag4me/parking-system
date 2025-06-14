const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/login";
const connectDb = async (url) => {
    return mongoose.connect(url)
}

module.exports = connectDb;
