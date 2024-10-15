const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// Register Customer
router.route("/register").post(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate password: at least 4 characters long, containing both letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json("Password must be at least 4 characters long and contain both letters and numbers.");
    }

    try {
        // Ensure unique username by checking if it already exists
        const existingCustomer = await Customer.findOne({ username });
        if (existingCustomer) {
            return res.status(400).json("Username already exists.");
        }

        const newCustomer = new Customer({
            username,
            email,
            password
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
        // Find customer by username
        const customer = await Customer.findOne({ username });
        if (!customer) {
            return res.status(400).json("Username not found");
        }

        // Validate password
        if (customer.password !== password) {
            return res.status(400).json("Incorrect password");
        }

        res.status(200).json("Login successful");
    } catch (err) {
        console.error(err);
        res.status(500).json("Error during login");
    }
});


// Check if customer exists by username
router.post('/checkCustomer', async (req, res) => {
    const { username } = req.body;
    try {
        const customer = await Customer.findOne({ username });
        if (customer) {
            return res.status(200).send({ message: "Customer exists" });
        }
        return res.status(404).send({ message: "Customer does not exist" });
    } catch (err) {
        return res.status(500).send({ message: "Server error" });
    }
});





module.exports = router;
