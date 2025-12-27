const mongoose = require('mongoose')

function connectToDB() {
   try {
     mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("____Connected to Database____");
    })
   } catch (error) {
     console.log("Error in connecting database ", error)
   }
}

module.exports = connectToDB;