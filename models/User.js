const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please add a title"],
    unique: true,
    trim: true,
    maxlength: [40, "Title cannot be more than 40 characters"],
  },
  email: {
    type: String,
    required: true,
    maxlength: [200, "error length 200"],
  },
  password: {
    type: String,
    required: true,
    maxlength: [200, "error length 200"],
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
