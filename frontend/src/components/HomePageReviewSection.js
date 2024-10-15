import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import './css_files/HomePageReviewSection.css'; // Import the plain CSS

export default function HomePageReviewSection() {
  const [reviews, setReviews] = useState([]);
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    function getReviews() {
      axios.get('http://localhost:8080/reviews/')
        .then((res) => {
          setReviews(res.data.slice(0, 9)); // Show the first 9 reviews
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getReviews();
  }, []);

  const handleEdit = (id) => {
    window.location.href = `/update/${id}`;
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`http://localhost:8080/reviews/delete/${id}`);
        setReviews(reviews.filter(review => review._id !== id));
        alert('Review deleted successfully');
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="review-section-container">
      <h2 className="review-section-title">Latest Reviews</h2>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <div key={review._id} className="review-card">
            <div className="review-header">
              <span className="review-name">{review.name}</span>
              <span className="review-country">from {review.country}</span>
            </div>
            {review.imagePath && (
              <img 
                src={`http://localhost:8080/uploads/${review.imagePath}`}
                alt="Review"
                className="review-image"
              />
            )}
            <div className="review-stars">
              {[...Array(review.rating)].map((_, index) => (
                <Star
                  key={index}
                  size={24}
                  fill="orange"
                  stroke="orange"
                />
              ))}
            </div>
            <h3 className="review-title">{review.title}</h3>
            <p className="review-text">{review.review}</p>

            {currentUserId === review.userId && (
              <div className="review-actions">
                <button 
                  onClick={() => handleEdit(review._id)} 
                  className="edit-button"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(review._id)} 
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="add-review-container">
        <Link to="/add" className="add-review-button">
          Add a Review
        </Link>
      </div>
    </div>
  );
}
