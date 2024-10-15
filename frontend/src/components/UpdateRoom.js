import React, { useState, useEffect } from "react";
import axios from "axios";
import bgImage from './css_files/images/bg2.jpg'; // Background image for form

function UpdateRoom({ currentRoom, setCurrentRoom, setRooms, rooms }) {
    const [roomName, setName] = useState("");
    const [noOfPersons, setPersons] = useState("");
    const [noOfBeds, setBeds] = useState("");
    const [airCondition, setAirCondition] = useState("");
    const [isSmokingAllowed, setSmoking] = useState("");
    const [board, setBoard] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (currentRoom) {
            setName(currentRoom.roomName); 
            setPersons(currentRoom.noOfPersons); 
            setBeds(currentRoom.noOfBeds); 
            setAirCondition(currentRoom.airCondition); 
            setSmoking(currentRoom.isSmokingAllowed);
            setBoard(currentRoom.board) ;
            setPrice(currentRoom.price);    
        }
    }, [currentRoom]);

    const sendData = async (e) => {
        e.preventDefault();

        const updatedRoom = {
            roomName,
            noOfPersons,
            noOfBeds,
            airCondition,
            isSmokingAllowed,
            board,
            price 
        };

        try {
            const response = await axios.put(`http://localhost:8080/room/updateRoom/${currentRoom._id}`, updatedRoom);
            alert('Room updated successfully');
            console.log('Updated Room:', response.data);

            setRooms(prevRooms => 
                prevRooms.map(room => 
                    room._id === currentRoom._id ? response.data : room
                )
            );

            setCurrentRoom(null); 
        } catch (err) {
            alert(`Error updating room: ${err.message}`);
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
                <h2 style={{ color: 'black' }}>Update Room</h2>
                <form onSubmit={sendData}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Room Name</label>
                        <input 
                            style={inputStyle}
                            type="text" 
                            value={roomName} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>No. of Persons</label>
                        <input 
                            style={inputStyle}
                            type="text" 
                            value={noOfPersons} 
                            onChange={(e) => setPersons(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>No. of Beds</label>
                        <input 
                            style={inputStyle}
                            type="text" 
                            value={noOfBeds} 
                            onChange={(e) => setBeds(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Air Conditioning (Yes/No)</label>
                        <input 
                            style={inputStyle}
                            type="text" 
                            value={airCondition} 
                            onChange={(e) => setAirCondition(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Smoking Allowed (Yes/No)</label>
                        <input 
                            style={inputStyle}
                            type="text" 
                            value={isSmokingAllowed} 
                            onChange={(e) => setSmoking(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>board</label>
                        <input 
                            style={inputStyle}
                            type="text" 
                            value={board} 
                            onChange={(e) => setBoard(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'black' }}>Price</label>
                        <input 
                            style={inputStyle}
                            type="text" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" style={buttonStyle}>Update Room</button>
                    <button 
                        type="button" 
                        style={cancelButtonStyle} 
                        onClick={() => setCurrentRoom(null)} // Clear current room on cancel
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateRoom; 