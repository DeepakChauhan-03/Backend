const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

  image: String,
  caption: String,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }

},{timestamps:true});

module.exports = mongoose.model("post", postSchema);
