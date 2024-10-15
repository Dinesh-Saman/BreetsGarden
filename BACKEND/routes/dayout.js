const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const express = require('express');

const app = express();
const PORT = 8080;

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

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Get mongoose connection
module.exports = (router, connection) => {
    const Packages = connection.model("Packages", new mongoose.Schema({
        title: { type: String, required: true },
        validity: { type: String, required: true },
        duration: { type: String, required: true },
        price: { type: String, required: true },
        packageType: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true } // Store image path or URL
    }));

    // CREATE - Fixed Route with Proper Multer Usage
    router.post("/create", upload.single('image'), (req, res) => {
        const { title, validity, duration, price, packageType, category } = req.body;
        const image = req.file ? req.file.path : "./uploads/"; // Store file path
        //const image = req.file ? `uploads/${req.file.filename}` : "";


        const newPackages = new Packages({
            title,
            validity,
            duration,
            price,
            packageType,
            category,
            image
        });

        newPackages.save()
            .then(() => res.status(201).json("Dayout-Package Created Successfully"))
            .catch((err) => {
                console.error(err);
                res.status(500).send({ status: "Error with creating data", error: err.message });
            });
    });
    // GET all packages
    router.route("/").get((req, res) => {
        Packages.find()
            .then(packages => res.json(packages))
            .catch((err) => {
                console.error(err);
                res.status(500).send({ status: "Error with fetching data", error: err.message });
            });
    });

    // UPDATE
    router.route("/update/:id").put(upload.single('image'), async (req, res) => {
        const packageId = req.params.id;
        const { title, validity, duration, price, packageType, category } = req.body;
        const image = req.file ? req.file.path : req.body.image; // retain existing image if not uploaded

        const updatePackages = {
            title,
            validity,
            duration,
            price,
            packageType,
            category,
            image
        };

        await Packages.findByIdAndUpdate(packageId, updatePackages)
            .then(() => res.status(200).send({ status: "Dayout-Package Updated Successfully" }))
            .catch((err) => {
                console.error(err);
                res.status(500).send({ status: "Error with updating data", error: err.message });
            });
    });

    // DELETE
    router.route("/delete/:id").delete(async (req, res) => {
        const packageId = req.params.id;

        await Packages.findByIdAndDelete(packageId)
            .then(() => res.status(200).send({ status: "Dayout-Package deleted Successfully" }))
            .catch((err) => {
                console.error(err.message);
                res.status(500).send({ status: "Error with delete package", error: err.message });
            });
    });

    // GET a single package by ID
    router.route("/get/:id").get(async (req, res) => {
        const packageId = req.params.id;

        await Packages.findById(packageId)
            .then((packageData) => res.status(200).send({ status: "Package fetched", Packages: packageData }))
            .catch((err) => {
                console.error(err.message);
                res.status(500).send({ status: "Error with get package", error: err.message });
            });
    });

    return router;
};
