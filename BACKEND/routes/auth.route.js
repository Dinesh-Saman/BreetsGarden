const express = require('express');
const Mstore = require('../models/Mstore.model.js');
const User = require('../models/user.model.js');
const jwt = require("jsonwebtoken");
const route = express.Router();

// User Signup
route.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = new User({ username, email, password });

  try {
    await newUser.save();
    res.json("Signup success");
  } catch (error) {
    next(error);
  }
});

// User Signin
route.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "User Not found" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httponly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
});

// User Signout
route.post("/signout", (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
});

// Inventory Manager Signup
route.post("/ssignup", async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = new Mstore({ username, email, password });

  try {
    await newUser.save();
    res.json("Signup success");
  } catch (error) {
    next(error);
  }
});

// Inventory Manager Signin
route.post("/ssignin", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const validUser = await Mstore.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "User Not found" });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, { httponly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
});

module.exports = route;
