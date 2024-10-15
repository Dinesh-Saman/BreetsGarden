import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImage from './css_files/images/bg2.jpg'; // Background image for form

function UpdateRoomBooking({ currentRoomBooking, setCurrentRoomBooking, setBookRooms, bookRooms }) {
    const [cusName, setCusName] = useState("");
    const [roomId, setRoomId] = useState("");
    const [roomName, setRoomName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [noOfPersons, setNoOfPersons] = useState("");
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");

    useEffect(() => {
        if (currentRoomBooking) {
            setCusName(currentRoomBooking.cusName);
            setRoomId(currentRoomBooking.roomId);
            setRoomName(currentRoomBooking.roomName);
            setEmail(currentRoomBooking.email);
            setPhoneNumber(currentRoomBooking.phoneNumber);
            setNoOfPersons(currentRoomBooking.noOfPersons);
            setCheckin(currentRoomBooking.checkin);
            setCheckout(currentRoomBooking.checkout);
        }
    }, [currentRoomBooking]);

    const sendData = async (e) => {
        e.preventDefault();

        const updatedRoom = {
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
            const response = await axios.put(`http://localhost:8080/book/updateBooking/${currentRoomBooking._id}`, updatedRoom);
            alert('Room booking updated successfully');
            setBookRooms(bookRooms.map(bookRoom => (bookRoom._id === currentRoomBooking._id ? response.data : bookRoom)));
            setCurrentRoomBooking(null);
        } catch (err) {
            alert(`Error updating room booking: ${err.message}`);
        }
    };

    // CSS styles
    const containerStyle = {
        position: 'relative',
        padding: '20px',
        width: '600px', // Increased width for the form container
        margin: '20px auto', // Centering the container
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white background
        border: '2px solid black',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 1,
        marginTop: '80px', // Margin from the top for spacing from the image
    };

    const inputStyle = {
        margin: '10px 0',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '100%',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 15px',
        cursor: 'pointer',
        marginTop: '10px',
        width: '100%',
    };

    const cancelButtonStyle = {
        ...buttonStyle,
        backgroundColor: 'gray', // Different color for cancel button
    };

    return (
        <div style={{ 
            backgroundImage: `url(${bgImage})`, 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '20px', // Padding around the content to create space
        }}>
            <div style={containerStyle}>
                <h2 style={{ color: 'black', textAlign: 'center' }}>Update Room Booking</h2>
                <form onSubmit={sendData}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Customer Name</label>
                        <input 
                            style={inputStyle}
                            type="text" 
                            value={cusName} 
                            onChange={(e) => setCusName(e.target.value)} 
                            readOnly 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Room Id</label>
                        <input 
                            style={inputStyle}
                            type="text" 
                            value={roomId} 
                            onChange={(e) => setRoomId(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Room Name</label>
                        <input 
                            style={inputStyle}
                            type="text" 
                            value={roomName} 
                            onChange={(e) => setRoomName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Email</label>
                        <input 
                            style={inputStyle}
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Phone Number</label>
                        <input 
                            style={inputStyle}
                            type="tel" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>No Of Persons</label>
                        <input 
                            style={inputStyle}
                            type="text" 
                            value={noOfPersons} 
                            onChange={(e) => setNoOfPersons(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Checkin</label>
                        <input 
                            style={inputStyle}
                            type="date" 
                            value={checkin} 
                            onChange={(e) => setCheckin(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Checkout</label>
                        <input 
                            style={inputStyle}
                            type="date" 
                            value={checkout} 
                            onChange={(e) => setCheckout(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" style={buttonStyle}>Submit</button>
                    <button 
                        type="button" 
                        style={cancelButtonStyle} 
                        onClick={() => setCurrentRoomBooking(null)} // Clear current room booking on cancel
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateRoomBooking;