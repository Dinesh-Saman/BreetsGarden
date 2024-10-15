import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css_files/spaDash.css';
import CusHeader from "./CusHeader";

function AppointmentPage() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [userName, setuserName] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [userContactNo, setuserContactNo] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [contactNoError, setContactNoError] = useState(false);
    const [dateError, setDateError] = useState(false); // Error for invalid date
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedPackage } = location.state || {};

    // Function to validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to validate contact number (should be exactly 10 digits)
    const validateContactNo = (contactNo) => {
        const contactNoRegex = /^[0-9]{10}$/;
        return contactNoRegex.test(contactNo);
    };

    // Function to get today's date in 'YYYY-MM-DD' format for setting 'min' attribute
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset error states
        setEmailError(false);
        setContactNoError(false);
        setDateError(false);

        let isValid = true;

        // Email and contact number validation
        if (!validateEmail(userEmail)) {
            setEmailError(true);
            isValid = false;
        }

        if (!validateContactNo(userContactNo)) {
            setContactNoError(true);
            isValid = false;
        }

        // Validate date (cannot select previous date)
        const today = getTodayDate();
        if (date < today) {
            setDateError(true);
            isValid = false;
        }

        // Proceed if all fields and validation are correct
        if (isValid && date && time && userName && userEmail && userContactNo) {
            navigate('/AppointmentPayment', { state: { selectedPackage, date, time, userName, userEmail, userContactNo } });
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
            <nav className="navbar">
                <p className="nav-item"></p>
                <Link to="/facilities-dashboard" className="nav-item1">Facilities & Services</Link>
                <Link to="/package-Dashboard" className="nav-item">Dayout Packages</Link>
                <Link to="/activitD" className="nav-item">Activities</Link>
                <Link to="/spa-intro" className="nav-item2">Spa Service</Link>
            </nav>
            <div className="appointment-form">
                <h2>Book Appointment for {selectedPackage?.serviceType}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="date">Select Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={getTodayDate()} // Disable previous dates
                            required
                        />
                        {dateError && <span style={{ color: 'red' }}>Date cannot be in the past</span>}
                    </div>
                    <div>
                        <label htmlFor="time">Select Time:</label>
                        <input
                            type="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="userName">Your Full Name:</label>
                        <input
                            type="text"
                            id="userName"
                            placeholder="Enter your full Name"
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="userEmail">Your Email:</label>
                        <input
                            type="text"
                            id="userEmail"
                            placeholder="Enter your Email"
                            value={userEmail}
                            onChange={(e) => setuserEmail(e.target.value)}
                            required
                            style={{ borderColor: emailError ? 'red' : '#007bff' }}
                        />
                        {emailError && <span style={{ color: 'red' }}>Invalid email address</span>}
                    </div>
                    <div>
                        <label htmlFor="userContactNo">Your Contact No:</label>
                        <input
                            type="text"
                            id="userContactNo"
                            placeholder="Enter your Contact No"
                            value={userContactNo}
                            onChange={(e) => setuserContactNo(e.target.value)}
                            required
                            style={{ borderColor: contactNoError ? 'red' : '#007bff' }}
                        />
                        {contactNoError && <span style={{ color: 'red' }}>Contact number must be 10 digits</span>}
                    </div>
                    <button className="spaddd" type="submit">Proceed to Payment</button>
                </form>
            </div>
        </div>
    );
}

export default AppointmentPage;
