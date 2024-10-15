const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/'); // Specify upload directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // timestamp + file extension
    }
});
const upload = multer({ storage: storage });

// Get mongoose connection
module.exports = (router, connection) => {
    const Activities = connection.model("Activities", new mongoose.Schema({
        activityName: { type: String, required: true },
        openingHrs: { type: String, required: true },
        closingHrs: { type: String, required: true },
        price: { type: String, required: true },
        image: { type: String, required: true } // Store image path or URL
    }));

    // CREATE
    router.post("/Aadd", upload.single('image'), (req, res) => {
        const { activityName, openingHrs, closingHrs, price } = req.body;
        const image = req.file ? req.file.path : "";

        const newActivities = new Activities({
            activityName,
            openingHrs,
            closingHrs,
            price,
            image
        });

        newActivities.save()
            .then(() => res.status(201).json("Activity Created Successfully"))
            .catch((err) => {
                console.error(err);
                res.status(500).send({ status: "Error with creating data", error: err.message });
            });
    });

    // GET all activities
    router.route("/").get((req, res) => {
        Activities.find()
            .then(activities => res.json(activities))
            .catch((err) => {
                console.error(err);
                res.status(500).send({ status: "Error with fetching data", error: err.message });
            });
    });

    // UPDATE
    router.route("/Aupdate/:id").put(upload.single('image'), async (req, res) => {
        const activityId = req.params.id;
        const { activityName, openingHrs, closingHrs, price } = req.body;
        const image = req.file ? req.file.path : req.body.image;

        const updateActivities = {
            activityName,
            openingHrs,
            closingHrs,
            price,
            image
        };

        await Activities.findByIdAndUpdate(activityId, updateActivities)
            .then(() => res.status(200).send({ status: "Activity Updated Successfully" }))
            .catch((err) => {
                console.error(err);
                res.status(500).send({ status: "Error with updating data", error: err.message });
            });
    });

    // DELETE
    router.route("/Adelete/:id").delete(async (req, res) => {
        const activityId = req.params.id;

        await Activities.findByIdAndDelete(activityId)
            .then(() => res.status(200).send({ status: "Activity deleted Successfully" }))
            .catch((err) => {
                console.error(err.message);
                res.status(500).send({ status: "Error with deleting activity", error: err.message });
            });
    });

    // GET a single activity by ID
    router.route("/get/:id").get(async (req, res) => {
        const activityId = req.params.id;

        await Activities.findById(activityId)
            .then((activity) => res.status(200).send({ status: "Activity fetched", activity }))
            .catch((err) => {
                console.error(err.message);
                res.status(500).send({ status: "Error with getting activity", error: err.message });
            });
    });

    return router;
};
