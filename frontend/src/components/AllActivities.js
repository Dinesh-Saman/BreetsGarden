import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import './css_files/DayoutDashboard.css';
import bgImage from './css_files/images/back9.jpeg';
import ServiceManagerHeader from "./ServiceManagerHeader";

export default function AllActivities() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        function getActivities() {
            axios.get("http://localhost:8080/activities")
                .then((res) => {
                    setActivities(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
        getActivities();
    }, []);

    function deleteActivity(id) {
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
                axios.delete(`http://localhost:8080/activities/Adelete/${id}`)
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Your activity has been deleted.',
                            'success'
                        );
                        setActivities(activities.filter(act => act._id !== id));
                    })
                    .catch((err) => {
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
           
            <h3>All Activities</h3>

            {/* Add Create Button */}
            <Link to="/createActivity" className="btn btn-success mb-3">Create New Activity</Link>

            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Activity Name</th>
                        <th>Opening Hours</th>
                        <th>Closing Hours</th>
                        <th>Price(LKR)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map((act) => (
                        <tr key={act._id}>
                            <td>
                                {act.image && (
                                    <img 
                                        src={`http://localhost:8080/${act.image}`} 
                                        alt={act.activityName} 
                                        style={{ width: "100px", height: "100px", objectFit: "cover" }} 
                                    />
                                )}
                            </td>
                            <td>{act.activityName}</td>
                            <td>{act.openingHrs}</td>
                            <td>{act.closingHrs}</td>
                            <td>{act.price}</td>
                            <td>
                                <Link to={`/Aupdate/${act._id}`} className="btn btn-warning">Edit</Link>
                                &nbsp;
                                <button onClick={() => deleteActivity(act._id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
}
