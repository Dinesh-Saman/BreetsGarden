const mongoose = require('mongoose');

const schema = mongoose.Schema;

const bookRoomsSchema = new schema({
    cusName: {
        type: String,
        required: true
    },
    roomId: {
        type: String
    },
    roomName: {
        type: String,
        default: false
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    noOfPersons: {
        type: String
    },
    checkin: {
        type: String,
    },
    checkout: {
        type: String,
    }
});

const bookRoom = mongoose.model("BookRoom", bookRoomsSchema);

module.exports = bookRoom;
