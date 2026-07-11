import mongoose from "mongoose";

const connectToDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error in database connection")
    }
}

export default connectToDB