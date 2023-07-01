const mongoose = require("mongoose");

const userStepSchema = new mongoose.Schema({
    step_id: String,
    user_id: String,
    status: Number
});

module.exports = mongoose.model("UserStep", userStepSchema);
