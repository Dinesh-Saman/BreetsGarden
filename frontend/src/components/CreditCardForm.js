import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css_files/CreditCardForm.css'; // Create and add styles in this CSS file
import CusHeader from "./CusHeader";


function CreditCardForm() {
    const location = useLocation();
    const navigate = useNavigate(); // Replace useHistory with useNavigate
    const { selectedPackage } = location.state || {};

    const [customerName, setCustomerName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        // Contact number validation (must be 10 digits)
        if (!contactNo || contactNo.length !== 10 || !/^\d+$/.test(contactNo)) {
            newErrors.contactNo = 'Please enter a valid 10-digit contact number.';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            // Redirect to payment page with form data and selected package
            navigate('/paymentSpa', {
                state: {
                    customerName,
                    email,
                    contactNo,
                    selectedPackage
                }
            });
        }
    };

    const headerStyle = {
        width: '100%',
    };

    return (
        <div>
        <div style={headerStyle}>
                  <CusHeader />
              </div>
        <div className="credit-card-form-container">
            
            <nav className="navbar">
                <p className="nav-item"></p>
                <Link to="/facilities-dashboard" className="nav-item">Facilities & Services</Link>
                <Link to="/package-Dashboard" className="nav-item">Dayout Packages</Link>
                <Link to="/activitD" className="nav-item">Activities</Link>
                <Link to="/spa-intro" className="nav-item">Spa Service</Link>
            </nav>
            <h1>Credit Card Payment</h1>
            {selectedPackage && (
                <div className="package-def">
                    <h2>{selectedPackage.title}</h2>
                    <p>Validity Period: {selectedPackage.validity}</p>
                    <p>Tour Duration: {selectedPackage.duration}</p>
                    <p>Price Per Person: Rs {selectedPackage.price}</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="credit-card-form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: null });
                        }}
                        required
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="contactNo">Contact No:</label>
                    <input
                        type="tel"
                        id="contactNo"
                        value={contactNo}
                        onChange={(e) => {
                            setContactNo(e.target.value);
                            if (errors.contactNo) setErrors({ ...errors, contactNo: null });
                        }}
                        required
                    />
                    {errors.contactNo && <span className="error-message">{errors.contactNo}</span>}
                </div>
                <button type="submit" className="bt-submit">Make Payment</button>
            </form>
        </div>
        </div>
    );
}

export default CreditCardForm;
