import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from './css_files/images/bg3.jpg';
import CusHeader from "./CusHeader";

function CusAllRooms() {
    const [rooms, setRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [hoveredRoom, setHoveredRoom] = useState(null); // State for the hovered room
    const navigate = useNavigate();

    // States for hover effects (excluding Book button)
    const [isHoveredSearch, setIsHoveredSearch] = useState(false);
    const [isHoveredBookings, setIsHoveredBookings] = useState(false);
    const [isHoveredFilter, setIsHoveredFilter] = useState(false);

    useEffect(() => {
        getRooms();
    }, []);

    const getRooms = async () => {
        try {
            const response = await axios.get("http://localhost:8080/room/getrooms");
            setRooms(response.data);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get("http://localhost:8080/room/searchroom", {
                params: { query: searchQuery }
            });
            setRooms(response.data);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleFilter = async () => {
        try {
            const response = await axios.get("http://localhost:8080/room/filterrooms", {
                params: {
                    priceRange: priceRange || undefined
                }
            });
            setRooms(response.data);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleBookClick = (room) => {
        navigate('/cusBookingroom', { state: { room: { roomId: room._id, roomName: room.roomName } } });
    };

    const handleViewBookings = () => {
        navigate('/getCusBookings');
    };

    const containerStyle = {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        width: '100vw',
        margin: '0',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    const headerStyle = {
        width: '100%',
    };

    const searchContainerStyle = {
        display: 'flex', 
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginBottom: '20px',
        marginTop: '20px',
        marginRight: '50px',
    };

    const inputRowStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
    };

    const inputStyle = {
        padding: '10px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        width: '25vw',
        maxWidth: '250px',
        marginRight: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    };

    const buttonStyle = (isHovered) => ({
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: isHovered ? '#1e40af' : '#3b82f6', // Change color on hover
        color: 'white',
        cursor: 'pointer',
    });

    const bookButtonStyle = {
        position: 'absolute', 
        bottom: '15px', 
        right: '15px', 
        backgroundColor: '#1d4ed8', // No hover effect
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    // Define styles with hover effect for individual room frame
    const roomContainerStyle = (isHovered) => ({
        backgroundColor: 'rgba(135, 206, 235, 0.7)',
        borderRadius: '10px',
        padding: '15px',
        width: '50vw',
        maxWidth: '600px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition
        transform: isHovered ? 'scale(1.05)' : 'scale(1)', // Slight zoom on hover
        boxShadow: isHovered ? '0 8px 16px rgba(0, 0, 0, 0.2)' : '0 4px 10px rgba(0, 0, 0, 0.1)', // Elevation effect
    });

    const imageStyle = {
        width: '200px',
        height: '200px',
        borderRadius: '10px',
        objectFit: 'cover',
    };

    const roomDetailsStyle = {
        flex: 1,
        marginLeft: '15px',
    };

    const filterContainerStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
        padding: '15px',
        width: '50vw',
        maxWidth: '600px',
        marginBottom: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <CusHeader />
            </div>

            <div style={searchContainerStyle}>
                <input
                    type="text"
                    placeholder="Search room names..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={inputStyle}
                />
                <button
                    onClick={handleSearch}
                    style={buttonStyle(isHoveredSearch)}
                    onMouseEnter={() => setIsHoveredSearch(true)}  
                    onMouseLeave={() => setIsHoveredSearch(false)} 
                >
                    Search
                </button>
            </div>

            <div style={filterContainerStyle}>
                <button
                    onClick={handleViewBookings}
                    style={buttonStyle(isHoveredBookings)}
                    onMouseEnter={() => setIsHoveredBookings(true)}  
                    onMouseLeave={() => setIsHoveredBookings(false)} 
                >
                    View Room Bookings
                </button>
                <h3 style={{ marginBottom: '10px' }}>Filter Rooms</h3>
                <div style={inputRowStyle}>
                    <input
                        type="number"
                        placeholder="Price Range"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        style={inputStyle}
                    />
                    <button
                        onClick={handleFilter}
                        style={buttonStyle(isHoveredFilter)}
                        onMouseEnter={() => setIsHoveredFilter(true)}  
                        onMouseLeave={() => setIsHoveredFilter(false)} 
                    >
                        Filter
                    </button>
                </div>
            </div>

            <div>
                {rooms.map(room => (
                    <div
                        key={room._id}
                        style={roomContainerStyle(hoveredRoom === room._id)}
                        onMouseEnter={() => setHoveredRoom(room._id)}  // Set hover state for this room
                        onMouseLeave={() => setHoveredRoom(null)}      // Reset hover state
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
                        <div style={roomDetailsStyle}>
                            <h2 style={{ fontSize: '1.5em', marginBottom: '10px' }}>{room.roomName}</h2>
                            <ul style={{ listStyleType: 'none', padding: '0' }}>
                                <li>No. of persons: {room.noOfPersons}</li>
                                <li>No. of Beds: {room.noOfBeds}</li>
                                <li>Air Conditioning: {room.airCondition}</li>
                                <li>Smoking Allowed: {room.isSmokingAllowed}</li>
                                <li>Price: Rs.{room.price}/=</li>
                            </ul>
                        </div>
                        <button
                            style={bookButtonStyle}
                            onClick={() => handleBookClick(room)}
                        >
                            Book
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CusAllRooms;