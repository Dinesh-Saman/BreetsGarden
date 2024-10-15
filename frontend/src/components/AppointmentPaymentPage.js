import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import './css_files/SpaAppointment.css';
import CusHeader from "./CusHeader";

function AppointmentPaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedPackage, date, time, userName, userEmail, userContactNo } = location.state || {};
    
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isPaymentDone, setIsPaymentDone] = useState(false);

    // Payment method selection handler
    const handlePaymentSelection = (e) => {
        setPaymentMethod(e.target.value);
    };

    // Mock payment gateway simulation
    const handleProceedToPayment = () => {
        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }

        // Simulating payment process
        setTimeout(() => {
            setIsPaymentDone(true);
            alert(`Payment successful for ${selectedPackage?.serviceType}`);
            
            // Sending the confirmation email after payment success
            sendConfirmationEmail();

        }, 2000);  // Simulating a 2 second payment processing delay
    };

    // Function to simulate sending a confirmation email
    const sendConfirmationEmail = () => {
        // Mock email sending API call
        setTimeout(() => {
            alert(`An email with detailed booking has been sent to ${userEmail}`);
            // Navigating user to a confirmation page or back to the dashboard after email
            navigate('/facilities-dashboard');
        }, 1000);  // Simulating 1 second email sending delay
    };

    const headerStyle = {
        width: '100%',
    };

    return (
        <div>
            <div style={headerStyle}>
                <CusHeader />
            </div>
            <nav className="navbar">
                <p className="nav-item"></p>
                <Link to="/facilities-dashboard" className="nav-item1">Facilities & Services</Link>
                <Link to="/package-Dashboard" className="nav-item">Dayout Packages</Link>
                <Link to="/activitD" className="nav-item">Activities</Link>
                <Link to="/spa-intro" className="nav-item2">Spa Service</Link>
            </nav>
            <div className="payment-page">
                <h2>Confirm Payment</h2>
                <p><strong>Service:</strong> {selectedPackage?.serviceType}</p>
                <p><strong>Date:</strong> {date}</p>
                <p><strong>Time:</strong> {time}</p>
                <p><strong>User Name:</strong> {userName}</p>
                <p><strong>User Email:</strong> {userEmail}</p>
                <p><strong>User Contact No:</strong> {userContactNo}</p>
                <p><strong>Price:</strong> Rs {selectedPackage?.price}</p>

                {!isPaymentDone ? (
                    <>
                        <h3>Select Payment Method</h3>
                        <div className="payment-methods">
                            <label>
                                <input type="radio" value="Credit Card" name="payment" onChange={handlePaymentSelection} />
                                Credit Card
                            </label>
                            <label>
                                <input type="radio" value="PayPal" name="payment" onChange={handlePaymentSelection} />
                                PayPal
                            </label>
                            <label>
                                <input type="radio" value="Bank Transfer" name="payment" onChange={handlePaymentSelection} />
                                Bank Transfer
                            </label>
                        </div>
                        <button onClick={handleProceedToPayment}>Proceed to Payment</button>
                    </>
                ) : (
                    <p>Payment successful! Redirecting...</p>
                )}
            </div>
        </div>
    );
}

export default AppointmentPaymentPage;
