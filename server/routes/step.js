const Step = require("../model/step");
const Comment = require("../model/comment");
const StepVote = require("../model/step_vote");
const UserStep = require("../model/user_step");
const express = require("express");
const router = express.Router();

router.post("/:id/user/:user_id/:type", async (req, res) => {
  const { id, user_id, type } = req.params;

  let statusValue = 0;
  if (type === 'skip') {
    statusValue = -1;
  } else if (type === 'done') {
    statusValue = 1;
  }

  try {
    let userStep = await UserStep.findOne({ step_id: id, user_id });
    console.log(userStep)
    if (!userStep) {
      userStep = new UserStep({ step_id: id, user_id: user_id, status: statusValue })
    } else {
      userStep.status = statusValue;
    }
    userStep.save();

    res.send({ success: true, message: `Successfully ${type} step !` });
  } catch (error) {
    res.send({ success: false, message: `Failed to ${type} step !` });
  }

});

router.post("/:id/approve", async (req, res) => {
  const { id } = req.params;

  try {
    const step = await Step.findById(id);
    step.approve = true;
    await step.save();
    res.send({ success: true, message: "Successfully approved the step" });
  } catch (error) {
    res.send({ success: false, message: "Unsuccessfully approving the step" });
  }
});

router.post("/:id/vote", async (req, res) => {
  const { id } = req.params;
  const { vote, user_id } = req.body
  try {
    let foundVote = await StepVote.findOne({ user_id: user_id, step_id: id });

    if (!foundVote) {
      foundVote = new StepVote({ step_id: id, user_id, vote })
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
  const { title, content, mandatory, user_id } = req.body;
  try {
    const newStep = new Step({ title, content, mandatory, user_id, approve: false, created_at: new Date() });
    await newStep.save();
    res.send({ success: true, message: "Step creation successful" });
  } catch (error) {
    res.send({ success: false, message: "Step creation unsuccessful" });
  }
});

router.get("/user/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const userSteps = await UserStep.find({ user_id })
  const doneSteps = [];
  const steps = [];
  if (userSteps.length > 0) {

    let isLoading = false;
    let ctr = 0;
    userSteps.forEach(async (step, idx) => {
      try {
        console.log(idx, steps.length, userSteps.length)
        const foundStep = await Step.findOne({ '_id': step.step_id })
        if (step.status === 1) {
          doneSteps.push(foundStep)
        }
        steps.push(foundStep);
        ctr++;
        if (ctr === userSteps.length) {
          res.send({ success: true, message: `Successfully retreived step !`, steps, doneSteps });
        }
      } catch (error) {
        res.send({ success: false, message: `${error}` });
      }
    })
  } else {
    res.send({ success: true, message: `Successfully retreived step !`, steps: steps });
  }

});

router.get("/:id/comment", async (req, res) => {
  try {
    let { id } = req.params;

    const comments = await Comment.find({ step_id: id }).sort({ created_at: -1 });
    res.send({ success: true, message: "Comments retreived", comments });

  } catch (error) {
    res.send({
      success: false,
      message: "Unsuccessfully retreived comment",
    });
  }
});

router.get("/:id/vote", async (req, res) => {
  const { id } = req.params;

  try {
    let foundVote = await StepVote.find({ step_id: id });

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

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;

    const step = await Step.findById(id);

    if (step) {
      res.send({ success: true, message: "Step found", step });
    } else {
      res.send({ success: false, message: "Step not found" });
    }

  } catch (error) {
    res.send({
      success: false,
      message: "Unsuccessfully retreived step",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    let { page, approve, weight } = req.query;

    let query = {};

    if (approve !== null && approve !== undefined) {
      query = { ...query, approve: approve == 1 };
    }

    if (page === "undefined") {
      page = -1;
    }

    let steps = await Step.find(query);

    if (weight !== null && approve !== undefined) {
      steps = steps.map(step => ({ ...step._doc, weight: Math.random() }));
    }

    if (page !== -1) {
      const totalSteps = steps.length;
      const totalPage = Math.ceil(totalSteps / 12);

      if (page > totalPage) {
        res.send({
          success: false,
          message: "Page out of bounds",
        });
      } else {
        const currentSteps = steps.slice((page - 1) * 12, page * 12);
        res.send({
          success: true,
          message: "Successsfully retreived steps",
          steps: currentSteps,
          totalPage: totalPage,
        });
      }
    } else {
      res.send({
        success: true,
        message: "Successfully retreived steps",
        steps: steps,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: "Unsuccessfully retreived steps",
    });
  }
});

module.exports = router;
