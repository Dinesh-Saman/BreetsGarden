const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    rating: { type: Number, required: true },
    title: { type: String, required: true },
    review: { type: String, required: true },
    userId: { type: String, required: true },
    imagePaths: [{ type: String, required: false }], 
    isFeatured: { type: Boolean, default: false },  
    category: { type: String, required: true },      
}, {
    timestamps: true // Correctly placed as an option, not a field
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
