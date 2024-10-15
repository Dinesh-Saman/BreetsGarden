import React from 'react';
import { Link } from 'react-router-dom';
import './css_files/SpaServicesDashboard.css';
import spa1 from './css_files/images/spa1.jpeg';
import spa2 from './css_files/images/spa2.jpeg';
import spa3 from './css_files/images/spa3.jpeg';
import CusHeader from "./CusHeader";


const headerStyle = {
    width: '100%',
};


function SpaServicesDashboard() {
    return (
        <div>
      <div style={headerStyle}>
                <CusHeader />
            </div>
        <div className="dash">
          <nav className="navbar">
                <p className="nav-item"></p>
                <Link to="/facilities-dashboard" className="nav-item1">Facilities & Services</Link>
                <Link to="/package-Dashboard" className="nav-item">Dayout Packages</Link>
                <Link to="/activitD" className="nav-item">Activities</Link>
                <Link to="/spa-intro" className="nav-item12">Spa Service</Link>
            </nav>
            <div className="header">
                
            </div>
            <div className="appointment-section">

            <h3 className='well'>Wellness & Spa</h3>

                <div className="spa-images">
                    <img src={spa1} className="spa-img" alt="spa1" />
                    <img src={spa2} className="spa-img" alt="spa2" />
                    <img src={spa3} className="spa-img" alt="spa3" />
                </div>
                <p className="dot">Where tranquility meets luxury, and every moment is a spa retreat for the soul.</p>
                <p className="dot1">Schedule a spa appointment online at your convenience.</p>
                <p className="dot3">Simply enter your details to schedule the appointment.</p>
                <button id="appointmentButton">
                    <Link to="/spaD" className="spaad">Schedule an Appointment</Link>
                </button>
            </div>
        </div>
        </div>
    );
}

export default SpaServicesDashboard;
