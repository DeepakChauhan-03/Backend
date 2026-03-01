const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Database connected successfully");
    });
  } catch (error) {
    console.log("error in database ", error);
    process.exit(1)
  }
}

module.exports = connectToDB;
