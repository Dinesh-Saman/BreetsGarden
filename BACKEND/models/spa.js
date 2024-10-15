const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const spaSchema = new Schema({

    //Admin side

    serviceName: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

})

const Spa = mongoose.model("Spa",spaSchema,"spaServices");

module.exports = Spa;