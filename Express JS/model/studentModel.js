import mongoose from "mongoose";
import studentSchema from "../Schema/studentSchema.js";
const studentModel = mongoose.model("students",studentSchema)

export default studentModel