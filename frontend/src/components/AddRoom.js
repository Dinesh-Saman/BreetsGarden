import React, { useState } from "react";
import axios from "axios";
import bgImage from './css_files/images/bg1.png'; // Background image
import ResManagerHeader from './ResManagerHeader';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2

function AddRoom() {
    const navigate = useNavigate();
    const [roomName, setName] = useState("");
    const [noOfPersons, setPersons] = useState(""); // Keep as string
    const [noOfBeds, setBeds] = useState("");     // Keep as string
    const [airCondition, setAirCondition] = useState("");
    const [isSmokingAllowed, setSmoking] = useState("");
    const [board, setBoard] = useState("");
    const [price, setPrice] = useState("");
    const [roomImage, setRoomImage] = useState(null); // For handling image upload

    function sendData(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("roomName", roomName);
        formData.append("noOfPersons", noOfPersons);  // Already a string
        formData.append("noOfBeds", noOfBeds);        // Already a string
        formData.append("airCondition", airCondition);
        formData.append("isSmokingAllowed", isSmokingAllowed);
        formData.append("board", board);
        formData.append("price", price);
        formData.append("roomImage", roomImage); // Append the selected image

        axios.post("http://localhost:8080/room/addRoom", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: "Room added successfully!",
                    icon: 'success',
                    confirmButtonText: 'Close'
                }).then(() => {
                    navigate('/getrooms'); // Navigate to /getrooms after closing the alert
                });

                // Clear input fields
                setName("");
                setPersons("");
                setBeds("");
                setAirCondition("");
                setSmoking("");
                setPrice("");
                setRoomImage(null); // Clear the selected image
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: `Error: ${err.message}`,
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            });
    }

    // CSS styles
    const pageStyle = {
        backgroundColor: '#045c6e',
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: '140px'
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
        paddingTop: '10px'
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

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        padding: '20px 0',
        backgroundColor: 'skyblue',
        borderBottom: '2px solid black',
        borderRadius: '10px 10px 0 0',
    };

    return (
        <div style={pageStyle}>
            <div style={backgroundStyle}></div>
            <div style={containerStyle}>
                <ResManagerHeader />
                <h1 style={headerStyle}>Add Room</h1>
                <form onSubmit={sendData} style={formStyle}>
                    <div className="mb-3">
                        <label htmlFor="roomName" className="form-label">Room Name</label>
                        <input type="text" className="form-control" id="roomName" placeholder="Enter room name" onChange={(e) => setName(e.target.value)} value={roomName} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="noOfPersons" className="form-label">No Of Persons</label>
                        <input type="text" className="form-control" id="noOfPersons" placeholder="Enter no of persons" onChange={(e) => setPersons(e.target.value)} value={noOfPersons} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="noOfBeds" className="form-label">No Of Beds</label>
                        <input type="text" className="form-control" id="noOfBeds" placeholder="Enter no of beds" onChange={(e) => setBeds(e.target.value)} value={noOfBeds} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="airCondition" className="form-label">Air Condition</label>
                        <input type="text" className="form-control" id="airCondition" placeholder="A/c or non-A/c" onChange={(e) => setAirCondition(e.target.value)} value={airCondition} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isSmokingAllowed" className="form-label">Is Smoking Allowed</label>
                        <select className="form-control" id="isSmokingAllowed" onChange={(e) => setSmoking(e.target.value)} value={isSmokingAllowed} required>
                            <option value="">Select...</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="board" className="form-label">board</label>
                        <input type="text" className="form-control" id="board" placeholder="Enter board type" onChange={(e) => setBoard(e.target.value)} value={board} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id="price" placeholder="Enter price of the room" onChange={(e) => setPrice(e.target.value)} value={price} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="roomImage" className="form-label">Upload Room Image</label>
                        <input type="file" className="form-control" id="roomImage" onChange={(e) => setRoomImage(e.target.files[0])} required />
                    </div>
                    <button type="submit" style={buttonStyle}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddRoom;