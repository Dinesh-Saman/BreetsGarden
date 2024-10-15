const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    HallName: {
        type: String,
        required: true   
    },
    Date: {
        type: String,
        required: true
    },
    Duration: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true 
    },
    createdAt: { type: Date, default: Date.now } // New field
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
