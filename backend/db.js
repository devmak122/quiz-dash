const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://devm4461:mGOgO6ucpGvP2fxC@cluster0.xmyrfcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Add your database name

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
