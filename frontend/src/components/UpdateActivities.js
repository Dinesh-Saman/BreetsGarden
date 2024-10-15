import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import bgImage from './css_files/images/back9.jpeg';
import ServiceManagerHeader from "./ServiceManagerHeader";

export default function UpdateActivities() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [activityName, setActivityName] = useState("");
    const [openingHrs, setOpeningHrs] = useState("");
    const [closingHrs, setClosingHrs] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        function getPackage() {
            axios.get(`http://localhost:8080/activities/get/${id}`)
                .then((res) => {
                    if (res.data.activity) {  // Check if activity exists
                        setActivityName(res.data.activity.activityName);
                        setOpeningHrs(res.data.activity.openingHrs);
                        setClosingHrs(res.data.activity.closingHrs);
                        setPrice(res.data.activity.price);
                        setImage(res.data.activity.image);
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Activity not found.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
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
        getPackage();
    }, [id]);
    
    function updateData(e) {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("activityName", activityName);
        formData.append("openingHrs", openingHrs);
        formData.append("closingHrs", closingHrs);
        formData.append("price", price);
        
        if (image) {
            formData.append("image", image);
        }

        axios.put(`http://localhost:8080/activities/Aupdate/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            Swal.fire({
                title: 'Success!',
                text: 'Activity updated successfully.',
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

        <div className="container">
            
            <h3>Update Activities</h3>
            <form onSubmit={updateData}>
                <div className="mb-3">
                    <label htmlFor="activityName" className="form-label">Activity Name</label>
                    <input type="text" className="form-control" value={activityName} onChange={(e) => setActivityName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="openingHrs" className="form-label">Opening Hours</label>
                    <input type="text" className="form-control" value={openingHrs} onChange={(e) => setOpeningHrs(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="closingHrs" className="form-label">Closing Hours</label>
                    <input type="text" className="form-control" value={closingHrs} onChange={(e) => setClosingHrs(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price of the Activity</label>
                    <input type="text" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
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
