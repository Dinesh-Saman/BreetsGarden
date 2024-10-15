const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    //Customer side

    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    packageType : {
        type : String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }

})

const Bookings = mongoose.model("Bookings",bookingSchema, "bookDayOutings");

module.exports = Bookings;