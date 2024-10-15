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

module.exports = (router, connection) => {
    const Spa = connection.model("Spa", new mongoose.Schema({
        serviceName: { type: String, required: true },
        duration: { type: String, required: true },
        price: { type: String, required: true },
        serviceType: { type: String, required: true },
        availability: { type: String, required: true },
        image: { type: String, required: true } // Store image path or URL
    }));

    // CREATE
    router.post("/sCreate", upload.single('image'), (req, res) => {
        const { serviceName, duration, price, serviceType, availability } = req.body;
        const image = req.file ? req.file.path : "./uploads/"; // Store file path

        const newSpa = new Spa({
            serviceName,
            duration,
            price,
            serviceType,
            availability,
            image
        });

        newSpa.save()
            .then(() => res.status(201).json("Spa service Created Successfully"))
            .catch((err) => {
                console.error(err);
                res.status(500).send({ status: "Error with creating data", error: err.message });
            });
    });

    // GET all spa services
    router.route("/").get((req, res) => {
        Spa.find()
            .then(spas => res.json(spas))
            .catch((err) => {
                console.error(err);
                res.status(500).send({ status: "Error with fetching data", error: err.message });
            });
    });

    // UPDATE
    router.route("/Supdate/:id").put(upload.single('image'), async (req, res) => {
        const spaId = req.params.id;
        const { serviceName, duration, price, serviceType, availability } = req.body;
        const image = req.file ? req.file.path : req.body.image; // retain existing image if not uploaded

        const updateSpa = {
            serviceName,
            duration,
            price,
            serviceType,
            availability,
            image
        };

        await Spa.findByIdAndUpdate(spaId, updateSpa)
            .then(() => res.status(200).send({ status: "Spa service Updated Successfully" }))
            .catch((err) => {
                console.error(err);
                res.status(500).send({ status: "Error with updating data", error: err.message });
            });
    });

    // DELETE
    router.route("/delete/:id").delete(async (req, res) => {
        const spaId = req.params.id;

        await Spa.findByIdAndDelete(spaId)
            .then(() => res.status(200).send({ status: "Spa service deleted Successfully" }))
            .catch((err) => {
                console.error(err.message);
                res.status(500).send({ status: "Error with delete package", error: err.message });
            });
    });

    // GET a single spa service by ID
    router.route("/get/:id").get(async (req, res) => {
        const spaId = req.params.id;

        await Spa.findById(spaId)
            .then((spa) => res.status(200).send({ status: "Spa service fetched", Spa: spa }))
            .catch((err) => {
                console.error(err.message);
                res.status(500).send({ status: "Error with get package", error: err.message });
            });
    });

    return router;
};
