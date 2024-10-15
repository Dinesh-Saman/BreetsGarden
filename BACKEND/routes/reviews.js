const router = require('express').Router();
const Review = require('../models/review');
const multer = require('multer');
const path = require('path');


// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Not an image! Please upload an image.'), false);
        }
    },
});

// Add a review with an image upload
router.post("/add", upload.single('image'), (req, res) => {
    const { name, country, rating, title, review, userId, category } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Store the relative image path

    if (!category) {
        return res.status(400).json({ message: "Category is required" });
    }

    const newReview = new Review({
        name,
        country,
        rating: Number(rating),
        title,
        review,
        userId,
        category, // Add the category
        imagePaths: imagePath, // Store image path
        isFeatured: false, // Default isFeatured to false
    });

    newReview.save()
        .then((savedReview) => {
            res.json(savedReview);
        })
        .catch((err) => {
            res.status(500).json({ message: 'Error saving review', error: err.message });
        });
});

// Get all reviews
router.route("/").get((req, res) => {
    Review.find()
        .then((reviews) => {
            res.json(reviews);
        })
        .catch((err) => {
            res.status(400).json('Error: ' + err);
        });
});

// Get a specific review
router.route("/get/:id").get(async (req, res) => {
    const reviewId = req.params.id;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ status: "Review not found" });
        }
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ status: "Error with fetching data", error: err.message });
    }
});

// Update a review with image upload
router.route("/update/:id").put(upload.single('image'), async (req, res) => {
    const reviewId = req.params.id;
    const { name, country, rating, title, review, userId, category } = req.body;

    if (!category) {
        return res.status(400).json({ message: "Category is required" });
    }

    const updateReview = {
        name,
        country,
        rating: Number(rating),
        title,
        review,
        userId,
        category, // Update the category
    };

    // If a new image is uploaded, replace the current image path
    if (req.file) {
        updateReview.imagePaths = `/uploads/${req.file.filename}`;
    }

    try {
        const updatedReview = await Review.findByIdAndUpdate(reviewId, updateReview, { new: true });
        if (!updatedReview) {
            return res.status(404).json({ status: "Review not found" });
        }
        res.status(200).json(updatedReview);
    } catch (err) {
        res.status(500).json({ status: "Error with updating data", error: err.message });
    }
});

// Delete a review
router.route("/delete/:id").delete(async (req, res) => {
    const reviewId = req.params.id;

    try {
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ status: "Review not found" });
        }
        res.status(200).json({ status: "Review deleted", deletedReview });
    } catch (err) {
        res.status(500).json({ status: "Error with deleting data", error: err.message });
    }
});

// Moderation: Approve, Reject, Flag Reviews
router.put('/approve/:id', async (req, res) => {
    const reviewId = req.params.id;
    try {
        const review = await Review.findByIdAndUpdate(reviewId, { status: 'approved', moderationAction: 'approved' }, { new: true });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Error approving review', error: err.message });
    }
});

router.put('/reject/:id', async (req, res) => {
    const reviewId = req.params.id;
    try {
        const review = await Review.findByIdAndUpdate(reviewId, { status: 'rejected', moderationAction: 'rejected' }, { new: true });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Error rejecting review', error: err.message });
    }
});

router.put('/flag/:id', async (req, res) => {
    const reviewId = req.params.id;
    try {
        const review = await Review.findByIdAndUpdate(reviewId, { status: 'flagged', moderationAction: 'flagged' }, { new: true });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Error flagging review', error: err.message });
    }
});

// Analytics: Get average rating, keyword analysis, top countries
router.get('/analytics', async (req, res) => {
    try {
        const reviews = await Review.find(); // Fetch all reviews
        const totalReviews = reviews.length;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = (totalRating / totalReviews).toFixed(2); // Calculate average rating

        const keywordData = analyzeKeywords(reviews); // Perform keyword analysis
        const countryData = analyzeTopCountries(reviews); // Perform country analysis

        res.status(200).json({
            totalReviews,
            averageRating,
            keywordData,
            countryData,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching analytics data', error: err.message });
    }
});

// Helper function for keyword analysis
const analyzeKeywords = (reviews) => {
    const keywordCount = {};
    reviews.forEach((review) => {
        const words = review.review.split(/\s+/); // Split by spaces
        words.forEach((word) => {
            word = word.toLowerCase(); // Normalize to lowercase
            if (keywordCount[word]) {
                keywordCount[word] += 1;
            } else {
                keywordCount[word] = 1;
            }
        });
    });
    return keywordCount;
};

// Helper function for top countries analysis
const analyzeTopCountries = (reviews) => {
    const countryCount = {};
    reviews.forEach((review) => {
        const country = review.country;
        if (countryCount[country]) {
            countryCount[country] += 1;
        } else {
            countryCount[country] = 1;
        }
    });
    return countryCount;
};

module.exports = router;
