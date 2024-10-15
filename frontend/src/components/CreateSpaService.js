import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2
import './css_files/DayoutDashboard.css';
import bgImage from './css_files/images/back9.jpeg';
import ServiceManagerHeader from "./ServiceManagerHeader";

export default function CreateSpaService() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [serviceName, setServiceName] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] = useState("");
    const [image, setImage] = useState(null);  // State for image
    const [priceError, setPriceError] = useState("");  // State for price error

    // Price validation function to allow only numeric values
    function validatePrice(value) {
        const regex = /^[0-9\b]+$/;  // Only allows digits and backspace
        if (value === "" || regex.test(value)) {
            setPriceError("");  // Clear error if valid
        } else {
            setPriceError("Price must contain only numbers.");
        }
        setPrice(value);
    }

    function sendData(e) {
        e.preventDefault();
        
        if (priceError) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a valid price.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Create a FormData object to handle the image file
        const formData = new FormData();
        formData.append("serviceName", serviceName);
        formData.append("serviceType", serviceType);
        formData.append("duration", duration);
        formData.append("price", price);  // Append "LKR" to the price
        formData.append("availability", availability);
        formData.append("image", image);  // Append the image file

        axios.post("http://localhost:8080/spa/sCreate", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Spa Service Added Successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate("/spa-services");
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
           
            <h3 className="pack">Add Spa Service</h3>
            <div className="container">
                <form onSubmit={sendData}>
                    <div className="mb-3">
                        <label htmlFor="serviceName" className="form-label">Spa Service Name</label>
                        <select className="form-select" aria-label="Default select example"
                            onChange={(e) => setServiceName(e.target.value)}>
                            <option selected>Select the Spa Service Name</option>
                            <option value="Massage">Massage</option>
                            <option value="Nail Care">Nail Care</option>
                            <option value="Facial">Facial</option>
                            <option value="Yoga and exercise">Yoga and exercise</option>
                            <option value="Laser hair removal">Laser hair removal</option>
                            <option value="Reflexology">Reflexology</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="serviceType" className="form-label">Spa Service Type</label>
                        <select className="form-select" aria-label="Default select example"
                            onChange={(e) => setServiceType(e.target.value)}>
                            <option selected>Select the Service Type</option>
                            <option value="Relaxing Massage">Relaxing Massage</option>
                            <option value="Deep Tissue Massage">Deep Tissue Massage</option>
                            <option value="Deluxe Manicure">Deluxe Manicure</option>
                            <option value="Deluxe Pedicure">Deluxe Pedicure</option>
                            <option value="Combo (manicure + pedicure)">Combo (manicure + pedicure)</option>
                            <option value="Shellac Manicure">Shellac Manicure</option>
                            <option value="Normal">Normal</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Time Duration</label>
                        <input type="text" className="form-control" id="duration" placeholder="Enter duration"
                            onChange={(e) => setDuration(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price of the package (LKR)</label>
                        <input type="text" className="form-control" id="price" placeholder="Enter the price"
                            value={price}
                            onChange={(e) => validatePrice(e.target.value)} />
                        {priceError && <div className="text-danger">{priceError}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="availability" className="form-label">Availability</label>
                        <input type="text" className="form-control" id="availability" placeholder="Enter availability"
                            onChange={(e) => setAvailability(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload Image</label>
                        <input type="file" className="form-control" id="image" onChange={(e) => setImage(e.target.files[0])} />
                    </div>

                    <button type="submit" className="btn-primary">Add Spa Service</button>
                </form>
            </div>
        </div>
        </div>
    );
}
