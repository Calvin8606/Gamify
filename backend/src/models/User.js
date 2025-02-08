const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { required: true, type: String, trim: true },
  lastName: { required: true, type: String, trim: true },
  email: { required: true, type: String, trim: true },
  password: { required: true, type: String, trim: true },
  totalScore: { type: Number, required: false, default: 0 },
  badges: { type: Array, required: false, default: [] },
});

module.exports = mongoose.model("user", userSchema);
