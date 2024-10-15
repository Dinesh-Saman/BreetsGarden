const express = require('express');
const router = express.Router();

const admins = [{ username: 'admin', password: 'admin123' }];

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const admin = admins.find((admin) => admin.username === username && admin.password === password);
    
    if (admin) {
        res.status(200).json('Admin login successful');
    } else {
        res.status(400).json('Invalid credentials');
    }
});

module.exports = router;
