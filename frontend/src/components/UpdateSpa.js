import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2
import bgImage from './css_files/images/back9.jpeg';
import ServiceManagerHeader from "./ServiceManagerHeader";

export default function UpdateSpa() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [serviceName, setServiceName] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");
    const [availability, setAvailability] = useState("");
    const [image, setImage] = useState(null);  // New state for image

    useEffect(() => {
        function getSpa() {
            axios.get(`http://localhost:8080/spa/get/${id}`)
                .then((res) => {
                    setServiceName(res.data.Spa.serviceName);
                    setServiceType(res.data.Spa.serviceType);
                    setDuration(res.data.Spa.duration);
                    setPrice(res.data.Spa.price);
                    setAvailability(res.data.Spa.availability);
                    setImage(res.data.Spa.image);  // Load existing image if any
                }).catch((err) => {
                    Swal.fire({
                        title: 'Error!',
                        text: err.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        }
        getSpa();
    }, [id]);

    function updateData(e) {
        e.preventDefault();
    
        const formData = new FormData();  // Create a FormData object
        formData.append("serviceName", serviceName);
        formData.append("serviceType", serviceType);
        formData.append("duration", duration);
        formData.append("price", price);
        formData.append("availability", availability);

        if (image) {
            formData.append("image", image);  // Append the image file if it exists
        }
    
        axios.put(`http://localhost:8080/spa/sUpdate/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            Swal.fire({
                title: 'Success!',
                text: 'Spa Service Updated Successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate("/spa-services");
            });
        }).catch((err) => {
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

        <div className="container">
            
            <h3>Update Spa Service</h3>
            <form onSubmit={updateData}>
                <div className="mb-3">
                    <label htmlFor="serviceName" className="form-label">Spa Service Name</label>
                    <select className="form-select" value={serviceName} onChange={(e) => setServiceName(e.target.value)}>
                        <option value="Massage">Massage</option>
                        <option value="Nail Care">Nail Care</option>
                        <option value="Thai Massage">Thai Massage</option>
                        <option value="Shiatsu Massage">Shiatsu Massage</option>
                        <option value="Sports Massage">Sports Massage</option>
                        <option value="Reflexology">Reflexology</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="serviceType" className="form-label">Spa Service Type</label>
                    <select className="form-select" value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                        <option value="">Select the Service Type</option>
                        <option value="Relaxing Massage">Relaxing Massage</option>
                        <option value="Relaxing Massage">Relaxing Massage</option>
                        <option value="Deluxe Manicure">Deluxe Manicure</option>
                        <option value="Deluxe Pedicure">Deluxe Pedicure</option>
                        <option value="Combo (manicure + pedicure)">Combo (manicure + pedicure)</option>
                        <option value="Shellac Manicure">Shellac Manicure</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Time Duration</label>
                    <input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price of the Spa</label>
                    <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="availability" className="form-label">Availability</label>
                    <input type="text" className="form-control" value={availability} onChange={(e) => setAvailability(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Upload Image</label>
                    <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button type="submit" className="btn-primary">Update</button>
            </form>
        </div>
        </div>
    );
}
