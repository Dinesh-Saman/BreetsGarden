// controllers/menuController.js
const Menu = require("../models/menuModel");
const mongoose = require('mongoose'); 
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2; // Assuming you're using Cloudinary for image uploads

// Ensure Cloudinary is configured
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.addNewMenuItem = async (req, res) => {
    try {
        const { menuItemId, menuItemName, category, price, preparationTime, servingSize } = req.body;

        // Log the received data for debugging
        console.log(req.body);

        // Create an array to hold error messages for missing fields
        const missingFields = [];

        // Check each field and push to missingFields array if not provided
        if (!menuItemId) missingFields.push("menuItemId");
        if (!menuItemName) missingFields.push("menuItemName");
        if (!category) missingFields.push("category");
        if (!price) missingFields.push("price");
        if (!preparationTime) missingFields.push("preparationTime");
        if (!servingSize) missingFields.push("servingSize");
        if (!req.file) missingFields.push("menuImage"); // Check if the image file is uploaded

        // If there are any missing fields, return a detailed message
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: "The following fields are required",
                missingFields
            });
        }

        // Upload the image to Cloudinary and get the URL
        const uploadResponse = await cloudinary.uploader.upload(req.file.path);
        const menuImage = uploadResponse.secure_url; // Get the secure URL of the uploaded image

        // Create new menu item
        const newMenuItem = new Menu({
            menuItemId,
            menuItemName,
            category,
            price,
            preparationTime,
            servingSize,
            menuImage
        });

        await newMenuItem.save();

        // Define and initialize the transporter using your email service credentials
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Replace with the correct service provider (Gmail is an example)
            auth: {
                user: process.env.EMAIL_FROM, // Your email (ensure it's set in environment variables)
                pass: process.env.EMAIL_PASS  // Your email password (or app-specific password)
            }
        });

        // Send email notification after successfully adding the menu item
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: 'New Menu Item Added',
            html: `
                <h1>New Menu Item Details</h1>
                <p><strong>Menu Item ID:</strong> ${menuItemId}</p>
                <p><strong>Menu Item Name:</strong> ${menuItemName}</p>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Price:</strong> Rs ${price}</p>
                <p><strong>Preparation Time:</strong> ${preparationTime} minutes</p>
                <p><strong>Serving Size:</strong> ${servingSize}</p>
                <p><strong>Menu Image:</strong> <img src="${menuImage}" alt="Menu Image" width="100"/></p>
                <p>Please review the item details in the menu management system. Thank you!</p>
            `
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // Send success response
        res.status(201).json({ message: "New menu item added successfully!" });
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ message: err.message });
    }
};


// Delete a menu item
exports.deleteMenuItem = (req, res) => {
  const menuItemId = req.params.id;

  Menu.deleteOne({ _id: menuItemId })
    .then(() => {
      res.status(200).send({ status: "Menu item deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with delete menu item", error: err.message });
    });
};

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single menu item
exports.getMenuItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await Menu.findById(id);
    if (!menuItem) return res.status(404).json({ message: "Menu item not found!" });
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a menu item
// Update a menu item
exports.updateMenuItem = async (req, res) => {
  const menuItemId = req.params.id;
  const { menuItemName, category, price, preparationTime, servingSize } = req.body;

  // Validate inputs
  if (!(menuItemName && category && price && preparationTime && servingSize)) {
      return res.status(400).send({ message: "All inputs are required" });
  }

  // Check if menuItemId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
      return res.status(400).send({ message: "Invalid menu item ID" });
  }

  try {
      // Check if the menu item exists in the database
      const isMenuItem = await Menu.findById(menuItemId);
      if (!isMenuItem) {
          return res.status(404).json({ message: "Menu item not found!" });
      }

      let menuImage;

      // If a new file is uploaded, upload to Cloudinary and get the URL
      if (req.file) {
          const uploadResponse = await cloudinary.uploader.upload(req.file.path);
          menuImage = uploadResponse.secure_url; // Get the secure URL of the uploaded image
      } else {
          // Retain the existing image if no new image is uploaded
          menuImage = isMenuItem.menuImage;
      }

      // Update the menu item
      const result = await Menu.updateOne(
          { _id: menuItemId },
          {
              menuItemName,
              category,
              price,
              preparationTime,
              servingSize,
              menuImage,
          }
      );

      if (result.modifiedCount === 0) {
          return res.status(400).json({ message: "No changes were made" });
      }

      return res.status(200).json({ message: "Menu item updated successfully!" });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
  }
};

// Get category counts
exports.getCategoryCounts = async (req, res) => {
  try {
    // Aggregate the count of menu items by category
    const categoryCounts = await Menu.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1
        }
      }
    ]);

    // If there are no counts, return an empty object
    if (!categoryCounts.length) {
      return res.json({ message: "No categories found" });
    }

    res.json(categoryCounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
