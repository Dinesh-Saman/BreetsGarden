const express = require('express');
const router = express.Router();
const ReservationManager = require('../models/reservationManager');

// Register Reservation Manager
router.post('/resregister', async (req, res) => {
    const { username, email, password } = req.body;

    if (password.length < 4) {
        return res.status(400).json("Password must be at least 4 characters long.");
    }

    try {
        const existingReservationManager = await ReservationManager.findOne({ username });
        if (existingReservationManager) {
            return res.status(400).json("Username already exists.");
        }

        const newReservationManager = new ReservationManager({
            username,
            email,
            password
        });

        await newReservationManager.save();
        res.status(200).json("Customer registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).json("Error registering customer");
    }
});

// Login Reservation Manager
router.post('/reslogin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const reservationManager = await ReservationManager.findOne({ username });
        if (!reservationManager) {
            return res.status(400).json("Username not found");
        }

        // Simple password comparison
        if (reservationManager.password !== password) {
            return res.status(400).json("Incorrect password");
        }

        res.status(200).json("Login successful");
    } catch (err) {
        console.error(err);
        res.status(500).json("Error during login");
    }
});

module.exports = router;
