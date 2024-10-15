import React from "react";
import logo from './css_files/images/breetalogo.png';

function CommonHeader() {
    return (
        <nav style={{
            padding: '16px', 
            backgroundColor: '#2E4857', 
            position: 'fixed', /* Fix the header at the top */
            top: 0, /* Align with the top of the screen */
            left: 0, /* Align with the left side of the screen */
            width: '100vw', /* Ensure it spans the entire viewport width */
            zIndex: 1000, /* Ensure it's above other elements */
            margin: 0,
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                maxWidth: '1200px', 
                margin: '0 auto' 
            }}>
                {/* Logo Section */}
                <img src={logo} alt="Hotel Breeta's Garden" style={{ height: '64px', width: 'auto', objectFit: 'contain' }} />

                {/* Centering Navigation Items */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexGrow: 1 }}>
                    <a href="/" style={navLinkStyle}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}>Home</a>
                    <a href="/register" style={navLinkStyle}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}>Register</a>
                </div>

                {/* Login Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <a href="/logins" style={navLinkStyle}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}>Login</a>
                </div>
            </div>
        </nav>
    );
}

const navLinkStyle = {
    color: '#FFFFFF', 
    fontSize: '18px', 
    textDecoration: 'none', 
    transition: 'all 0.3s ease', 
    transform: 'scale(1)',
};

const handleMouseOver = (e) => {
    e.target.style.color = '#E5E7EB'; 
    e.target.style.transform = 'scale(1.1)';
};

const handleMouseOut = (e) => {
    e.target.style.color = '#FFFFFF'; 
    e.target.style.transform = 'scale(1)';
};

export default CommonHeader;
