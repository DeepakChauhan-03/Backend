const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "name must be greater than 3 length"],
    validate: {
      validator: function (v) {
        return v.trim().length > 0;
      },
      message: "Name cannot be empty",
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  number: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, "Enter valid 10 digit number"],
  },
  password: {
    type: String,
    required: true,
    minlength: [5, "password must be grater than 5 digits"],
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
