import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Importing the autoTable plugin
import './css_files/ReviewReport.css'; // Custom CSS for styling

export default function ReviewReport() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await axios.get('http://localhost:8080/reviews/');
            setReviews(res.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching reviews');
            setLoading(false);
        }
    };

    // Function to generate PDF with table
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Review Report', 10, 10);

        // Prepare the table headers
        const columns = ['Name', 'Country', 'Rating', 'Title', 'Review'];

        // Prepare the table rows from the review data
        const rows = reviews.map(review => [
            review.name,
            review.country,
            review.rating.toString(),
            review.title,
            review.review
        ]);

        // Generate the table in the PDF using autoTable
        doc.autoTable({
            head: [columns],
            body: rows,
            startY: 20, // Start position below the title
            styles: { fontSize: 10 }, // Adjust font size if needed
        });

        // Save the PDF
        doc.save('ReviewReport.pdf');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="review-report-container">
            <h1>Generate Review Report</h1>
            <button onClick={generatePDF} className="generate-pdf-btn">Download PDF</button>
            <div className="review-list">
                {reviews.map((review, index) => (
                    <div key={review._id} className="review-card">
                        <h3>Review {index + 1}</h3>
                        <p><strong>Name:</strong> {review.name}</p>
                        <p><strong>Country:</strong> {review.country}</p>
                        <p><strong>Rating:</strong> {review.rating}</p>
                        <p><strong>Title:</strong> {review.title}</p>
                        <p><strong>Review:</strong> {review.review}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
