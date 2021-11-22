const mongoose = require("mongoose");

const SkillsetSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: [true, "Please add a title"],
    unique: true,
    trim: true,
    maxlength: [40, "Title cannot be more than 40 characters"],
  },
  level: {
    type: String,
    required: true,
    maxlength: [200, "error length 200"],
  },
  other: {
    type: String,
    required: true,
    maxlength: [200, "error length 200"],
  },
});

module.exports =
  mongoose.models.Skillset || mongoose.model("Skillset", SkillsetSchema);
