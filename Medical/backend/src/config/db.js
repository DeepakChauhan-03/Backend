const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("____Connected to Database____");
    });
  } catch (error) {
    console.log("Error in connecting database");
  }
}

module.exports = connectToDB;
