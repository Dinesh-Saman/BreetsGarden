import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImage from './css_files/images/bg6.jpg';
import CusHeader from "./CusHeader";
import Swal from 'sweetalert2';

function CusViewAllBookings() {
    const [bookings, setBookings] = useState([]);
    const username = localStorage.getItem('username');
    const [hoveredBooking, setHoveredBooking] = useState(null); // State for the hovered booking

    useEffect(() => {
        const getBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/book/getCusBookings/${username}`);
                console.log(response.data); // Debugging line to check response
                setBookings(response.data);
            } catch (err) {
                alert(err.response?.data?.error || "Error fetching bookings");
            }
        };

        if (username) {
            getBookings();
        }
    }, [username]);

    const handleDelete = async (booking) => {
        const checkinDate = new Date(booking.checkin);
        const today = new Date();

        // Calculate the difference between check-in date and today
        const daysDifference = Math.ceil((checkinDate - today) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

        // Check if today's date is within 3 days of the check-in date
        if (daysDifference <= 3) {
            Swal.fire({
                icon: 'error',
                title: 'Cannot Delete Booking',
                text: 'You cannot delete the booking within 3 days of the check-in date.',
            });
            return;
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This booking will be deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8070/book/deleteBooking/${booking._id}`);
                setBookings(bookings.filter((b) => b._id !== booking._id)); // Remove the deleted booking from state
                Swal.fire('Deleted!', 'Your booking has been deleted.', 'success');
            } catch (err) {
                Swal.fire('Error!', 'There was an error deleting the booking.', 'error');
            }
        }
    };

    // Styles defined outside the return statement
    const containerStyle = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        width: '100vw',
        margin: '0',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
    };

    const bookingFrameStyle = (isHovered) => ({
        backgroundColor: 'rgba(135, 206, 235, 0.7)', // Frame color
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        color: 'black',
        width: '80vw',
        maxWidth: '600px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition
        transform: isHovered ? 'scale(1.05)' : 'scale(1)', // Slight zoom on hover
        boxShadow: isHovered ? '0 8px 16px rgba(0, 0, 0, 0.3)' : '0 4px 8px rgba(0, 0, 0, 0.2)', // Elevation effect
    });

    const frameStyle = {
        border: '1px solid black',
        borderRadius: '15px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginTop: '35px',
        marginBottom: '20px',
        margin: '20px',
        padding: '8px 12px',
        width: '500px', // Adjust width as needed
        textAlign: 'center', // Center the text
    };

    const h1Style = {
        color: 'black',
    };

    const buttonStyle = {
        marginTop: '10px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '5px',
    };

    const pStyle = {
        marginLeft: '15px', // Adjust margin as needed
    };

    return (
        <div style={containerStyle}>
            <div style={{ width: '100%' }}>
                <CusHeader />
            </div>
            <div style={frameStyle}>
                <h1 style={h1Style}>Your Bookings</h1>
            </div>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                bookings.map((booking) => (
                    <div 
                        key={booking._id} 
                        style={bookingFrameStyle(hoveredBooking === booking._id)} // Apply hover effect
                        onMouseEnter={() => setHoveredBooking(booking._id)}  // Set hover state for this booking
                        onMouseLeave={() => setHoveredBooking(null)}        // Reset hover state
                    >
                        <h2 style={{ fontSize: '1.2em' }}>{booking.roomName}</h2>
                        <p style={pStyle}>No. of Persons: {booking.noOfPersons}</p>
                        <p style={pStyle}>Email: {booking.email}</p>
                        <p style={pStyle}>Phone Number: {booking.phoneNumber}</p>
                        <p style={pStyle}>Check-in Date: {new Date(booking.checkin).toLocaleDateString()}</p>
                        <p style={pStyle}>Check-out Date: {new Date(booking.checkout).toLocaleDateString()}</p>
                        <button 
                            onClick={() => handleDelete(booking)} 
                            style={buttonStyle}
                        >
                            Delete Booking
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default CusViewAllBookings;