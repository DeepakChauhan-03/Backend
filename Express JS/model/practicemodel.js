import mongoose from "mongoose";
import practiceSchema from "../Schema/practiceSchema.js";

const practiceModel = mongoose.model("practices1",practiceSchema);

export default practiceModel;