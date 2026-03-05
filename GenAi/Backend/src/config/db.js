const mongoose = require('mongoose')

async function connectToDB(){
  try {
   await mongoose.connect(process.env.MONGO_URI)
   console.log("Connected to database successfully")
  } catch (error) {
    console.log("Error in connecting database", error)
  }
}

module.exports = connectToDB