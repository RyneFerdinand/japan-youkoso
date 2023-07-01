const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  title: String,
  content: String,
  mandatory: Boolean,
  user_id: String,
  approve: Boolean,
  created_at: Date
});

module.exports = mongoose.model("Step", stepSchema);
