import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css_files/Payment.css'; // Make sure to add styles for .error and .input-error in your CSS file
import CusHeader from "./CusHeader";


function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { customerName, email, contactNo, selectedPackage } = location.state || {};

    const [paymentType, setPaymentType] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountHolder, setAccountHolder] = useState('');
    const [cvv, setcvv] = useState('');
    const [accountNumberError, setAccountNumberError] = useState(false);
    const [cvvError, setcvvError] = useState(false);

    const handlePaymentSubmit = (e) => {
        e.preventDefault();

        // Regex for validation
        const accountNumberRegex = /^\d{16,20}$/; // Account number: 16 to 20 digits
        const cvvRegex = /^\d{3,6}$/; // cvv: 3 to 6 digits

        let isValid = true;

        // Validate Account Number
        if (!accountNumberRegex.test(accountNumber)) {
            setAccountNumberError(true);
            isValid = false;
        } else {
            setAccountNumberError(false);
        }

        // Validate cvv
        if (!cvvRegex.test(cvv)) {
            setcvvError(true);
            isValid = false;
        } else {
            setcvvError(false);
        }

        // Proceed with form submission if inputs are valid
        if (isValid && paymentType && accountNumber) {
            setTimeout(() => {
                alert(`Payment successful! A confirmation email has been sent to ${email}.`);
                navigate('/package-Dashboard'); // Redirect back to home or another page
            }, 1000);
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
        <div className="payment-page-container">
            <nav className="navbar">
                <p className="nav-item"></p>
                <Link to="/facilities-dashboard" className="nav-item">Facilities & Services</Link>
                <Link to="/package-Dashboard" className="nav-item">Dayout Packages</Link>
                <Link to="/activitD" className="nav-item">Activities</Link>
                <Link to="/spa-intro" className="nav-item">Spa Service</Link>
            </nav>
            <h1>Complete Your Payment</h1>
            {selectedPackage && (
                <div className="package-de">
                    <h2>{selectedPackage.title}</h2>
                    <p>Validity Period: {selectedPackage.validity}</p>
                    <p>Tour Duration: {selectedPackage.duration}</p>
                    <p>Price Per Person: Rs {selectedPackage.price}</p>
                </div>
            )}
            <form onSubmit={handlePaymentSubmit} className="payment-form">
                <div className="form-group">
                    <label>Payment Type:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="paymentType"
                                value="Visa"
                                checked={paymentType === 'Visa'}
                                onChange={(e) => setPaymentType(e.target.value)}
                                required
                            />
                            Visa
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentType"
                                value="MasterCard"
                                checked={paymentType === 'MasterCard'}
                                onChange={(e) => setPaymentType(e.target.value)}
                                required
                            />
                            MasterCard
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="accountNumber">Account Number:</label>
                    <input
                        type="text"
                        id="accountNumber"
                        className={accountNumberError ? 'input-error' : ''}
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                    {accountNumberError && <span className="error">Account number must be between 16 and 20 digits.</span>}

                    <label htmlFor="accountHolder">Account Holder:</label>
                    <input
                        type="text"
                        id="accountHolder"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        required
                    />

                    <label htmlFor="cvv">CVV:</label>
                    <input
                        type="text"
                        id="cvv"
                        className={cvvError ? 'input-error' : ''}
                        value={cvv}
                        onChange={(e) => setcvv(e.target.value)}
                        required
                    />
                    {cvvError && <span className="error">CVV must be between 3 and 6 digits.</span>}
                </div>
                <button type="submit" className="btn-submit">Submit Payment</button>
            </form>
        </div>
        </div>
    );
}

export default PaymentPage;
