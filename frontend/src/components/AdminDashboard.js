import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css_files/AdminDashboard.css'; // Import the CSS file

export default function AdminDashboard() {
    const [reviews, setReviews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('newestFirst');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await axios.get('http://localhost:8080/reviews');
            setReviews(res.data);
        } catch (err) {
            alert("Error fetching reviews: " + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await axios.delete(`http://localhost:8080/reviews/delete/${id}`);
                fetchReviews();
            } catch (err) {
                alert("Error deleting review: " + err.message);
            }
        }
    };

    const handleApprove = async (id) => {
        console.log(`Approving review with ID: ${id}`);
        try {
            const response = await axios.put(`http://localhost:8080/reviews/approve/${id}`);
            console.log("API Response:", response);
            fetchReviews();
        } catch (err) {
            console.error("Error approving review:", err.response || err);
            alert("Error approving review: " + (err.response ? err.response.data.message : err.message));
        }
    };

    const handleReject = async (id) => {
        console.log(`Rejecting review with ID: ${id}`);
        try {
            await axios.put(`http://localhost:8080/reviews/reject/${id}`);
            fetchReviews();
        } catch (err) {
            console.error("Error rejecting review:", err.response || err);
            alert("Error rejecting review: " + (err.response ? err.response.data.message : err.message));
        }
    };

    const handleFlag = async (id) => {
        console.log(`Flagging review with ID: ${id}`);
        try {
            await axios.put(`http://localhost:8080/reviews/flag/${id}`);
            fetchReviews();
        } catch (err) {
            console.error("Error flagging review:", err.response || err);
            alert("Error flagging review: " + (err.response ? err.response.data.message : err.message));
        }
    };

    const handleGoToAnalytics = () => {
        window.location.href = 'http://localhost:3000/admin-analytics'; // Navigate to the analytics page
    };

    const handleGoToReport = () => {
        window.location.href = 'http://localhost:3000/review-report'; // Navigate to the review report generation page
    };

    // Filter and sort reviews based on the search query and sort order
    const filteredAndSortedReviews = reviews.filter((review) => 
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        review.review.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
        if (sortOrder === 'newestFirst') {
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

    return (
        <div className="admin-dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Review Management Dashboard</h1>
                {/* New Go to Analytics and Generate Report Button */}
                <div className="header-buttons">
                    <button className="analytics-button" onClick={handleGoToAnalytics}>
                        Go to Analytics
                    </button>
                    <button className="report-button" onClick={handleGoToReport}>
                        Generate Report
                    </button>
                </div>
            </div>

            <div className="search-filter-section">
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
                    className="filter-select"
                >
                    <option value="newestFirst">Newest first</option>
                    <option value="oldestFirst">Oldest first</option>
                    <option value="highestScores">Highest scores</option>
                    <option value="lowestScores">Lowest scores</option>
                </select>
            </div>

            <div className="reviews-grid">
                {filteredAndSortedReviews.map((review) => (
                    <div key={review._id} className="review-card">
                        <h2 className="review-title">{review.title}</h2>
                        <p>{review.review}</p>
                        <p>Rating: {review.rating}</p>
                        <p>Status: {review.status}</p> {/* Display status */}

                        <div className="action-buttons">
                            <button className="approve-button" onClick={() => handleApprove(review._id)}>Approve</button>
                            <button className="reject-button" onClick={() => handleReject(review._id)}>Reject</button>
                            <button className="flag-button" onClick={() => handleFlag(review._id)}>Flag</button>
                            <button className="delete-button" onClick={() => handleDelete(review._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
