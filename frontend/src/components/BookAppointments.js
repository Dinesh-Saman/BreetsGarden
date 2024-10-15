import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BookAppointments(){

    const location = useLocation();
    const navigate = useNavigate(); 
    
    const{selectedSpa} = location.state || {};

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
            navigate('/payment', {
                state: {
                    customerName,
                    email,
                    contactNo,
                    selectedSpa
                }
            });
        }
    };

        return (
            <div className="credit-card-form-container">
                <h1>Appointment Booking</h1>
                {selectedSpa && (
                    <div className="package-details">
                        <h2>{selectedSpa.title}</h2>
                        <p>Validity Period: {selectedSpa.validity}</p>
                        <p>Tour Duration: {selectedSpa.duration}</p>
                        <p>Price Per Person: Rs {selectedSpa.price}</p>
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
                    <button type="submit" className="btn-submit">Make Payment</button>
                </form>
            </div>
        );
    }


export default BookAppointments;
