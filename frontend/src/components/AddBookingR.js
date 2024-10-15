import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImage from './css_files/images/bg1.png';
import ResManagerHeader from './ResManagerHeader';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddBookingR() {
    const location = useLocation();
    const navigate = useNavigate();
    const room = location.state?.room;

    const [cusName, setCusName] = useState(localStorage.getItem('username') || "");
    const [roomId, setRoomId] = useState(room?.roomId || "");
    const [roomName, setRoomName] = useState(room?.roomName || "");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [noOfPersons, setPersons] = useState("");
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");

    useEffect(() => {
        const today = new Date();
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1); // Set check-in to one day in the future

        setCheckin(nextDay.toISOString().split("T")[0]); // Set checkin to next day in YYYY-MM-DD format
        setCheckout(nextDay.toISOString().split("T")[0]); // Set checkout to same as checkin initially
    }, []);

    const checkCustomerExists = async (username) => {
        try {
            const response = await axios.post("http://localhost:8080/customer/checkCustomer", { username });
            return response.status === 200; // Customer exists
        } catch (err) {
            return false; // Customer does not exist
        }
    };

    const registerCustomer = async (data) => {
        try {
            await axios.post("http://localhost:8080/customer/register", data);
            Swal.fire('Success', 'Customer registered successfully', 'success');
            await bookRoom();
        } catch (error) {
            if (error.response?.data?.errmsg?.includes("duplicate key error")) {
                Swal.fire('Error', 'This username is already registered. Please use a different username.', 'error');
            } else {
                console.error("Registration Error:", error.response);
                Swal.fire('Error', error.response?.data || 'Error registering customer', 'error');
            }
        }
    };

    const bookRoom = async () => {
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

        try {
            await axios.post("http://localhost:8080/book/addBooking", newBookingR);
            Swal.fire({
                title: "Success!",
                text: "Room booked successfully!",
                icon: "success",
                confirmButtonText: "Close"
            }).then(() => {
                navigate('/getrooms');
            });
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: `Error: ${err.message}`,
                icon: "error",
                confirmButtonText: "Close"
            });
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();

        // Validation for check-in and check-out dates
        const today = new Date();
        const selectedCheckin = new Date(checkin);
        const selectedCheckout = new Date(checkout);

        if (selectedCheckin < today) {
            Swal.fire('Error', 'Check-in date is invalid. Please select today or a future date.', 'error');
            return;
        }

        if (selectedCheckout < today || selectedCheckout < selectedCheckin) {
            Swal.fire('Error', 'Check-out date is invalid. It must be the same as or after the check-in date.', 'error');
            return;
        }

        // Validate phone number length
        if (phoneNumber.length !== 10) {
            Swal.fire('Error', 'Invalid Phone number.', 'error');
            return;
        }

        const customerExists = await checkCustomerExists(cusName); // Check if customer exists
        if (!customerExists) {
            // Show registration form with pre-filled values
            const { value: formValues } = await Swal.fire({
                title: 'Register Customer',
                html: `
                    <input id="username" class="swal2-input" placeholder="Username" value="${cusName}" required>
                    <input id="email" class="swal2-input" placeholder="Email" value="${email}" required>
                    <input id="password" type="password" class="swal2-input" placeholder="Password" required>
                `,
                focusConfirm: false,
                preConfirm: () => {
                    return {
                        username: document.getElementById('username').value,
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value
                    };
                }
            });

            if (formValues) {
                await registerCustomer(formValues);
            }
        } else {
            // If customer exists, proceed to book room
            await bookRoom();
        }
    };

    const handleCheckinChange = (e) => {
        const selectedCheckinDate = e.target.value;
        setCheckin(selectedCheckinDate);

        if (new Date(checkout) < new Date(selectedCheckinDate)) {
            setCheckout(selectedCheckinDate);
        }
    };

    const handleCheckoutChange = (e) => {
        const selectedCheckoutDate = e.target.value;
        setCheckout(selectedCheckoutDate);
    };

    return (
        <div style={{ backgroundColor: '#045c6e', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', paddingTop: '140px' }}>
            <ResManagerHeader />
            <div style={{ position: 'relative', padding: '20px', maxWidth: '500px', width: '100%', margin: '20px', backgroundColor: 'skyblue', border: '2px solid black', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', zIndex: 1, paddingTop: '10px' }}>
                <form onSubmit={handleBooking}>
                    <h1 style={{ textAlign: 'center' }}>Add Booking</h1>
                    <div className="mb-3">
                        <label htmlFor="cusName" className="form-label">Customer Name</label>
                        <input type="text" className="form-control" id="cusName" value={cusName} onChange={(e) => setCusName(e.target.value)} required />
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
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="noOfPersons" className="form-label">Number of Persons</label>
                        <input type="number" className="form-control" id="noOfPersons" value={noOfPersons} onChange={(e) => setPersons(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="checkin" className="form-label">Check-in Date</label>
                        <input type="date" className="form-control" id="checkin" value={checkin} onChange={handleCheckinChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="checkout" className="form-label">Check-out Date</label>
                        <input type="date" className="form-control" id="checkout" value={checkout} onChange={handleCheckoutChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#004085', color: '#fff', display: 'block', margin: '0 auto' }}>Book Room</button>
                </form>
            </div>
            <div style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '550px',
                height: '550px',
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                opacity: '0.5',
                zIndex: '0'
            }} />
        </div>
    );
}

export default AddBookingR;