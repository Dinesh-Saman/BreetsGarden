const router = require("express").Router();
let Booking = require("../models/booking");

// Add a booking
router.route("/add").post((req, res) => {
    const HallName = req.body.HallName;
    const Date = req.body.Date;
    const Duration = Number(req.body.Duration);
    const Email = req.body.Email;

    const newBooking = new Booking({
        HallName,
        Date,
        Duration,
        Email
    });

    newBooking.save()
        .then(() => {
            res.json("Booking Added")
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with adding booking", error: err.message});
        });
});

// Get all bookings
router.route("/").get((req, res) => {
    Booking.find()
        .then((bookings) => {
            res.json(bookings);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with fetching bookings", error: err.message});
        });
});

// Get a single booking by ID
router.route("/get/:id").get(async (req, res) => {
    let Id = req.params.id;
    const booking = await Booking.findById(Id)
        .then((booking) => {
            res.status(200).send({status: "Booking fetched", booking})
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error in getting booking data", error: err.message});
        });
});

// Update a booking
router.route("/update/:id").put(async (req, res) => {
    let Id = req.params.id;
    const { HallName, Date, Duration,Email} = req.body;

    const updateBooking = {
        HallName,
        Date,
        Duration,
        Email
    }

    const update = await Booking.findByIdAndUpdate(Id, updateBooking)
        .then(() => {
            res.status(200).send({status: "Booking updated"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with updating booking", error: err.message});
        });
});

// Delete a booking
router.route("/delete/:id").delete(async (req, res) => {
    let Id = req.params.id;

    await Booking.findByIdAndDelete(Id)
        .then(() => {
            res.status(200).send({status: "Booking deleted"});
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with deleting booking", error: err.message});
        });
});

module.exports = router;
