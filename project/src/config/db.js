const mongoose = require('mongoose')

 async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
                console.log("____Connected to Database____");
            })
    } catch (error) {
         console.log("error in connecting db ",error)
    }
}

module.exports = connectToDB;