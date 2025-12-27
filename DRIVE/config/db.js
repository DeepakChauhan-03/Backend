const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("____Connected to Database____");
    })
}

module.exports = connectToDB;