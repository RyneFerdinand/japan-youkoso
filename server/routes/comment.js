const Comment = require("../model/comment");
const express = require("express");
const router = express.Router();


router.post("/:id/vote", async (req, res) => {
  const { id } = req.params;
  const { vote, user_id } = req.body
  try {
    let foundVote = await CommentVote.findOne({ user_id: user_id, comment_id: id });

    if (!foundVote) {
      foundVote = new CommentVote({ comment_id: id, user_id, vote })
    } else {
      if (vote === foundVote.vote) {
        foundVote.vote = 0;
      } else {
        foundVote.vote = vote
      }
    }

    await foundVote.save();
    res.send({
      success: true,
      message: "Successfully voted !",
      vote: foundVote.vote
    });

  } catch (error) {
    res.send({
      success: false,
      message: error
    });
  }
})

router.post("/", async (req, res) => {
  const { comment_id, step_id, user_id, content, created_at } = req.body;
  try {
    const newComment = new Comment({ comment_id, step_id, user_id, content, created_at });
    await newComment.save();
    res.send({ success: true, message: "Comment successful created" });
  } catch (error) {
    res.send({ success: false, message: "Comment failed to be created" });
  }
});

router.get("/:id/vote", async (req, res) => {
  const { id } = req.params;

  try {
    let foundVote = await CommentVote.find({ comment_id: id });

    res.send({
      success: true,
      steps: foundVote,
      message: "Successfully retreived votes !"
    });

  } catch (error) {
    res.send({
      success: false,
      message: error
    });
  }
})

module.exports = router;
