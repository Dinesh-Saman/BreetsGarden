import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateRoom from './UpdateRoom';
import bgImage from './css_files/images/bg3.jpg';
import ResManagerHeader from './ResManagerHeader';
import { useNavigate } from "react-router-dom"; 
import Swal from 'sweetalert2'; 

function AllRooms() {
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [hoveredRoomId, setHoveredRoomId] = useState(null); // New state for hovered room
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        const getRooms = async () => {
            try {
                const res = await axios.get("http://localhost:8080/room/getrooms");
                setRooms(res.data);
            } catch (err) {
                Swal.fire('Error', err.message, 'error'); 
            }
        };
        getRooms();
    }, []);

    const deleteRoom = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/room/deleteRoom/${id}`);
            setRooms(rooms.filter(room => room._id !== id));
            Swal.fire('Deleted!', 'Room deleted successfully.', 'success'); 
        } catch (err) {
            Swal.fire('Error', `Error deleting room: ${err.message}`, 'error'); 
        }
    };

    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRoom(id); 
            }
        });
    };

    const handleUpdateRoom = (room) => {
        setCurrentRoom(room);
    };

    const handleBookClick = (room) => {
        navigate('/addBooking', { state: { room: { roomId: room._id, roomName: room.roomName } } });
    };

    // CSS styles
    const containerStyle = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '140px',
        color: 'white'
    };

    const outerFrameStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '80vw',
        maxWidth: '900px',
        margin: '20px auto',
    };

    const roomFrameStyle = (id) => ({
        backgroundColor: 'rgba(135, 206, 235, 0.5)',
        borderRadius: '10px',
        padding: '15px',
        width: '100%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        marginBottom: '20px',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        transform: hoveredRoomId === id ? 'scale(1.05)' : 'scale(1)', // Scale up on hover
        zIndex: hoveredRoomId === id ? 1 : 0, // Bring to front
        transition: 'transform 0.3s, z-index 0.3s', // Smooth transition
    });

    const imageStyle = {
        width: '150px', 
        height: '150px', 
        borderRadius: '10px',
        objectFit: 'cover',
        marginRight: '20px', 
    };

    const buttonContainerStyle = {
        position: 'absolute',
        bottom: '15px',
        right: '15px',
        display: 'flex',
        gap: '10px'
    };

    const buttonStyle = {
        backgroundColor: '#1d4ed8',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    const addButtonStyle = {
        backgroundColor: isHovered ? '#3b82f6' : '#1d4ed8',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
        display: 'block',
        margin: '20px auto',
    };

    const headingStyle = {
        color: 'black',
        textAlign: 'center',
        marginBottom: '20px',
    };

    const listStyle = {
        color: 'black',
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    };

    return (
        <div style={containerStyle}>
            <ResManagerHeader />
            <div style={outerFrameStyle}>
                <h1 style={headingStyle}>All Rooms</h1>
                <button 
                    style={addButtonStyle} 
                    onClick={() => navigate('/addRoom')}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Add New Room
                </button>
                <div>
                    {rooms.map(room => (
                        <div 
                            key={room._id} 
                            style={roomFrameStyle(room._id)} // Pass room ID to style function
                            onMouseEnter={() => setHoveredRoomId(room._id)} // Set hovered room ID
                            onMouseLeave={() => setHoveredRoomId(null)} // Reset hovered room ID
                        >
                            <img 
                                src={`http://localhost:8080/uploads/${room.roomImage}`} 
                                alt={room.roomName} 
                                style={imageStyle} 
                                onError={(e) => { 
                                    e.target.onerror = null; 
                                    e.target.src = '';  
                                }} 
                            />
                            <div>
                                <h2 style={{ fontSize: '1.5em', marginBottom: '10px', color: 'black' }}>{room.roomName}</h2>
                                <ul style={listStyle}>
                                    <li>No. of Persons: {room.noOfPersons}</li>
                                    <li>No. of Beds: {room.noOfBeds}</li>
                                    <li>Air Conditioning: {room.airCondition}</li>
                                    <li>Smoking Allowed: {room.isSmokingAllowed === 'yes' ? 'Yes' : 'No'}</li>
                                    <li>board: {room.board}</li>
                                    <li>Price: Rs.{room.price}/=</li>
                                </ul>
                            </div>
                            <div style={buttonContainerStyle}>
                                <button style={buttonStyle} onClick={() => confirmDelete(room._id)}>Delete</button>
                                <button style={buttonStyle} onClick={() => handleUpdateRoom(room)}>Edit</button>
                                <button style={buttonStyle} onClick={() => handleBookClick(room)}>Book</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {currentRoom && (
                <UpdateRoom
                    currentRoom={currentRoom}
                    setCurrentRoom={setCurrentRoom}
                    setRooms={setRooms}
                    rooms={rooms}
                />
            )}
        </div>
    );
}

export default AllRooms;