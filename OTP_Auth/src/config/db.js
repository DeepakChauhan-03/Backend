const mongoose = require('mongoose')

async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("Connected to database successfully.")
        })
    } catch (error) {
        console.log("Error while connecting to database ", error)
    }
}

module.exports = connectToDB;