import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import Select from 'react-select';
import Flag from 'react-world-flags';
import './css_files/UpdateReview.css'; // Import the CSS file

// Import country options with flag codes and names
import countryOptions from './countryOptions'; // Ensure this file contains the country data

export default function UpdateReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem('userId');

    const [name, setName] = useState('');
    const [country, setCountry] = useState(null); // Changed to null for Select component
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [review, setReview] = useState('');
    const [image, setImage] = useState(null);
    const [currentImagePath, setCurrentImagePath] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/reviews/get/${id}`)
            .then((res) => {
                if (res.data.userId !== currentUserId) {
                    setError("You don't have permission to edit this review");
                    return;
                }
                setName(res.data.name);
                setCountry(countryOptions.find(option => option.value === res.data.country)); // Set country from the list
                setRating(res.data.rating);
                setTitle(res.data.title);
                setReview(res.data.review);
                setCurrentImagePath(res.data.imagePath);
                setUserId(res.data.userId);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [id, currentUserId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userId !== currentUserId) {
            setError("You don't have permission to update this review");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('country', country.value); // Get the selected country name
        formData.append('rating', rating);
        formData.append('title', title);
        formData.append('review', review);
        formData.append('userId', userId);
        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.put(`http://localhost:8080/reviews/Rupdate/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Review updated successfully");
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while updating the review");
        }
    };

    // Custom country option with flag rendering
    const customCountryOption = ({ value, label, flagCode }) => (
        <div className="country-option">
            <Flag code={flagCode} alt={label} style={{ width: 30, marginRight: 10 }} />
            <span>{label}</span>
        </div>
    );

    if (error) {
        return (
            <div className="update-review-container">
                <p className="error-message">{error}</p>
                <button onClick={() => navigate('/')} className="go-back-button">
                    Go Back to All Reviews
                </button>
            </div>
        );
    }

    return (
        <div className="update-review-container">
            <h2 className="update-review-title">Update Review</h2>
            <form onSubmit={handleSubmit}>
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
                    {currentImagePath && (
                        <img 
                            src={`http://localhost:8080/uploads/${currentImagePath}`} 
                            alt="Current" 
                            className="image-preview"
                        />
                    )}
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="form-control"
                    />
                </div>
                <button
                    type="submit"
                    className="submit-button"
                >
                    Update Review
                </button>
            </form>
        </div>
    );
}
