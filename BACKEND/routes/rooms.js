const router = require("express").Router();
const Room = require("../models/room");
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Directory where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});

// File filter to allow only image files (jpeg, jpg, png)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images (jpg, jpeg, png) are allowed."), false);
    }
};

// Multer middleware for handling single file upload
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, // File size limit: 5MB
});

// Function to generate a random 6-digit number
function generateRoomId() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Function to create a unique room ID
async function createUniqueRoomId() {
    let unique = false;
    let newId;

    while (!unique) {
        newId = `room_${generateRoomId()}`;
        const existingRoom = await Room.findOne({ _id: newId });
        if (!existingRoom) {
            unique = true;
        }
    }

    return newId;
}

// Add room with image upload
router.route("/addRoom").post((req, res, next) => {
    upload.single("roomImage")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message }); // Handle Multer-specific errors
        } else if (err) {
            return res.status(500).json({ error: err.message }); // Handle other errors
        }
        next();
    });
}, async (req, res) => {
    try {
        const newRoomId = await createUniqueRoomId();
        const { roomName, noOfPersons, noOfBeds, airCondition, isSmokingAllowed, board, price } = req.body;
        const roomImage = req.file ? req.file.filename : null; // If image is uploaded, get filename

        const newRoom = new Room({
            _id: newRoomId,
            roomName,
            noOfPersons,
            noOfBeds,
            airCondition,
            isSmokingAllowed,
            board,
            price,
            roomImage // Save the image filename in the database
        });

        await newRoom.save();
        res.json({ message: "Room added with ID: " + newRoomId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || "Error adding room" });
    }
});

// Get all room details
router.route("/getrooms").get(async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching rooms", error: err.message });
    }
});

// Search for rooms by name
router.route("/searchroom").get(async (req, res) => {
    const { query } = req.query; // Get the search query from the request

    try {
        const searchCriteria = query ? {
            roomName: { $regex: query, $options: 'i' } // Case-insensitive search
        } : {};

        const rooms = await Room.find(searchCriteria);
        res.json(rooms);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error fetching rooms", error: err.message });
    }
});

// Filter rooms by price
router.get("/filterrooms", async (req, res) => {
    const { priceRange } = req.query;

    let filter = {};

    // If priceRange is provided, filter rooms where price is less than or equal to the specified value
    if (priceRange) {
        filter.price = { $lte: priceRange };
    }

    try {
        const rooms = await Room.find(filter);
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update rooms
router.route("/updateRoom/:id").put(async (req, res) => {
    const roomId = req.params.id;
    const { roomName, noOfPersons, noOfBeds, airCondition, isSmokingAllowed,board, price } = req.body;

    const updateRoom = {
        roomName,
        noOfPersons,
        noOfBeds,
        airCondition,
        isSmokingAllowed,
        board,
        price
    };

    try {
        await Room.findByIdAndUpdate(roomId, updateRoom);
        res.status(200).send({ status: "Room updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" });
    }
});

// Delete room
router.route("/deleteRoom/:id").delete(async (req, res) => {
    const roomId = req.params.id;

    try {
        await Room.findByIdAndDelete(roomId);
        res.status(200).send({ status: "Room deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting data", error: err.message });
    }
});

// Get one room detail
router.route("/get/:id").get(async (req, res) => {
    const roomId = req.params.id;

    try {
        const room = await Room.findById(roomId);
        res.status(200).send({ status: "Room fetched", room });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching data", error: err.message });
    }
});

module.exports = router;