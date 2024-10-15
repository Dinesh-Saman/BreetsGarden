const router = require("express").Router();
let Promotion = require("../models/promotion");

// Add a promotion
router.route("/add").post((req, res) => {
    const description = req.body.description;
    const validUntil = req.body.validUntil;

    const newPromotion = new Promotion({
        description,
        validUntil
    });

    newPromotion.save()
        .then(() => {
            res.json("Promotion Added")
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with adding promotion", error: err.message});
        });
});

// Get all promotions
router.route("/").get((req, res) => {
    Promotion.find()
        .then((promotions) => {
            res.json(promotions);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with fetching promotions", error: err.message});
        });
});

// Get a single promotion by ID
router.route("/get/:id").get(async (req, res) => {
    let Id = req.params.id;
    const promotion = await Promotion.findById(Id)
        .then((promotion) => {
            res.status(200).send({status: "Promotion fetched", promotion})
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error in getting promotion data", error: err.message});
        });
});

// Update a promotion
router.route("/update/:id").put(async (req, res) => {
    let Id = req.params.id;
    const { description, validUntil } = req.body;

    const updatePromotion = {
        description,
        validUntil
    }

    const update = await Promotion.findByIdAndUpdate(Id, updatePromotion)
        .then(() => {
            res.status(200).send({status: "Promotion updated"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with updating promotion", error: err.message});
        });
});

// Delete a promotion
router.route("/delete/:id").delete(async (req, res) => {
    let Id = req.params.id;

    await Promotion.findByIdAndDelete(Id)
        .then(() => {
            res.status(200).send({status: "Promotion deleted"});
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with deleting promotion", error: err.message});
        });
});

module.exports = router;
