const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const jwt = require("jsonwebtoken");
const User = require("../models").userModel;
// const mongoose = require("mongoose");

router.use((req, res, next) => {
  console.log("A request is coming in to auth.js");
  next();
});

// 用postman 同server connect ， testAPI 係用嚟睇同server 有冇連埋一齊
router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working.",
    title: "Hi there",
  };
  return res.send(msgObj);
});

router.post("/register", async (req, res) => {
  console.log("Register.");
  const { error } = registerValidation(req.body);
  // console.log(error.details);
  if (error) return res.status(400).send(error.details[0].message);

  //check if the user exists
  // console.log(req.body.email);
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) {
    console.log(emailExist);
    return res.status(400).send("Email has already been registered.");
  }

  // registry the user
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });
  // console.log(newUser.password);
  try {
    const savedUser = await newUser.save();
    // console.log(savedUser.password);
    res
      .status(200)
      .send({ msg: "Register successfully.", savedObject: savedUser });
    // console.log(saveUser);
  } catch (err) {
    res.status(400).send("User not saved");
  }
});

// LT 535
router.post("/login", (req, res) => {
  //check the validation of data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      res.status(400).send(err);
      console.log("findOne err.");
    }
    if (!user) {
      res.status(401).send("User not found.");
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) {
          console.log("compare Password err");
          return res.status(400).send(err);
        }
        if (isMatch) {
          const tokenObject = { _id: user._id, email: user.email };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
          res.send({ success: true, token: "JWT" + token, user });
        } else {
          res.status(401).send("Wrong password.");
        }
      });
    }
  });
});

module.exports = router;
