const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user_id: String,
    step_id: String,
    content: String,
    created_at: Date
});

module.exports = mongoose.model("Comment", commentSchema);
