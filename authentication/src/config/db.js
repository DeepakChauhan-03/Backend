const mongoose = require('mongoose')

async function connectToDB(){
   try {
      await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("____Connected to Database____");
      });
    } catch (error) {
      console.log("error in connecting database", error);
    }
}

module.exports = connectToDB;