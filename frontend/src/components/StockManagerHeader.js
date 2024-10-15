import React from 'react';
import logo from './css_files/images/Ojani.png';

function StockManagerHeader() {

    return (
        <div 
            style={{ 
                width: '100vw',    /* Full viewport width */
                backgroundColor: '#2E4857', 
                padding: '16px 0', /* Equivalent to py-4 */
                position: 'fixed', /* Fix it to the top */
                top: 0,            /* No gap at the top */
                left: 0,           /* Align to the left edge */
                zIndex: 50,        /* Ensure it's above other elements */
                margin: 0 
            }}
        > 
            <div style={{ 
                width: '100%', 
                maxWidth: '1200px',  /* Equivalent to container width */
                margin: '0 auto', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
            }}>
                {/* Logo Section */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                        src={logo} 
                        alt="Hotel Breeta's Garden" 
                        style={{ height: '48px', width: 'auto', objectFit: 'contain', marginRight: '16px' }} 
                    /> 
                    <span style={{ color: 'white', fontSize: '24px', fontWeight: '600' }}>Stock Manager Dashboard</span>
                </div>

                {/* Navigation Links */}
                <nav style={{ display: 'flex', gap: '24px' }}> {/* space-x-6 */}
                    <a href="/stockDash" style={navLinkStyle}>Details</a>
                    <a href="/viewstock" style={navLinkStyle}>View Stock</a>
                    <a href="/addstockDash" style={navLinkStyle}>Add Stock</a>
                    <a href="/stockinventry" style={navLinkStyle}>Inventory Tracker</a>
                    <a href="/stockreport" style={navLinkStyle}>Generate Report</a>
                   
                </nav>

                {/* Add a Login button to the right side */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}> 
                    <a href="/logins" style={{ color: '#FFFFFF', fontSize: '18px', textDecoration: 'none', transition: 'all 0.3s ease', transform: 'scale(1)' }}
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
        </div>
    );
}

const navLinkStyle = {
    color: 'white', 
    fontSize: '18px', 
    transition: 'transform 0.3s', 
    textDecoration: 'none',
    cursor: 'pointer',
};

export default StockManagerHeader;
