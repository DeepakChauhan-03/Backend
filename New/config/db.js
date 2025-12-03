const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost:27017/men').then(()=>{
    console.log("connected to database...")
})

module.exports = connection;