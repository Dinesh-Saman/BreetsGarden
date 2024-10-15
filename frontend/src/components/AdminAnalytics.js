import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import './css_files/AdminAnalytics.css'; // Add your custom CSS styling here

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function AdminAnalytics() {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [countryRatingData, setCountryRatingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await axios.get('http://localhost:8080/reviews/analytics');
            setAnalyticsData(res.data);
            setCountryRatingData(res.data.countryRating); // Assuming the backend sends this
            setLoading(false);
        } catch (err) {
            setError('Error fetching analytics data');
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const { totalReviews, averageRating, keywordData } = analyticsData;

    // Prepare data for keyword analysis chart
    const keywordLabels = Object.keys(keywordData).slice(0, 10); // Top 10 keywords
    const keywordCounts = keywordLabels.map((key) => keywordData[key]);

    const keywordChartData = {
        labels: keywordLabels,
        datasets: [
            {
                label: 'Keyword Frequency',
                data: keywordCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Prepare data for guest satisfaction score (average rating)
    const satisfactionChartData = {
        labels: ['Average Rating'],
        datasets: [
            {
                label: 'Satisfaction Score',
                data: [averageRating],
                backgroundColor: ['rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(153, 102, 255, 1)'],
                borderWidth: 1,
            },
        ],
    };

    // Chart options to disable aspect ratio maintenance
    const satisfactionChartOptions = {
        maintainAspectRatio: false,
    };

    // Prepare data for country and rating analysis
    const countryLabels = Object.keys(countryRatingData || {});
    const countryRatings = countryLabels.map((country) => countryRatingData[country]);

    const countryChartData = {
        labels: countryLabels,
        datasets: [
            {
                label: 'Average Rating by Country',
                data: countryRatings,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="admin-analytics-container">
            <h1>Review Analytics Dashboard</h1>

            {/* Total Reviews and Average Rating */}
            <div className="stats-container">
                <p>Total Reviews: {totalReviews}</p>
                <p>Average Rating: {averageRating}</p>
            </div>

            {/* Satisfaction Score (Average Rating) */}
            <div className="chart-container">
                <h3>Guest Satisfaction Score</h3>
                <div className="pie-chart-container">
                    <Pie data={satisfactionChartData} options={satisfactionChartOptions} />
                </div>
            </div>

            {/* Keyword Frequency Bar Chart */}
            <div className="chart-container">
                <h3>Top 10 Keywords in Reviews</h3>
                <Bar data={keywordChartData} />
            </div>

            {/* Country and Rating Analysis */}
            <div className="chart-container">
                <h3>Average Rating by Country</h3>
                <Bar data={countryChartData} />
            </div>
        </div>
    );
}
