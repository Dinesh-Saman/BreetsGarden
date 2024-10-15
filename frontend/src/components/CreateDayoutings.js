import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./css_files/AddRoom.css";
import bgImage from './css_files/images/back9.jpeg';
import ServiceManagerHeader from "./ServiceManagerHeader";

export default function CreateDayoutings() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [validity, setValidity] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");
    const [packageType, setPackageType] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [priceError, setPriceError] = useState("");

    // Validate price to ensure it's numeric and display as LKR
    function validatePrice(value) {
        const regex = /^[0-9\b]+$/; // Only numbers
        if (value === "" || regex.test(value)) {
            setPriceError(""); // No error if valid
        } else {
            setPriceError("Price must contain only numbers.");
        }
        setPrice(value);
    }

    function sendData(e) {
        e.preventDefault();
        if (priceError || price === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please fix the errors before submitting.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("validity", validity);
        formData.append("duration", duration);
        formData.append("price", price);  // Append "LKR" to the price
        formData.append("packageType", packageType);
        formData.append("category", category);
        formData.append("image", image);

        axios.post("http://localhost:8080/dayout/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Day-out package has been created successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate("/day-out-packages");
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
            

            <h3 className="pack">Create Dayout Package</h3>

            <div className="container">
                <form onSubmit={sendData}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Package Title</label>
                        <input type="text" className="form-control" id="title" placeholder="Enter package title"
                            onChange={(e) => setTitle(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="validity" className="form-label">Validity</label>
                        <input type="text" className="form-control" id="validity" placeholder="Enter validity"
                            onChange={(e) => setValidity(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Duration</label>
                        <input type="text" className="form-control" id="duration" placeholder="Enter duration"
                            onChange={(e) => setDuration(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price (LKR)</label>
                        <input type="text" className="form-control" id="price" placeholder="Enter price"
                            value={price}
                            onChange={(e) => validatePrice(e.target.value)} required />
                        {priceError && <div className="text-danger">{priceError}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="packageType" className="form-label">Package Type</label>
                        <select className="form-select" id="packageType"
                            onChange={(e) => setPackageType(e.target.value)} required>
                            <option value="">Select the Package Type</option>
                            <option value="Individual">Individual</option>
                            <option value="Couple">Couple</option>
                            <option value="Family">Family</option>
                            <option value="Group">Group</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input type="text" className="form-control" id="category" placeholder="Enter category"
                            onChange={(e) => setCategory(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload Image</label>
                        <input type="file" className="form-control" id="image" onChange={(e) => setImage(e.target.files[0])} />
                    </div>

                    <button type="submit" className="btn-primary">Create New Day-out Package</button>
                </form>
            </div>
        </div>
        </div>
    );
}
