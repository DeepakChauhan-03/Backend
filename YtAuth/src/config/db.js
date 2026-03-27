const mongoose = require('mongoose')
async function connectToDB(){
   try {
      await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to database successfully")
      })
   } catch (error) {
    console.log("Error in connecting DB ", error)
   }

}

module.exports = connectToDB;