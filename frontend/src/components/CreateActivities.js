import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./css_files/AddRoom.css";
import bgImage from './css_files/images/back9.jpeg';
import ServiceManagerHeader from "./ServiceManagerHeader";

export default function CreateActivities() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [activityName, setActivityName] = useState("");
    const [openingHrs, setOpeningHrs] = useState("");
    const [closingHrs, setClosingHrs] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [priceError, setPriceError] = useState("");  // State to track validation errors

    // Price validation to allow only numbers
    function validatePrice(value) {
        const regex = /^[0-9\b]+$/;  // Regular expression to match only digits (numbers)
        if (value === "" || regex.test(value)) {
            setPriceError("");  // No error if valid
        } else {
            setPriceError("Price must be a valid number.");
        }
        setPrice(value);
    }

    function sendData(e) {
        e.preventDefault();

        if (priceError) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fix the errors before submitting.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const formData = new FormData();
        formData.append("activityName", activityName);
        formData.append("openingHrs", openingHrs);
        formData.append("closingHrs", closingHrs);
        formData.append("price", price);
        formData.append("image", image);

        axios.post("http://localhost:8080/activities/Aadd", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Activity created successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate("/activitiesD");
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }

    const containerStyle = {
        backgroundImage: `linear-gradient(rgba(172, 172, 172, 0.4), rgba(213, 212, 212, 0.4)),url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    backgroundRepeat: 'noRepeat',
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '140px' // Increased paddingTop to account for header height
    };


    return (
        <div style={containerStyle}>
            <ServiceManagerHeader /> {/* Include the Header at the top */}

        <div className="Container">
            
            <h3 className="pack">Create New Activity</h3>

            <div className="container">
                <form onSubmit={sendData}>
                    <div className="mb-3">
                        <label htmlFor="activityName" className="form-label">Activity Name</label>
                        <input type="text" className="form-control" id="activityName" placeholder="Enter activity name"
                            onChange={(e) => setActivityName(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="openingHrs" className="form-label">Opening Hours</label>
                        <input type="text" className="form-control" id="openingHrs" placeholder="Enter opening hours"
                            onChange={(e) => setOpeningHrs(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="closingHrs" className="form-label">Closing Hours</label>
                        <input type="text" className="form-control" id="closingHrs" placeholder="Enter closing hours"
                            onChange={(e) => setClosingHrs(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Activity Price (LKR)</label>
                        <input type="text" className="form-control" id="price" placeholder="Enter price in LKR"
                            value={price}
                            onChange={(e) => validatePrice(e.target.value)} required />
                        {priceError && <div className="text-danger">{priceError}</div>}  {/* Display validation error */}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload Image</label>
                        <input type="file" className="form-control" id="image" onChange={(e) => setImage(e.target.files[0])} />
                    </div>

                    <button type="submit" className="btn-primary">Create New Activity</button>
                </form>
            </div>
        </div>
        </div>
    );
}
