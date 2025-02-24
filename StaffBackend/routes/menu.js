// routes/menu.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // specify upload directory

// Add a new menu item
router.post('/add-menu-item/',upload.single('menuImage'), menuController.addNewMenuItem);

// Delete a menu item
router.delete('/delete-menu-item/:id', menuController.deleteMenuItem);

// Get all menu items
router.get('/get-menu-items/', menuController.getAllMenuItems);

// Get a single menu item
router.get('/get-menu-item/:id', menuController.getMenuItemById);

// Update a menu item
router.put('/update-menu-item/:id', upload.single('menuImage'), menuController.updateMenuItem);

// Get category count
router.get('/category-counts', menuController.getCategoryCounts);

module.exports = router;
