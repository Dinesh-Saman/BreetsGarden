const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const packageSchema = new Schema({

    //Admin side

        title:{
            type: String,
            required: true
        },
        validity: {
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
        packageType: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }

})

const Packages = mongoose.model("Packages",packageSchema,"dayoutPackages");

module.exports = Packages;