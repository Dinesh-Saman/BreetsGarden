import React from 'react';
import { Link } from 'react-router-dom';
import HomepageReviewSection from './HomePageReviewSection';
import heroImage from './css_files/images/background.jpeg'; // Your image
import './css_files/HomePage.css'; // Import the CSS file
import CusHeader from "./CusHeader";

const headerStyle = {
    width: '100%',
};

function HomePage() {
    return (
        <div>
        <div style={headerStyle}>
                  <CusHeader />
              </div>
        <div className="homepage-container">
            {/* Hero Section */}
            <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>Welcome to Hotel Breeta's Garden</h1>
                        <p>Luxury and comfort await you.</p>
                        <Link to="/bookings" className="booking-button">
                            Book Your Stay
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="about-content">
                    <h2>About Hotel Breeta's Garden</h2>
                    <p>
                        At Hotel Breeta's Garden, we offer world-class accommodations combined with exceptional service to ensure
                        your stay is unforgettable. Whether you're here for business or leisure, our amenities and team are here to provide
                        an extraordinary experience.
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section">
                <div className="services-container">
                    <h2 className="services-title">Our Services</h2>
                    <div className="services-grid">
                        <div className="service-card">
                            <h3>Luxury Rooms</h3>
                            <p>Experience ultimate comfort with our spacious and well-equipped rooms.</p>
                        </div>
                        <div className="service-card">
                            <h3>Fine Dining</h3>
                            <p>Savor gourmet meals prepared by world-class chefs in a stunning setting.</p>
                        </div>
                        <div className="service-card">
                            <h3>Exclusive Spa</h3>
                            <p>Relax and rejuvenate with our exclusive spa treatments tailored to your needs.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Review Section */}
            <section className="review-section">
                <div className="review-content">
                    <h2 className="review-title">Guest Reviews</h2>
                    <div className="reviews-grid">
                        <HomepageReviewSection /> {/* This component renders the latest reviews */}
                    </div>
                </div>
            </section>
        </div>
        </div>
    );
}

export default HomePage;
