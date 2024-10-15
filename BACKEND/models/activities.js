const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActivitieSchema = new Schema({

    //Admin side

    activityName : {
        type : String,
        required: true
    },
    openingHrs: {
        type: String,
        required: true
    },
    closingHrs: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

})

const Activities = mongoose.model("Activities",ActivitieSchema,"outActivities");

module.exports = Activities;