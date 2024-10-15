import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";  // Import SweetAlert2
import bgImage from './css_files/images/back9.jpeg';
import ServiceManagerHeader from "./ServiceManagerHeader";
import './css_files/DayoutDashboard.css';

//ADMIN SIDE
export default function AllSpaServices() {
    const [Services, setServices] = useState([]);

    useEffect(() => {
        function getServices() {
            axios.get("http://localhost:8080/spa")
                .then((res) => {
                    setServices(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getServices();
    }, []);

    function deleteService(id) {
        // Trigger SweetAlert2 confirmation dialog
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
                // If confirmed, proceed with deletion
                axios.delete(`http://localhost:8080/spa/delete/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'The spa service has been deleted.',
                            'success'
                        );
                        setServices(Services.filter(srv => srv._id !== id));
                    })
                    .catch((err) => {
                        Swal.fire(
                            'Error!',
                            'There was an issue deleting the service.',
                            'error'
                        );
                    });
            }
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

        <div className="container2">
            <h3>All Spa Services</h3>
            

            {/* Add Create Button */}
            <Link to="/sCreate" className="btn btn-success mb-3">Create New Spa Service</Link>

            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Service Name</th>
                        <th>Service Type</th>
                        <th>Duration</th>
                        <th>Price(LKR)</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Services.map((srv) => (
                        <tr key={srv._id}>
                            <td>
                                {srv.image && (
                                    <img 
                                        src={`http://localhost:8080/${srv.image}`} 
                                        alt={srv.serviceName} 
                                        style={{ width: "100px", height: "100px", objectFit: "cover" }} 
                                    />
                                )}
                            </td>
                            <td>{srv.serviceName}</td>
                            <td>{srv.serviceType}</td>
                            <td>{srv.duration}</td>
                            <td>{srv.price}</td>
                            <td>{srv.availability}</td>
                            <td>
                                <Link to={`/Supdate/${srv._id}`} className="btn btn-warning">Edit</Link>
                                &nbsp;
                                <button onClick={() => deleteService(srv._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}
