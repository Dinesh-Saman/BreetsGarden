const express = require('express');
const router = express.Router();
const Customer = require('../models/cusJ');
const bcrypt = require('bcrypt');

// Register Customer
router.route("/register").post(async (req, res) => {
    const { username, email, password } = req.body;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json("Password must be at least 4 characters long and contain both letters and numbers.");
    }

    try {
        const existingCustomer = await Customer.findOne({ username });
        if (existingCustomer) {
            return res.status(400).json("Username already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newCustomer = new Customer({
            username,
            email,
            password: hashedPassword
        });

        await newCustomer.save();
        res.status(200).json("Customer registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("Error registering customer");
    }
});

// Login Customer
router.route("/login").post(async (req, res) => {
    const { username, password } = req.body;

    try {
        const customer = await Customer.findOne({ username });
        if (!customer) {
            return res.status(400).json("Username not found");
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json("Incorrect password");
        }

        res.status(200).json("Login successful");
    } catch (err) {
        console.error(err);
        res.status(500).json("Error during login");
    }
});

module.exports = router;
