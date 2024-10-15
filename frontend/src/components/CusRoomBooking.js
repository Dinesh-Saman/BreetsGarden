import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import bgImage from './css_files/images/bg1.png';
import CusHeader from "./CusHeader";
import Swal from 'sweetalert2';

function CusRoomBooking() {
    const location = useLocation();
    const navigate = useNavigate();
    const room = location.state?.room || {};

    const [cusName, setCusName] = useState(localStorage.getItem('username') || "");
    const [roomId, setRoomId] = useState(room.roomId || "");
    const [roomName, setRoomName] = useState(room.roomName || "");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [noOfPersons, setPersons] = useState("");
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");

    // Function to get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    function sendData(e) {
        e.preventDefault();

        // Validate phone number
        if (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid Phone number.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
            return;
        }

        // Validation for check-in and check-out dates
        const todayDate = getTodayDate();
        if (checkin < todayDate) {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid Check-in Date. Check-in must be today or a future date.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
            return;
        }

        if (checkout < checkin) {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid Check-out Date. Check-out must be the same or after Check-in date.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
            return;
        }

        const newBookingR = {
            cusName,
            roomId,
            roomName,
            email,
            phoneNumber,
            noOfPersons,
            checkin,
            checkout
        };

        axios.post("http://localhost:8080/book/addBooking", newBookingR)
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Room booked successfully!',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                }).then(() => {
                    navigate("/getCusBookings");
                });

                // Reset fields
                setCusName("");
                setRoomId("");
                setRoomName("");
                setEmail("");
                setPhoneNumber("");
                setPersons("");
                setCheckin("");
                setCheckout("");
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'Okay'
                });
            });
    }

    const pageStyle = {
        backgroundColor: '#045c6e',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: '120px'
    };

    const containerStyle = {
        position: 'relative',
        padding: '20px',
        maxWidth: '500px',
        width: '100%',
        margin: '20px',
        backgroundColor: 'skyblue',
        border: '2px solid black',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1,
    };

    const backgroundStyle = {
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: '550px',
        height: '550px',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
    };

    const formStyle = {
        padding: '20px',
        position: 'relative',
    };

    const buttonStyle = {
        backgroundColor: 'darkblue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        display: 'block',
        margin: '20px auto 0',
    };

    const headerFixedStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        margin: 0,
        padding: 0,
    };

    return (
        <div>
            <div style={headerFixedStyle}>
                <CusHeader />
            </div>
            <div style={pageStyle}>
                <div style={backgroundStyle}></div>
                <div style={containerStyle}>
                    <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Book Room</h1>
                    <form onSubmit={sendData} style={formStyle}>
                        <div className="mb-3">
                            <label htmlFor="cusName" className="form-label">User Name</label>
                            <input type="text" className="form-control" id="cusName" value={cusName} onChange={(e) => setCusName(e.target.value)} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roomId" className="form-label">Room ID</label>
                            <input type="text" className="form-control" id="roomId" value={roomId} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roomName" className="form-label">Room Name</label>
                            <input type="text" className="form-control" id="roomName" value={roomName} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input type="tel" className="form-control" id="phoneNumber" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="abc@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="noOfPersons" className="form-label">No Of Persons</label>
                            <input type="number" className="form-control" id="noOfPersons" placeholder="Enter No Of Persons" value={noOfPersons} onChange={(e) => setPersons(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="checkin" className="form-label">Check-in</label>
                            <input type="date" className="form-control" id="checkin" value={checkin} onChange={(e) => setCheckin(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="checkout" className="form-label">Check-out</label>
                            <input type="date" className="form-control" id="checkout" value={checkout} onChange={(e) => setCheckout(e.target.value)} required />
                        </div>
                        <button type="submit" style={buttonStyle}>Book Room</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CusRoomBooking;