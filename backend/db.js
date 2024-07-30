const mongoose = require('mongoose');


const mongoURL = "mongodb://localhost:27017/"

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (e) {
    console.log("Failed to connect to MongoDB", e.message);
  }
};

module.exports = connectToMongo;
