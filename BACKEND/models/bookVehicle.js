import mongoose from "mongoose";

const bookVehicleSchema = new mongoose.Schema({
    cusName: {
        type: String,
        required: true
    },
    
    vehicleNo: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    noOfPeople: {
        type: String
    },

    noOfDates: {
        type: Number,  // Change to Number since it's used for calculation
        required: true
    },

    bookingDate: {
        type: Date,
        required: true
    },

    price: {
        type: Number,
        required: true  // The price per day for the vehicle/item
    },

    totalAmount: {
        type: Number,  // The total cost (noOfDates * price)
        required: true
    },

    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items',  // Link to the Items collection
        required: true
    }
}, {
    timestamps: true  // createdAt, updatedAt
});

const BookVehicle = mongoose.model('BookVehicle', bookVehicleSchema);

export default BookVehicle;
