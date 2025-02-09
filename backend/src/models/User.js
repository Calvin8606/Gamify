const mongoose = require("mongoose");
const badges = require("./BadgesEnum");

const userSchema = new mongoose.Schema({
  firstName: { required: true, type: String, trim: true },
  lastName: { required: true, type: String, trim: true },
  email: { required: true, type: String, trim: true },
  password: { required: true, type: String, trim: true },
  totalScore: { type: Number, required: false, default: 0 },
  badges: [{ type: String, enum: badges, default: [] }],
  completedQuiz: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", userSchema);
