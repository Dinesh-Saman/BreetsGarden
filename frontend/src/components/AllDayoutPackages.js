import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import './css_files/DayoutDashboard.css';
import bgImage from './css_files/images/back9.jpeg';
import ServiceManagerHeader from "./ServiceManagerHeader";

export default function AllDayoutPackages() {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        function getPackages() {
            axios.get("http://localhost:8080/dayout").then((res) => {
                setPackages(res.data);
            }).catch((err) => {
                alert(err.message);
            });
        }
        getPackages();
    }, []);

    function deletePackage(id) {
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
                axios.delete(`http://localhost:8080/dayout/delete/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your package has been deleted.',
                            'success'
                        );
                        setPackages(packages.filter(pkg => pkg._id !== id));
                    }).catch((err) => {
                        Swal.fire(
                            'Error!',
                            err.message,
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
           
            <h3>All Dayout Packages</h3>

            {/* Add Create Button */}
            <Link to="/dayCreate" className="btn btn-success mb-3">Create New Dayout Package</Link>

            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Validity</th>
                        <th>Duration</th>
                        <th>Price(LKR)</th>
                        <th>Package Type</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {packages.map((pkg) => (
                        <tr key={pkg._id}>
                            <td>
                                {pkg.image && (
                                    <img 
                                        src={`http://localhost:8080/${pkg.image}`} 
                                        alt={pkg.title} 
                                        style={{ width: "100px", height: "100px", objectFit: "cover" }} 
                                    />
                                )}
                            </td>
                            <td>{pkg.title}</td>
                            <td>{pkg.validity}</td>
                            <td>{pkg.duration}</td>
                            <td>{pkg.price}</td>
                            <td>{pkg.packageType}</td>
                            <td>{pkg.category}</td>
                            <td>
                                <Link to={`/update/${pkg._id}`} className="btn btn-warning">Edit</Link>
                                &nbsp;
                                <button onClick={() => deletePackage(pkg._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}
