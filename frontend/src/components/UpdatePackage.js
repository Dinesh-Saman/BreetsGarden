import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2
import "./css_files/SpaAppointment.css";
import bgImage from './css_files/images/back9.jpeg';
import ServiceManagerHeader from "./ServiceManagerHeader";

export default function UpdatePackage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [validity, setValidity] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");
    const [packageType, setPackageType] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);  // New state for image

    useEffect(() => {
        function getPackage() {
            axios.get(`http://localhost:8080/dayout/get/${id}`)
                .then((res) => {
                    setTitle(res.data.Packages.title);
                    setValidity(res.data.Packages.validity);
                    setDuration(res.data.Packages.duration);
                    setPrice(res.data.Packages.price);
                    setPackageType(res.data.Packages.packageType);
                    setCategory(res.data.Packages.category);
                    setImage(res.data.Packages.image);  // Load existing image if any
                }).catch((err) => {
                    Swal.fire({
                        title: 'Error!',
                        text: err.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        }
        getPackage();
    }, [id]);

    function updateData(e) {
        e.preventDefault();

        const formData = new FormData();  // Create a FormData object
        formData.append("title", title);
        formData.append("validity", validity);
        formData.append("duration", duration);
        formData.append("price", price);
        formData.append("packageType", packageType);
        formData.append("category", category);

        if (image) {
            formData.append("image", image);  // Append the image file if it exists
        }

        axios.put(`http://localhost:8080/dayout/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            Swal.fire({
                title: 'Success!',
                text: 'Package updated successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate("/day-out-packages");  // Navigate back after updating
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

        <div className="container">
            

            <h3>Update Dayout Package</h3>
            <form onSubmit={updateData}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Package Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="validity" className="form-label">Time Validity</label>
                    <input type="text" className="form-control" value={validity} onChange={(e) => setValidity(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Time Duration</label>
                    <input type="text" className="form-control" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price of the Package</label>
                    <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="packageType" className="form-label">Dayouting Package Type</label>
                    <select className="form-select" value={packageType} onChange={(e) => setPackageType(e.target.value)}>
                        <option value="Individual">Individual</option>
                        <option value="Couple">Couple</option>
                        <option value="Family">Family</option>
                        <option value="Group">Group</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category of the Package</label>
                    <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Upload Image</label>
                    <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
        </div>
    );
}
