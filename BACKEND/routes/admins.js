const express = require('express');
const router = express.Router();

// Dummy admin data
const admins = [
    { username: 'admin', password: 'admin123' } // Change to your preferred credentials
];

// Admin login route
router.post('/admin-login', (req, res) => {  // Now handles POST requests to /admin-login
    const { username, password } = req.body;

    const admin = admins.find(admin => admin.username === username && admin.password === password);
    if (admin) {
        return res.status(200).json('Admin login successful');
    } else {
        return res.status(400).json('Invalid admin credentials');
    }
});

module.exports = router;
