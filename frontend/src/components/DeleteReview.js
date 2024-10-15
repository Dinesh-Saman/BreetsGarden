import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function DeleteReview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem('userId');

    const [review, setReview] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/reviews/get/${id}`)
            .then((res) => {
                if (res.data.userId !== currentUserId) {
                    setError("You don't have permission to delete this review");
                    return;
                }
                setReview(res.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [id, currentUserId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/reviews/delete/${id}`);
            alert('Review deleted successfully');
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while deleting the review");
        }
    };

    if (error) {
        return (
            <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
                <p className="text-red-500">{error}</p>
                <button onClick={() => navigate('/')} className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Go Back to All Reviews
                </button>
            </div>
        );
    }

    if (!review) {
        return <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">Loading...</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Delete Review</h2>
            <div className="mb-4">
                <p><strong>Name:</strong> {review.name}</p>
                <p><strong>Country:</strong> {review.country}</p>
                <p><strong>Title:</strong> {review.title}</p>
                <p><strong>Review:</strong> {review.review}</p>
                <div className="flex items-center my-2">
                    <strong className="mr-2">Rating:</strong>
                    {[...Array(review.rating)].map((_, index) => (
                        <Star
                            key={index}
                            size={20}
                            fill="orange"
                            stroke="orange"
                        />
                    ))}
                </div>
                {review.imagePath && (
                    <img 
                        src={`http://localhost:8080/uploads/${review.imagePath}`} 
                        alt="Review" 
                        className="w-full mt-2 rounded"
                    />
                )}
            </div>
            <p className="text-red-600 font-bold mb-4">Are you sure you want to delete this review?</p>
            <div className="flex justify-between">
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                    Confirm Delete
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}