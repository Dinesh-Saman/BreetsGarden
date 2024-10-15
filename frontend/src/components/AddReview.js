import React, { useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Flag from 'react-world-flags';
import './css_files/AddReview.css'; // Import the CSS file

import countryOptions from './countryOptions'; // This will be an array of country options with flag codes

const categoryOptions = [
    { value: 'food', label: 'Food' },
    { value: 'rooms', label: 'Rooms' },
    { value: 'events', label: 'Events' },
];

export default function AddReview() {
    const [name, setName] = useState('');
    const [country, setCountry] = useState(null); // Selected country
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');
    const [image, setImage] = useState(null); // Single image state
    const [category, setCategory] = useState(null); // New state for category
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation checks
        if (name.length < 2) {
            setError('Name must be at least 2 characters long');
            return;
        }

        if (!country) {
            setError('Please select a country');
            return;
        }

        if (title.length < 3) {
            setError('Title must be at least 5 characters long');
            return;
        }

        if (review.length < 10) {
            setError('Review must be at least 20 characters long');
            return;
        }

        if (image && image.size > 5242880) { // 5MB
            setError('Image size should not exceed 5MB');
            return;
        }

        const userId = localStorage.getItem('userId') || uuidv4();
        localStorage.setItem('userId', userId);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('country', country.value); 
        formData.append('rating', rating);
        formData.append('title', title);
        formData.append('review', review);
        formData.append('userId', userId);
        formData.append('category', category.value); 

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:8080/reviews/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Review added successfully");

            // Redirect to /reviews after successful submission
            navigate('/reviews');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while submitting the review');
        }
    };

    // Handle image selection
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            if (selectedFile.size <= 5242880) { // 5MB
                setImage(selectedFile); // Set single image
            } else {
                setError('Image size should not exceed 5MB');
            }
        } else {
            setError('Please upload a valid image');
        }
    };

    // Custom country option with flag rendering
    const customCountryOption = ({ value, label, flagCode }) => (
        <div className="country-option">
            <Flag code={flagCode} alt={label} style={{ width: 30, marginRight: 10 }} />
            <span>{label}</span>
        </div>
    );

    return (
        <div className="add-review-container">
            <h2 className="add-review-title">Add a Review</h2>
            {error && <p className="add-review-error">{error}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    {/* Searchable dropdown for country selection */}
                    <Select
                        className="country-select"
                        placeholder="Select a country"
                        value={country}
                        onChange={setCountry}
                        options={countryOptions}
                        getOptionLabel={(e) => (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Flag code={e.flagCode} alt={e.label} style={{ width: 30, marginRight: 10 }} />
                                {e.label}
                            </div>
                        )}
                        getOptionValue={(e) => e.value}
                    />
                </div>
                <div className="form-group">
                    <Select
                        className="category-select"
                        placeholder="Select a category"
                        value={category}
                        onChange={setCategory}
                        options={categoryOptions}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <textarea
                        className="form-control"
                        placeholder="Review"
                        rows="4"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={24}
                                onClick={() => setRating(star)}
                                fill={star <= rating ? "orange" : "none"}
                                stroke={star <= rating ? "orange" : "currentColor"}
                                className="star-icon"
                            />
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="form-control"
                        accept="image/*"
                    />
                </div>
                {image && (
                    <div className="image-preview-container">
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Selected"
                            className="image-preview"
                        />
                    </div>
                )}
                <button type="submit" className="submit-button">
                    Submit Review
                </button>
            </form>
        </div>
    );
}
