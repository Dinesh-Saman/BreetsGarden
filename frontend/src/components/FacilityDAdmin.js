import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css_files/FacilitiesD.css';  // Link CSS file for styling

const facilitiesList = [
  { name: 'Day-out Packages', link: '/package-Dashboard' },
  { name: 'Restaurant', link: '#' },
  { name: 'Spa Services', link: '/spa-intro' },
  { name: 'Activities', link: '/activitD' },
  { name: 'Swimming Pool', link: '#' },
  { name: 'Food & Dining', link: '#' },
  { name: 'Transportation', link: '#' },
  { name: 'Internet', link: '#' },
  { name: 'Cleanliness and safety', link: '#' },
  { name: 'Breakfast in room', link: '#' },
  { name: 'Food Delivery', link: '#' },
  { name: 'Grooming service', link: '#' },
  { name: 'Laundry service', link: '#' },
 
];

function FacilityDAdmin() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFacilities = facilitiesList.filter((facility) =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='facilityy'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" 
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                
                <Link to="/admin-facilityD" className="nav-link active">Home</Link> 
                <Link to="/day-out-packages" className="nav-link">Dayout Packages</Link>
               <Link to="/activitiesD" className="nav-link">Activities</Link>
                <Link to="/spa-services" className="nav-link">Spa Service</Link>
                <Link to="/report" className="nav-link">Generate Report</Link>
                
            </div>
            </div>
        </div>
        </nav>
      <nav className="navbar">
        <p className="nav-item">Navbar</p>
        <Link to="/admin-facilityD" className="nav-item">Home</Link>
        <Link to="/package-Dashboard" className="nav-item">Dayout Packages</Link>
        <Link to="/activitD" className="nav-item">Activities</Link>
        <Link to="/spa-intro" className="nav-item">Spa Service</Link>
      </nav>

      <div className='facilityD'>Facilities and Services</div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search facilities..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

      <div className="most">
        <h4 className='head'>Mostly talk about facilities</h4>
        <div className="facility-section">
          <ul className='facility-list'>
            {filteredFacilities.length > 0 ? (
              filteredFacilities.map((facility, index) => (
                <li key={index}>
                  <Link to={facility.link} className="fdd">{facility.name}</Link>
                </li>
              ))
            ) : (
              <li>No facilities found</li>
            )}
          </ul>
        </div>

        <div className="gg">
          <div className='vi'>
            <h6>Swimming pool</h6>
            <h6>Food & Dining</h6>
            <h6>Transportation</h6>
            <h6>Internet</h6>
            <h6>View</h6>
          </div>

          <div className='clean'>
            <h3 className='cle'>Cleanliness and safety</h3>
            <p className="cl">Breakfast in room</p>
            <p className="cl">Anti-viral cleaning products</p>
            <p className="cl">Body Thermometer</p>
            <p className="cl">Daily disinfection in all rooms</p>
            <p className="cl">Doctor/nurse on call</p>
            <p className="cl">First aid kit</p>
            <p className="cl">Hand Sanitizer</p>
            <p className="cl">Hot water linen and laundry washing</p>
            <p className="cl">Safe dining setup</p>
            <p className="cl">Breakfast takeaway service</p>
          </div>

          <div className='conv'>
            <h3 className='cle'>Services and conveniences</h3>
            <p className="cl">Concierge</p>
            <p className="cl">Currency Exchange</p>
            <p className="cl">Daily Housekeeping</p>
            <p className="cl">Fireplace</p>
            <p className="cl">Food Delivery</p>
            <p className="cl">Grooming service</p>
            <p className="cl">Ironing service</p>
            <p className="cl">Laundry service</p>
            <p className="cl">Lockers</p>
            <p className="cl">Luggage Storage</p>
            <p className="cl">Shared lounge/TV area</p>
          </div>

          <div className="access">
            <h3 className="cl">Access</h3>
            <p className="f">Cat-friendly</p>
            <p className="f">Dog-friendly</p>
            <p className="f">Fire extinguisher</p>
            <p className="f">Front desk[24-hour]</p>
            <p className="f">Non-smoking rooms</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilityDAdmin;
