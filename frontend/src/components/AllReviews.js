import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './css_files/AllReviews.css'; // Importing the new CSS file
import CusHeader from "./CusHeader";

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('mostRelevant');
  const currentUserId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    function getReviews() {
      axios.get('http://localhost:8080/reviews/')
        .then((res) => {
          const reviewsData = res.data;
          setReviews(reviewsData);

          // Calculate total reviews and average score
          const total = reviewsData.length;
          const average = (reviewsData.reduce((acc, review) => acc + review.rating, 0) / total).toFixed(1);
          
          setTotalReviews(total);
          setAverageRating(average);
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
          });
        });
    }

    getReviews();
  }, []);

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this review?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/reviews/delete/${id}`);
      setReviews(reviews.filter(review => review._id !== id));
      Swal.fire(
        'Deleted!',
        'Your review has been deleted.',
        'success'
      );
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      });
    }
  };

  const filteredReviews = reviews.filter((review) =>
    review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.review.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.category.toLowerCase().includes(searchQuery.toLowerCase()) // New filtering by category
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortOrder === 'mostRelevant') {
      return 0; // Add your own logic for most relevant sorting
    } else if (sortOrder === 'newestFirst') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOrder === 'oldestFirst') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortOrder === 'highestScores') {
      return b.rating - a.rating;
    } else if (sortOrder === 'lowestScores') {
      return a.rating - b.rating;
    }
    return 0;
  });

  const getRatingLabel = (averageRating) => {
    if (averageRating >= 5) return "Excellent";
    if (averageRating >= 4) return "Very Good";
    if (averageRating >= 3) return "Good";
    if (averageRating >= 2) return "Poor";

    return "Average";
  };

  const headerStyle = {
    width: '100%',
};

  return (
    <div>
      <div style={headerStyle}>
                <CusHeader />
            </div>
    <div className="reviews-container">
      <h1 className="reviews-title">Reviews</h1>
      
      <div className="reviews-summary">
        <div className="average-rating-box">
          <span className="average-rating">{averageRating}</span>
        </div>
        <div className="rating-summary">
          <span className="rating-label">{getRatingLabel(averageRating)}</span> · {totalReviews} reviews
        </div>
      </div>
      
      <div className="reviews-controls">
        <input
          type="text"
          placeholder="Search Reviews"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-select"
        >
          <option value="mostRelevant">Most relevant</option>
          <option value="newestFirst">Newest first</option>
          <option value="oldestFirst">Oldest first</option>
          <option value="highestScores">Highest scores</option>
          <option value="lowestScores">Lowest scores</option>
        </select>
      </div>

      <div className="reviews-grid">
        {sortedReviews.map((review) => (
          <div key={review._id} className="review-card">
            <div className="review-header">
              <span className="review-name">{review.name}</span>
              <span className="review-country">from {review.country}</span>
              <span className="review-category">{review.category}</span> {}
            </div>
            {review.imagePaths && (
              <img 
                src={`http://localhost:8070${review.imagePaths}`} // Use the full path from backend
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
            <h2 className="review-title">{review.title}</h2>
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
                  onClick={() => confirmDelete(review._id)} 
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Link to="/add" className="add-review-button">
        Add a Review
      </Link>
    </div>
    </div>
  );
}
