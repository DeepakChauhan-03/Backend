//Database connection 

import mongoose  from "mongoose";

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
           console.log("Database connected successfully")
        })
        
    } catch (error) {
         console.log("Error in connecting the database ")
    }
}

export default connectToDB;