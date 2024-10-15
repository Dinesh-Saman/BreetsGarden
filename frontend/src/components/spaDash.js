import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css_files/spaDash.css';
import CusHeader from './CusHeader';

function SpaDash() {
    const [selectedType, setSelectedType] = useState('All Types');
    const [favorites, setFavorites] = useState([]);
    const [spaServices, setSpaServices] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);  // New state for selected file
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch spa services from the server
        function fetchSpaServices() {
            axios.get('http://localhost:8080/spa')
                .then((res) => {
                    setSpaServices(res.data); // Store fetched spa services in state
                })
                .catch((err) => {
                    console.error("Error fetching spa services:", err.message);
                });
        }
        fetchSpaServices();
    }, []);

    const handleToggleFavorite = (srv) => {
        const isFavorite = favorites.some(favorite => favorite._id === srv._id);
        if (isFavorite) {
            setFavorites(favorites.filter(favorite => favorite._id !== srv._id));
        } else {
            setFavorites([...favorites, srv]);
        }
    };

    const handleCreditCardClick = (srv) => {
        navigate('/appointmentBooking', { state: { selectedPackage: srv } });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Set selected file
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        axios.post('http://localhost:8080/sUpload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            alert('Image uploaded successfully!');
            // Optionally, fetch updated spa services after uploading the image
        })
        .catch((error) => {
            console.error('Error uploading image:', error);
        });
    };

    const filteredPackages = spaServices.filter(srv => {
        const matchesType = selectedType === 'All Types' || srv.serviceName === selectedType;
        return matchesType;
    });

    const headerStyle = {
        width: '100%',
    };

    return (
        <div>
            <div style={headerStyle}>
                <CusHeader />
            </div>
            <div className="spaa">
                <nav className="navbar">
                <p className="nav-item"></p>
                    <Link to="/facilities-dashboard" className="nav-item1">Facilities & Services</Link>
                    <Link to="/package-Dashboard" className="nav-item">Dayout Packages</Link>
                    <Link to="/activitD" className="nav-item">Activities</Link>
                    <Link to="/spa-intro" className="nav-item2">Spa Service</Link>
                </nav>
                <div className="header">
                    <h1>Wellness & Spa</h1>
                    <h2>Schedule a spa appointment online at your convenience</h2>
                </div>

               

                <div className="sidebar">
                    <div className="filter-group">
                        <label htmlFor="serviceName">Service Name</label>
                        <select
                            id="serviceName"
                            className="form-control"
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option>All Types</option>
                            <option>Massage</option>
                            <option>Nail Care</option>
                            <option>Facial</option>
                            <option>Yoga and exercise</option>
                            <option>Laser hair removal</option>
                        </select>
                    </div>
                    <button type="reset" className="btn-reset" onClick={() => setSelectedType('All Types')}>
                        Reset
                    </button>
                </div>

                <div className="service-section">
                    {filteredPackages.map(srv => (
                        <div key={srv._id} className="service-card1">
                            {srv.image && (
                                <img 
                                    src={`http://localhost:8080/${srv.image}`} 
                                    alt={srv.serviceName} 
                                    className="service-image" 
                                />
                            )}
                            <div className="service-details">
                                <h3 className="package-serviceName">{srv.serviceName}</h3>
                                <p className="service-info">Service Type: {srv.serviceType}</p>
                                <p className="service-info">Duration: {srv.duration}</p>
                                <p className="service-info">Availability: {srv.availability}</p>
                                <button
                                    className={`btn-favorite ${favorites.some(favorite => favorite._id === srv._id) ? 'favorite-active' : ''}`}
                                    onClick={() => handleToggleFavorite(srv)}
                                >
                                    {favorites.some(favorite => favorite._id === srv._id) ? 'Remove from Favorites' : 'Add to My Favorites'}
                                </button>
                                <div className="price-book">
                                    <p className="price">Price: LKR {srv.price}</p>
                                    <button className="btn-book" onClick={() => handleCreditCardClick(srv)}>Book Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {favorites.length > 0 && (
                    <div className="favorites-section">
                        <h2>Your Favorites</h2>
                        <div className="packages-list">
                            {favorites.map(srv => (
                                <div key={srv._id} className="package">
                                    {srv.image && (
                                        <img 
                                            src={`http://localhost:8080/${srv.image}`} 
                                            alt={srv.serviceName} 
                                            className="package-image" 
                                        />
                                    )}
                                    <div className="package-details">
                                        <h3 className="package-serviceName">{srv.serviceName}</h3>
                                        <p className="package-info">Duration: {srv.duration}</p>
                                        <div className="price-book">
                                            <p className="price">Price: LKR {srv.price}</p>
                                            <button className="btn-book">Credit Card</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SpaDash;
