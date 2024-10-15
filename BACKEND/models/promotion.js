const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const promotionSchema = new Schema({
    description: {
        type: String,
        required: true   
    },
    validUntil: {
        type: String,
        required: true
    }
});

const Promotion = mongoose.model("Promotion", promotionSchema);

module.exports = Promotion;
