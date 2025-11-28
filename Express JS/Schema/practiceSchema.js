import mongoose from "mongoose";

const practiceSchema = mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    mobile:Number
})

export default practiceSchema;