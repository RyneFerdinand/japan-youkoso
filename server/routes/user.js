const User = require("../model/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { name, email, dob, gender, password } = req.body;
  let isUniqueEmail = false;

  try {
    const user = await User.findOne({ email });
    if (!user) isUniqueEmail = true;
  } catch (error) {
    res.send({ success: false, message: "Something went wrong" });
  }

  if (
    name.length === 0 ||
    email.length === 0 ||
    dob.length === 0 ||
    gender.length === 0 ||
    password.length === 0
  ) {
    res.send({ success: false, message: "All data must be inputted" });
  } else if (password.length < 8) {
    res.send({
      success: false,
      message: "Password must be more than 8 characters",
    });
  } else if (!isUniqueEmail) {
    res.send({ success: false, message: "Email must be unique" });
  } else if (!email.includes("@")) {
    res.send({ success: false, message: "Email must contain @ character" });
  } else {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.send({ success: false, message: "Register Unsuccessfull" });
      } else {
        const newUser = new User({ name, email, dob, gender, password: hash });

        try {
          await newUser.save();
          res.send({ success: true, message: "Register successful" });
        } catch (error) {
          res.send({ success: false, message: "Register unsuccessful" });
        }
      }
    });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  if (email.length === 0 || password.length === 0) {
    res.send({ success: false, message: "All data must be inputted" });
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) res.send({ success: false, message: "Wrong credentials" });
    else {
      bcrypt.compare(password, foundUser.password, function (err, result) {
        if (err || !result)
          res.send({ success: false, message: "Wrong credentials" });
        else
          res.send({
            success: true,
            message: "Successfully logged in",
            user: foundUser,
          });
      });
    }
  } catch (error) {
    res.send({ success: false, message: "Something went wrong" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
      res.send({ success: true, message: "User found", user: user });
    } else {
      res.send({ success: true, message: "User not found" });
    }
  } catch (error) {
    res.send({ success: false, message: "Something went wrong" });
  }
});

module.exports = router;
