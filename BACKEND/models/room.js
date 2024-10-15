const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    _id: { type: String, required: true }, // Explicitly set _id as a string
    roomName: { type: String, required: true },
    noOfPersons: { type: String, required: true },  // Keep as String
    noOfBeds: { type: String, required: true },     // Keep as String
    airCondition: { type: String, required: true },
    isSmokingAllowed: { type: String, required: true },
    board: {type: String, required: true },
    price: { type: Number, required: true },
    roomImage: { type: String, required: true }
});

// Export the Room model
module.exports = mongoose.model('Room', roomSchema);