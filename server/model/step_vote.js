const mongoose = require("mongoose");

const stepVoteSchema = new mongoose.Schema({
    step_id: String,
    user_id: String,
    vote: Number
});

module.exports = mongoose.model("StepVote", stepVoteSchema);
