import React from "react";
import { Link } from 'react-router-dom';
import logo from '../images/breetalogo.png';
import "./css_files/Header.css";

function Header() {
    return (
        <nav style={{ padding: '16px', backgroundColor: '#2E4857' }}> {/* Set background color */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                {/* Adjust the logo size and centering */}
                <img src={logo} alt="Hotel Breeta's Garden" style={{ height: '64px', width: 'auto', objectFit: 'contain' }} /> {/* Logo */}

                <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexGrow: 1 }}> {/* Centering navigation items */}
                    <a href="/" style={{ color: '#FFFFFF', fontSize: '18px', textDecoration: 'none', transition: 'all 0.3s ease', transform: 'scale(1)' }}
                        onMouseOver={(e) => {
                            e.target.style.color = '#E5E7EB'; 
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.color = '#FFFFFF'; 
                            e.target.style.transform = 'scale(1)';
                        }}>Home</a>
                    <a href="/bookings" style={{ color: '#FFFFFF', fontSize: '18px', textDecoration: 'none', transition: 'all 0.3s ease', transform: 'scale(1)' }}
                        onMouseOver={(e) => {
                            e.target.style.color = '#E5E7EB'; 
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.color = '#FFFFFF'; 
                            e.target.style.transform = 'scale(1)';
                        }}>Bookings</a>
                    <a href="/reviews" style={{ color: '#FFFFFF', fontSize: '18px', textDecoration: 'none', transition: 'all 0.3s ease', transform: 'scale(1)' }}
                        onMouseOver={(e) => {
                            e.target.style.color = '#E5E7EB'; 
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.color = '#FFFFFF'; 
                            e.target.style.transform = 'scale(1)';
                        }}>Reviews</a>
                    <a href="/gallery" style={{ color: '#FFFFFF', fontSize: '18px', textDecoration: 'none', transition: 'all 0.3s ease', transform: 'scale(1)' }}
                        onMouseOver={(e) => {
                            e.target.style.color = '#E5E7EB'; 
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.color = '#FFFFFF'; 
                            e.target.style.transform = 'scale(1)';
                        }}>Gallery</a>
                    <a href="/services" style={{ color: '#FFFFFF', fontSize: '18px', textDecoration: 'none', transition: 'all 0.3s ease', transform: 'scale(1)' }}
                        onMouseOver={(e) => {
                            e.target.style.color = '#E5E7EB'; 
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.color = '#FFFFFF'; 
                            e.target.style.transform = 'scale(1)';
                        }}>Services</a>
                    <a href="/transport" style={{ color: '#FFFFFF', fontSize: '18px', textDecoration: 'none', transition: 'all 0.3s ease', transform: 'scale(1)' }}
                        onMouseOver={(e) => {
                            e.target.style.color = '#E5E7EB'; 
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.color = '#FFFFFF'; 
                            e.target.style.transform = 'scale(1)';
                        }}>Transport</a>
                </div>

                {/* Add a Login button to the right side */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}> 
                    <a href="/login" style={{ color: '#FFFFFF', fontSize: '18px', textDecoration: 'none', transition: 'all 0.3s ease', transform: 'scale(1)' }}
                        onMouseOver={(e) => {
                            e.target.style.color = '#E5E7EB'; 
                            e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.color = '#FFFFFF'; 
                            e.target.style.transform = 'scale(1)';
                        }}>Login</a>
                </div>
            </div>
        </nav>
    );
}

export default Header;
